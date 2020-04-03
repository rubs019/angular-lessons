import { Component, Input } from '@angular/core';
import { Pokemon } from '../Models/Pokemon/Pokemon';

@Component({
  selector: 'app-pokemon-selector',
  templateUrl: './pokemon-selector.component.html',
  styleUrls: ['./pokemon-selector.component.css'],
})
export class PokemonSelectorComponent {

  @Input()pokemon: Pokemon;
  constructor() { }
}
