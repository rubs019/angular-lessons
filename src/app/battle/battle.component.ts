import { Component, OnInit } from '@angular/core';
import { Pokemon } from '../Models/Pokemon/Pokemon';
import { Bulbizard, Pikachu } from '../Models/FakePokemons';
import { Battle } from '../Models/Fight/Fight';
import { MINIMUM_LIFE } from '../constants';
import AttackService, { AttackInformation } from '../Models/Attack/Attack.service';

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
  battleLogs: Array<AttackInformation> = [];
  battleInProgress = false;
  battleFinished = false;

  constructor() {
  }

  ngOnInit(): void {
    this.opponent = Pikachu;
    this.secondOpponent = Bulbizard;
  }

  startFight(): Promise<Pokemon> {
    return new Promise(resolve => {
      const fasterPokemon = Battle.getFaster(this.opponent, this.secondOpponent);
      const slowestPokemon = fasterPokemon === this.opponent ? this.secondOpponent : this.opponent;

      console.log('Pokemon 1 = ', fasterPokemon);
      console.log('Pokemon 2 = ', slowestPokemon);

      const round = setInterval(() => {
        if (!this.battleInProgress) {
          clearInterval(round);
          return;
        }

        if (this.opponent.health < MINIMUM_LIFE || this.secondOpponent.health < MINIMUM_LIFE) {
          clearInterval(round);
          this.battleFinished = true;
          return resolve(this.opponent);
        }

        if (this.nbRound === 0) {
          this.handleAttack(slowestPokemon, fasterPokemon);
          this.lastDefender = slowestPokemon;
          this.lastAttacker = fasterPokemon;
          this.nbRound++;
          return;
        }

        this.handleAttack(this.lastDefender, this.lastAttacker);
        if (this.lastAttacker.health === 0) {
          console.log('the winner is', this.lastDefender.name);
          clearInterval(round);
          this.battleFinished = true;
          return resolve(this.lastDefender);
        }
        const tempAttacker = this.lastAttacker;
        this.lastAttacker = this.lastDefender;
        this.lastDefender = tempAttacker;
        this.nbRound++;

      }, 1000);
    });
  }

  toggleFight(): void {
    this.battleInProgress = !this.battleInProgress;

    this.startFight().then((res) => {
      console.log('res', res);
    })
      .catch((err) => {
        console.log('err', err);
      });
  }

  restartFight(): void {
    this.opponent = Pikachu;
    this.secondOpponent = Bulbizard;
  }

  private handleAttack(opponent: Pokemon, secondOpponent: Pokemon): void {
    const attackInformation = AttackService.attack(opponent, opponent.attacks[0], secondOpponent);
    this.battleLogs.push(attackInformation);
    const remainingLifePercentage = secondOpponent.health * secondOpponent.maxHealth / 100;
    console.log(`remainingLifePercentage ${secondOpponent.name}`, remainingLifePercentage);
  }

}
