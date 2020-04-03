import { Component, OnInit, OnDestroy } from '@angular/core';
import { Pokemon } from '../Models/Pokemon/Pokemon';
import { AttackInformation } from '../Services/Attack/Attack.definition';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../Services/apiService/api.service';
import { Subscription } from 'rxjs';
import { BattleService } from '../Services/battleService/battle-service.service';
import { mergeMap } from 'rxjs/operators';
import { RoundInformation } from '../Services/battleService/battle-service.definition';

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
  pokemons: Pokemon[];

  constructor(private router: Router, private route: ActivatedRoute, private apiService: ApiService, private battleService: BattleService) {
    this.pokemons = this.router.getCurrentNavigation().extras?.state as Pokemon[];
  }

  async ngOnInit(): Promise<any> {
    this.route.queryParams
      .subscribe(params => this.handleQueryParams(params));
  }

  fight(): void {
    this.startBattleDate = new Date();
    const sub = this.battleService.start(this.opponent, this.secondOpponent)
      .pipe(mergeMap(nbRound => {
        return this.battleService.playRound(nbRound);
      }));

    this.subscriber = sub.subscribe(
      (next: RoundInformation) => {
        this.battleLogs.push(next.log);
        if (!next.winner) {
          return;
        }

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
    console.log('params', params);

    if (!this.pokemons?.[0]?.custom) {
      this.apiService.getPokemon(params.pok1)
        .subscribe(pokemon => {
          this.opponent = pokemon;
          this.opponent.color = 'blue';
        });
    } else {
      this.opponent = this.pokemons[0];
      this.opponent.color = 'blue';
    }

    if (!this.pokemons?.[1]?.custom) {
      this.apiService.getPokemon(params.pok2)
        .subscribe(pokemon => {
          this.secondOpponent = pokemon;
          this.secondOpponent.color = 'red';
        });
    } else {
      this.secondOpponent = this.pokemons[1];
      this.secondOpponent.color = 'red';

    }

  }

  ngOnDestroy() {
    this.subscriber?.unsubscribe();
  }
}
