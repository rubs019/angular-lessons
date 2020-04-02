import { Component, OnInit } from '@angular/core';
import { ApiService } from '../Services/apiService/api.service';
import { Pokemon } from '../Models/Pokemon/Pokemon';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
  providers: [ApiService]
})
export class MainComponent implements OnInit {

  pokemonToSelect: Pokemon[] = [];
  pokemonSelected: Pokemon[] = [];

  constructor(private apiService: ApiService) {

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
      this.pokemonSelected.shift()
      return;
    }

    this.pokemonSelected.pop();

  }

}
