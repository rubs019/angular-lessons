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
  nextAttacker?: Pokemon;
  nextDefender?: Pokemon;
  battleFinished = false;
  winnerName?: string;

  constructor() {
  }

  start(opponent: Pokemon, secondOpponent: Pokemon): Observable<any> {
    this.opponent = opponent;
    this.secondOpponent = secondOpponent;
    console.log('Start round');
    console.log('opponent = ', this.opponent);
    console.log('secondOpponent = ', this.secondOpponent);
    return interval(1000);
  }

  playRound(nbRound): Observable<{ nbRound: number, log: AttackInformation, winner?: Pokemon }> {

    return new Observable(observer => {

      let attackInformation: AttackInformation | undefined;

      if (this.battleFinished) {
        return observer.unsubscribe;
      }

      if (nbRound === 0) {
        const fasterPokemon = Battle.getFasterPokemon(this.opponent, this.secondOpponent);
        const slowestPokemon = fasterPokemon === this.opponent ? this.secondOpponent : this.opponent;

        attackInformation = this.makeAttack(fasterPokemon, slowestPokemon);

        this.nextAttacker = slowestPokemon;
        this.nextDefender = fasterPokemon;
        return observer.next({
          nbRound,
          log: attackInformation
        });
      }

      attackInformation = this.makeAttack(this.nextAttacker, this.nextDefender);

      if (this.nextDefender.health === 0) {
        this.battleFinished = true;
        this.winnerName = this.nextAttacker.name;
        observer.next({
          nbRound,
          log: attackInformation,
          winner: this.nextAttacker
        });
        return observer.unsubscribe();
      }

      const tempAttacker = this.nextAttacker;
      this.nextAttacker = this.nextDefender;
      this.nextDefender = tempAttacker;
      return observer.next({
        nbRound,
        log: attackInformation
      });
    });
  }

  private makeAttack(opponent: Pokemon, secondOpponent: Pokemon): AttackInformation {
    console.log('test', opponent);
    return AttackService.attack(opponent, secondOpponent);
  }
}
