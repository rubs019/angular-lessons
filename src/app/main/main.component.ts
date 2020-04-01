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

  pokemons = ['Pikachu', 'Bulbizarre', 'Pikachu', 'Bulbizarre', 'Pikachu', 'Bulbizarre', 'Pikachu', 'Bulbizarre'];
  constructor(private apiService: ApiService) {

    apiService.getPokemons().subscribe((pokemons: Pokemon[]) => {
      console.log('Pokemon', pokemons[1].name);
    });
  }

  ngOnInit(): void {
  }

}
