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
    await this.startFightObserver();
  }

  private startFightObserver() {

    const sub = this.battleService.start(this.opponent, this.secondOpponent)
      .pipe(mergeMap(nb => {
        return this.battleService.playRound(nb);
      }));

    this.subscriber = sub.subscribe(
      (next: { nbRound: number, log: AttackInformation, winner?: Pokemon }) => {
        console.log('fire', next);
        if (!next.winner) {
          console.log(next.nbRound);
          this.battleLogs.push(next.log);
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
    this.subscriber?.unsubscribe();
  }
}
