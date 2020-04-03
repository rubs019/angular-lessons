import { Injectable } from '@angular/core';
import { Battle } from '../../Models/Fight/Fight';
import { Pokemon } from '../../Models/Pokemon/Pokemon';
import AttackService from '../../Models/Attack/Attack.service';
import { Observable, interval } from 'rxjs';
import { AttackInformation } from '../../Models/Attack/Attack.definition';

export type RoundInformation = { nbRound: number, log: AttackInformation, winner?: Pokemon }

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

  start(opponent: Pokemon, secondOpponent: Pokemon): Observable<number> {
    this.opponent = opponent;
    this.secondOpponent = secondOpponent;
    return interval(1000);
  }

  playRound(nbRound): Observable<RoundInformation> {

    return new Observable(observer => {

      let attackInformation: AttackInformation | undefined;

      if (this.battleFinished) return observer.unsubscribe;

      if (nbRound === 0) {
        const fasterPokemon = Battle.getFasterPokemon(this.opponent, this.secondOpponent);
        const slowestPokemon = fasterPokemon === this.opponent ? this.secondOpponent : this.opponent;

        attackInformation = this.makeAttack(fasterPokemon, slowestPokemon);

        if (slowestPokemon.health === 0) {
          this.battleFinished = true;
          this.winnerName = fasterPokemon.name;
          observer.next({
            nbRound,
            log: attackInformation,
            winner: fasterPokemon
          });
          return observer.unsubscribe();
        }

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
    return AttackService.attack(opponent, secondOpponent);
  }
}
