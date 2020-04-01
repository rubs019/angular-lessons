import { Component, OnInit, Input } from '@angular/core';
import { Pokemon } from '../Models/Pokemon/Pokemon';

@Component({
  selector: 'app-pokemon-selector',
  templateUrl: './pokemon-selector.component.html',
  styleUrls: ['./pokemon-selector.component.css'],
})
export class PokemonSelectorComponent implements OnInit {

  @Input()pokemon: Pokemon;
  constructor() { }

  ngOnInit(): void {
    console.log(this.pokemon.sprites.back_default);
  }

}
