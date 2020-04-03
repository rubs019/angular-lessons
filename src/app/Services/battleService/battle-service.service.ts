import { Injectable } from '@angular/core';
import { Pokemon } from '../../Models/Pokemon/Pokemon';
import { Observable, interval } from 'rxjs';
import { AttackInformation } from '../Attack/Attack.definition';
import { AttackService } from '../Attack/attack.service';
import { RoundInformation } from './battle-service.definition';


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
  attackService: AttackService;

  constructor(attackService: AttackService) {
    this.attackService = attackService;
  }

  start(opponent: Pokemon, secondOpponent: Pokemon): Observable<number> {
    this.opponent = opponent;
    this.secondOpponent = secondOpponent;
    return interval(1000);
  }

  playRound(nbRound): Observable<RoundInformation> {
    return new Observable(observer => {

      let attackInformation: AttackInformation | undefined;

      if (this.battleFinished) {
        return observer.unsubscribe;
      }

      if (nbRound === 0) {
        const fasterPokemon = this.getFasterPokemon(this.opponent, this.secondOpponent);
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
    return this.attackService.attack(opponent, secondOpponent);
  }

  getFasterPokemon(pokemon1: Pokemon, pokemon2: Pokemon): Pokemon {
    if (pokemon1.speed === pokemon2.speed) {
      return this.randomInt(2) === 0 ? pokemon1 : pokemon2;
    }

    return pokemon1.speed > pokemon2.speed ? pokemon1 : pokemon2;
  }

  private randomInt(numberMax: number): number {
    return Math.floor(Math.random() * Math.floor(numberMax));
  }
}
