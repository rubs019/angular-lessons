import { Component, Input, OnInit } from '@angular/core';
import { AttackInformation } from '../Services/Attack/Attack.definition';
import { Pokemon } from '../Models/Pokemon/Pokemon';

@Component({
  selector: 'app-logger-pokemon',
  templateUrl: './logger-pokemon.component.html',
  styleUrls: ['./logger-pokemon.component.css']
})
export class LoggerPokemonComponent implements OnInit {

  constructor() { }

  @Input() log: AttackInformation;
  @Input() opponent: Pokemon;
  @Input() secondOpponent: Pokemon;
  ngOnInit(): void {
  }

}
