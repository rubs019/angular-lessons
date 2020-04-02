import { Injectable } from '@angular/core';
import { Battle } from '../../Models/Fight/Fight';
import { Pokemon } from '../../Models/Pokemon/Pokemon';
import AttackService from '../../Models/Attack/Attack.service';
import { Observable, interval } from 'rxjs';
import { MINIMUM_LIFE } from '../../constants';
import { AttackInformation } from '../../Models/Attack/Attack.definition';

@Injectable({
  providedIn: 'root'
})
export class BattleService {

  opponent: Pokemon;
  secondOpponent: Pokemon;
  lastDefender?: Pokemon;
  lastAttacker?: Pokemon;
  fasterPokemon?: Pokemon;
  slowestPokemon?: Pokemon;
  battleFinished = false;
  winnerName?: string;
  battleLogs = [];

  constructor() {
  }

  start(opponent: Pokemon, secondOpponent: Pokemon): Observable<any> {
    this.opponent = opponent;
    this.secondOpponent = secondOpponent;
    this.fasterPokemon = Battle.getFasterPokemon(this.opponent, this.secondOpponent);
    this.slowestPokemon = this.fasterPokemon === this.opponent ? this.secondOpponent : this.opponent;
    console.log('Start round');
    console.log('opponent = ', this.opponent);
    console.log('secondOpponent = ', this.secondOpponent);
    return interval(1000);
  }

  playRound(nbRound): Observable<{nbRound: number, log: AttackInformation, winner?: Pokemon}> {

    return new Observable(observer => {

      if (this.battleFinished) return observer.unsubscribe;

      if (nbRound === 0) {
        const log = this.handleAttack(this.fasterPokemon, this.slowestPokemon);
        this.lastDefender = this.slowestPokemon;
        this.lastAttacker = this.fasterPokemon;
        return observer.next({
          nbRound,
          log
        });
      }

      if (this.opponent.health < MINIMUM_LIFE || this.secondOpponent.health < MINIMUM_LIFE) {
        this.battleFinished = true;
        this.winnerName = this.lastDefender.name;
        observer.unsubscribe();
      }

      const log = this.handleAttack(this.lastDefender, this.lastAttacker);

      if (this.lastAttacker.health === 0) {
        this.battleFinished = true;
        this.winnerName = this.lastDefender.name;
        observer.next({
          nbRound,
          log,
          winner: this.lastDefender
        });
        observer.unsubscribe();
      }

      const tempAttacker = this.lastAttacker;
      this.lastAttacker = this.lastDefender;
      this.lastDefender = tempAttacker;
      return observer.next({
        nbRound,
        log
      });
    });
  }

  private handleAttack(opponent: Pokemon, secondOpponent: Pokemon): AttackInformation {
    return AttackService.attack(opponent, opponent.attacks[0], secondOpponent);
  }
}
