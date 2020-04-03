import { Component, OnInit, OnDestroy } from '@angular/core';
import { Pokemon } from '../Models/Pokemon/Pokemon';
import { AttackInformation } from '../Models/Attack/Attack.definition';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../Services/apiService/api.service';
import { Subscription } from 'rxjs';
import { BattleService, RoundInformation } from '../Services/battleService/battle-service.service';
import { mergeMap } from 'rxjs/operators';

@Component({
  selector: 'app-battle',
  templateUrl: './battle.component.html',
  styleUrls: ['./battle.component.css'],
  providers: [ApiService, BattleService]
})
export class BattleComponent implements OnInit, OnDestroy {

  opponent?: Pokemon;
  secondOpponent?: Pokemon;
  battleLogs: Array<AttackInformation> = [];
  battleInProgress = false;
  battleFinished = false;
  winnerName = '';
  startBattleDate: Date;
  subscriber: Subscription;

  constructor(private route: ActivatedRoute, private apiService: ApiService, private battleService: BattleService) {
  }

  async ngOnInit(): Promise<any> {
    this.route.queryParams
      .subscribe(params => this.handleQueryParams(params));
  }

  fight(): void {
    const sub = this.battleService.start(this.opponent, this.secondOpponent)
      .pipe(mergeMap(nbRound => {
        return this.battleService.playRound(nbRound);
      }));

    this.subscriber = sub.subscribe(
      (next: RoundInformation) => {
        this.battleLogs.push(next.log);
        if (!next.winner) return;

        this.battleFinished = true;
        this.winnerName = next.winner?.name;
      }
    );
  }

  toggleFight(): void {
    this.battleInProgress = !this.battleInProgress;

    this.fight();
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
