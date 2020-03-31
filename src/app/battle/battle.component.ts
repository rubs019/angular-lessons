import { Component, OnInit } from '@angular/core';
import { Pokemon } from '../Models/pokemon/Pokemon';
import { Bulbizard, Pikachu } from '../Models/Pokemons';
import { Battle } from '../Models/Fight/Fight';
import { MINIMUM_LIFE } from '../constants';
import AttackService from '../Models/Attack/Attack.service';

@Component({
  selector: 'app-battle',
  templateUrl: './battle.component.html',
  styleUrls: ['./battle.component.css']
})
export class BattleComponent implements OnInit {

  opponent?: Pokemon;
  secondOpponent?: Pokemon;
  lastDefender: Pokemon;
  lastAttacker: Pokemon;
  nbRound = 0;

  constructor() {
  }

  ngOnInit(): void {
    this.opponent = Pikachu;
    this.secondOpponent = Bulbizard;

    this.startFight().then((res) => {
      console.log('res', res);
    })
      .catch((err) => {
        console.log('err', err);
      });
  }

  startFight(): Promise<Pokemon> {
    return new Promise(resolve => {
      const fasterPokemon = Battle.getFaster(this.opponent, this.secondOpponent);
      const slowestPokemon = fasterPokemon === this.opponent ? this.secondOpponent : this.opponent;

      console.log('Pokemon 1 = ', fasterPokemon)
      console.log('Pokemon 2 = ', slowestPokemon)

      const round = setInterval(() => {
        if (this.opponent.health < MINIMUM_LIFE || this.secondOpponent.health < MINIMUM_LIFE) {
          clearInterval(round);
          return resolve(this.opponent);
        }

        if (this.nbRound === 0) {
          AttackService.attack(slowestPokemon, slowestPokemon.attacks[0], fasterPokemon);
          this.lastDefender = slowestPokemon;
          this.lastAttacker = fasterPokemon;
          this.nbRound++;
          return;
        }

        AttackService.attack(this.lastDefender, this.lastDefender.attacks[0], this.lastAttacker);
        if (this.lastAttacker.health === 0) {
          console.log('the winner is', this.lastDefender.name);
          clearInterval(round);
          return resolve(this.lastDefender);
        }
        const tempAttacker = this.lastAttacker;
        this.lastAttacker = this.lastDefender;
        this.lastDefender = tempAttacker;
        this.nbRound++;

      }, 1000);
    });
  }

}
