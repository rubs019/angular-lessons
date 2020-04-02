import { Component, OnInit } from '@angular/core';
import { ApiService } from '../Services/apiService/api.service';
import { Pokemon } from '../Models/Pokemon/Pokemon';
import { MatDialog } from '@angular/material/dialog';
import { CreationService } from '../Services/creationService/CreationService';
import { PokemonCreationComponent } from '../pokemon-creation/pokemon-creation.component';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
  providers: [ApiService]
})
export class MainComponent implements OnInit {

  pokemonToSelect: Pokemon[] = [];
  pokemonSelected: Pokemon[] = [];

  constructor(private apiService: ApiService, public dialog: MatDialog, public creationService: CreationService) {

    apiService.getPokemons().subscribe((pokemons: Pokemon[]) => {
      this.pokemonToSelect = pokemons;
    });
  }

  ngOnInit(): void {
  }

  choosePokemon(pokemon: Pokemon): void {
    if (this.pokemonSelected.length === 2) {
      return;
    }
    this.pokemonSelected.push(pokemon);
  }

  removeSelectedPokemon(index: number): void {
    if (index === 0) {
      this.pokemonSelected.shift();
      return;
    }

    this.pokemonSelected.pop();

  }
  openDialog(): void {
    const dialogRef = this.dialog.open(PokemonCreationComponent);

    dialogRef.afterClosed().subscribe(() => {
        const pokemonCreated = new Pokemon();
        console.log(pokemonCreated);
        pokemonCreated.name = this.creationService.createPokemon.name;
        pokemonCreated.level = this.creationService.createPokemon.level;
        pokemonCreated.speed = this.creationService.createPokemon.speed;
        pokemonCreated.offStat = this.creationService.createPokemon.offStat;
        pokemonCreated.defStat = this.creationService.createPokemon.defStat;
        pokemonCreated.maxHealth = this.creationService.createPokemon.maxHealth;
        pokemonCreated.attacks = [];

        this.pokemonToSelect.push(pokemonCreated);
      });
    }

}
