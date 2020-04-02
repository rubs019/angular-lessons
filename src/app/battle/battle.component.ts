import { Component, OnInit, OnDestroy } from '@angular/core';
import { Pokemon } from '../Models/Pokemon/Pokemon';
import { Bulbizard, Pikachu } from '../Models/FakePokemons';
import { Battle } from '../Models/Fight/Fight';
import { MINIMUM_LIFE } from '../constants';
import AttackService from '../Models/Attack/Attack.service';
import { AttackInformation } from '../Models/Attack/Attack.definition';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../Services/apiService/api.service';
import { Observable, Subscriber, Subscription } from 'rxjs';

@Component({
  selector: 'app-battle',
  templateUrl: './battle.component.html',
  styleUrls: ['./battle.component.css'],
  providers: [ApiService]
})
export class BattleComponent implements OnInit, OnDestroy {

  opponent?: Pokemon;
  secondOpponent?: Pokemon;
  lastDefender: Pokemon;
  lastAttacker: Pokemon;
  nbRound = 0;
  battleLogs: Array<AttackInformation> = [];
  battleInProgress = false;
  battleFinished = false;
  roundInterval = 0;
  winnerName = '';
  startBattleDate: Date;
  subscriber: Subscription;

  constructor(private route: ActivatedRoute, private apiService: ApiService) {
  }

  async ngOnInit(): Promise<any> {
    this.route.queryParams
      .subscribe(params => this.handleQueryParams(params));
  }

  async fight(): Promise<void> {
    const winner = await this.startFightObserver();
    // this.handleEndBattle(winner);
  }

  private startFight(): Promise<Pokemon> {
    this.startBattleDate = new Date();

    return new Promise(resolve => {
      const fasterPokemon = Battle.getFasterPokemon(this.opponent, this.secondOpponent);
      const slowestPokemon = fasterPokemon === this.opponent ? this.secondOpponent : this.opponent;

      this.roundInterval = window.setInterval(() => {
        if (!this.battleInProgress) {
          clearInterval(this.roundInterval);
          return;
        }

        this.opponent.color = 'green';
        this.secondOpponent.color = 'blue';

        if (this.opponent.health < MINIMUM_LIFE || this.secondOpponent.health < MINIMUM_LIFE) {
          clearInterval(this.roundInterval);
          this.battleFinished = true;
          this.winnerName = this.lastDefender.name;
          return resolve(this.lastDefender);
        }

        if (this.nbRound === 0) {
          this.handleAttack(fasterPokemon, slowestPokemon);
          this.lastDefender = slowestPokemon;
          this.lastAttacker = fasterPokemon;
          this.nbRound++;
          return;
        }

        this.handleAttack(this.lastDefender, this.lastAttacker);

        if (this.lastAttacker.health === 0) {
          clearInterval(this.roundInterval);
          this.battleFinished = true;
          this.winnerName = this.lastDefender.name;
          return resolve(this.lastDefender);
        }

        const tempAttacker = this.lastAttacker;
        this.lastAttacker = this.lastDefender;
        this.lastDefender = tempAttacker;
        this.nbRound++;

      }, 100);
    });
  }

  private startFightObserver() {
    const source = new Observable(subscriber => {
      const interval = setInterval(() => {
        const fasterPokemon = Battle.getFasterPokemon(this.opponent, this.secondOpponent);
        const slowestPokemon = fasterPokemon === this.opponent ? this.secondOpponent : this.opponent;

        if (!this.battleInProgress) {
          clearInterval(interval);
          return;
        }

        this.opponent.color = 'green';
        this.secondOpponent.color = 'blue';

        if (this.opponent.health < MINIMUM_LIFE || this.secondOpponent.health < MINIMUM_LIFE) {
          clearInterval(interval);
          this.battleFinished = true;
          this.winnerName = this.lastDefender.name;
          return subscriber.next(this.lastDefender);
        }

        if (this.nbRound === 0) {
          this.handleAttack(fasterPokemon, slowestPokemon);
          this.lastDefender = slowestPokemon;
          this.lastAttacker = fasterPokemon;
          this.nbRound++;
          return;
        }

        this.handleAttack(this.lastDefender, this.lastAttacker);

        if (this.lastAttacker.health === 0) {
          clearInterval(interval);
          this.battleFinished = true;
          this.winnerName = this.lastDefender.name;
          return subscriber.next(this.lastDefender);
        }

        const tempAttacker = this.lastAttacker;
        this.lastAttacker = this.lastDefender;
        this.lastDefender = tempAttacker;
        this.nbRound++;
      }, 1000);
      return () => {
        subscriber.complete();
        clearInterval(interval);
      };
    });

    this.subscriber = source.subscribe(
      next => console.log('onNext:', next),
      error => console.error('onError: %s', error),
      () => console.log('onCompleted')
    );
  }

  async toggleFight(): Promise<void> {
    this.battleInProgress = !this.battleInProgress;

    await this.fight();
  }

  restartFight(): void {
    this.opponent = new Pokemon(Pikachu);
    this.secondOpponent = new Pokemon(Bulbizard);

    console.log('this.opponent', this.opponent);
    console.log('this.secondOpponent', this.secondOpponent);

    this.fight().then((res) => {
      console.log('res', res);
    })
      .catch((err) => {
        console.log('err', err);
      });
  }

  private handleAttack(opponent: Pokemon, secondOpponent: Pokemon): void {
    const attackInformation = AttackService.attack(opponent, opponent.attacks[0], secondOpponent);
    this.battleLogs.push(attackInformation);
  }

  private handleEndBattle(winner: Pokemon): void {
    console.log('winner', winner);
  }

  private handleQueryParams(params): void {
    this.apiService.getPokemon(params.pok1)
      .subscribe(pokemon => {
        this.opponent = pokemon;
      });

    this.apiService.getPokemon(params.pok2)
      .subscribe(pokemon => {
        this.secondOpponent = pokemon;
      });
  }

  ngOnDestroy() { this.subscriber.unsubscribe(); }
  /*ngOnDestroy(): void {
    clearInterval(this.roundInterval);
  }*/
}
