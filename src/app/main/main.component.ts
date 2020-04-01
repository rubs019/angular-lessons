import { Component, OnInit } from '@angular/core';
import { ApiService } from '../Services/api.service';
import { Pokemon } from '../Models/Pokemon/Pokemon';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
  providers: [ ApiService ]
})
export class MainComponent implements OnInit {

  pokemonToSelect: Pokemon[] = [] ;
  constructor(private apiService: ApiService) {

    apiService.getPokemons().subscribe((pokemons: Pokemon[]) => {
      this.pokemonToSelect = pokemons;
    });
  }

  ngOnInit(): void {
  }

}
