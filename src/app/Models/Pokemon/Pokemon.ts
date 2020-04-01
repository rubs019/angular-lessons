import { Attack } from '../Attack/Attack.definition';
import { IPokemon } from './IPokemon';

export class Pokemon {
  id: number;
  name: string;
  level: number;
  speed: number;
  offStat: number;
  defStat: number;
  maxHealth: number;
  health: number;
  basePower: number;
  attacks: Attack[];
  specOffStat: number;
  specDefStat: number;

  constructor(pokemon?: IPokemon) {
    this.id = pokemon?.id;
    this.name = pokemon?.name;
    this.level = pokemon?.level;
    this.speed = pokemon?.speed;
    this.offStat = pokemon?.offStat;
    this.defStat = pokemon?.defStat;
    this.maxHealth = pokemon?.maxHealth;
    this.basePower = pokemon?.basePower;
    this.health = this.maxHealth;
    this.attacks = pokemon?.attacks;
    this.specOffStat = pokemon?.specOffStat;
    this.specDefStat = pokemon?.specDefStat;
  }

  public loseHealth(damage: number): void {
    this.health -= damage;
    if (this.health < 0) {
      this.health = 0;
    }
  }


}
