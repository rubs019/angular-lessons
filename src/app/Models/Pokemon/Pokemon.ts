import { Attack } from '../Attack/Attack';
import { IPokemon } from './IPokemon';
import { PokemonBeans } from './pokemonBeans';

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

  constructor(pokemon: IPokemon) {
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
  }

  public static BeansToPokemon(pokemonBeans: PokemonBeans): Pokemon {
    const attacks = pokemonBeans.moves
        .slice(0, 10)
        .map(m => new Attack({
            name: m.move.name,
            basePower: pokemonBeans.stats.find( s => s.stats.name === 'attack').base_stat
        }));
    const speed = pokemonBeans.stats.find( s => s.stats.name === 'speed').base_stat;
    const hp = pokemonBeans.stats.find( s => s.stats.name === 'hp').base_stat;
    const offStat = pokemonBeans.stats.find( s => s.stats.name === 'attack').base_stat;
    const defStat = pokemonBeans.stats.find( s => s.stats.name === 'defense').base_stat;

    return new Pokemon({
        id: pokemonBeans.id,
        name: pokemonBeans.name,
        level: 10,
        speed,
        offStat,
        defStat,
        maxHealth: hp,
        attacks,
    });

}

  public loseHealth(damage: number): void {
    this.health -= damage;
    if (this.health < 0) {
      this.health = 0;
    }
  }
}
