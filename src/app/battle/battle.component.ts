import { Component, OnInit, OnDestroy } from '@angular/core';
import { Pokemon } from '../Models/Pokemon/Pokemon';
import { Bulbizard, Pikachu } from '../Models/FakePokemons';
import { Battle } from '../Models/Fight/Fight';
import { MINIMUM_LIFE } from '../constants';
import AttackService from '../Models/Attack/Attack.service';
import { AttackInformation } from '../Models/Attack/Attack.definition';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../Services/api.service';

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

  constructor(private route: ActivatedRoute, private apiService: ApiService) {
  }

  async ngOnInit(): Promise<any> {
    this.route.queryParams
      .subscribe(params => {
        console.log(params);
        this.apiService.getPokemon(params.pok1)
          .subscribe((pokemon: Pokemon) => {
            this.opponent = pokemon;
        });

        this.apiService.getPokemon(params.pok2)
          .subscribe((pokemon: Pokemon) => {
            this.secondOpponent = pokemon;
          });
      });
  }

  ngOnDestroy(): void {
    clearInterval(this.roundInterval);
  }

  async fight(): Promise<void> {
    const winner = await this.startFight();
    this.handleEndBattle(winner);
  }

  private startFight(): Promise<Pokemon> {
    this.startBattleDate = new Date();
    console.log('this.startBattleDate', this.startBattleDate);

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

  async toggleFight(): Promise<void> {
    this.battleInProgress = !this.battleInProgress;

    const winner = await this.startFight();

    this.handleEndBattle(winner);
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

}
