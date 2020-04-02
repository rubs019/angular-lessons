import { Component, OnInit, OnDestroy } from '@angular/core';
import { Pokemon } from '../Models/Pokemon/Pokemon';
import { Bulbizard, Pikachu } from '../Models/FakePokemons';
import { Battle } from '../Models/Fight/Fight';
import { MINIMUM_LIFE } from '../constants';
import AttackService from '../Models/Attack/Attack.service';
import { AttackInformation } from '../Models/Attack/Attack.definition';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../Services/apiService/api.service';
import { interval, Observable, Subscriber, Subscription } from 'rxjs';
import { BattleService } from '../Services/battleService/battle-service.service';
import { mergeMap, take } from 'rxjs/operators';

@Component({
  selector: 'app-battle',
  templateUrl: './battle.component.html',
  styleUrls: ['./battle.component.css'],
  providers: [ApiService, BattleService]
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

  constructor(private route: ActivatedRoute, private apiService: ApiService, private battleService: BattleService) {
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

    this.battleService.start(this.opponent, this.secondOpponent)
      .pipe(mergeMap(nb => {
        return this.battleService.playRound(nb);
      }))
      .subscribe(
      (next: {nbRound: number, log: AttackInformation, winner?: Pokemon}) => {
        console.log('fire', next)
        if (!next.winner) {
          console.log(next.nbRound);
          this.battleLogs.push(next.log)
          return;
        }
        this.battleFinished = true;
        this.winnerName = next.winner?.name;
        this.battleLogs.push(next.log);
      }
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
        this.opponent.color = 'blue';
      });

    this.apiService.getPokemon(params.pok2)
      .subscribe(pokemon => {
        this.secondOpponent = pokemon;
        this.secondOpponent.color = 'red';
      });
  }

  ngOnDestroy() {
    this.subscriber.unsubscribe();
  }

  /*ngOnDestroy(): void {
    clearInterval(this.roundInterval);
  }*/
}
