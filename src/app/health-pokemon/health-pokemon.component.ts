import { Component, Input, OnInit } from '@angular/core';
import { Pokemon } from '../Models/Pokemon/Pokemon';

@Component({
  selector: 'app-health-pokemon',
  templateUrl: './health-pokemon.component.html',
  styleUrls: ['./health-pokemon.component.css']
})
export class HealthPokemonComponent implements OnInit {

  @Input()pokemon: Pokemon;
  constructor() { }

  ngOnInit(): void {
  }

}
