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
        pokemonCreated.name = this.creationService.createPokemon.name;
        pokemonCreated.level = this.creationService.createPokemon.level;
        pokemonCreated.speed = this.creationService.createPokemon.speed;
        pokemonCreated.offStat = this.creationService.createPokemon.offStat;
        pokemonCreated.defStat = this.creationService.createPokemon.defStat;
        pokemonCreated.health = this.creationService.createPokemon.maxHealth;
        pokemonCreated.maxHealth = this.creationService.createPokemon.maxHealth;
        pokemonCreated.sprites = {
            front_default: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/127.png',
            back_default: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/127.png'
        }
        pokemonCreated.custom = true;
        pokemonCreated.attacks = [
            {
                name: 'Attaque foudre',
                basePower: pokemonCreated.offStat
            }
        ];

        this.pokemonToSelect.push(pokemonCreated);

        this.resetVal();
      });
    }

  resetVal(): void {
    this.creationService.createPokemon.name = null;
    this.creationService.createPokemon.level = null;
    this.creationService.createPokemon.speed = null;
    this.creationService.createPokemon.offStat = null;
    this.creationService.createPokemon.defStat = null;
    this.creationService.createPokemon.maxHealth = null;
    this.creationService.createPokemon.maxHealth = null;
    this.creationService.createPokemon.sprites = {
      front_default: null,
      back_default: null
    }
    this.creationService.createPokemon.custom = null;
    this.creationService.createPokemon.attacks = null;
  }

}
