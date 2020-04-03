import { Attack } from '../Attack/Attack.definition';
import { IPokemon } from './IPokemon';
import { PokemonBeans, PokemonSpritesBeans } from './pokemonBeans';


export class Pokemon {

  id?: number;
  name?: string;
  level?: number;
  speed?: number;
  offStat?: number;
  defStat?: number;
  maxHealth?: number;
  health?: number;
  basePower?: number;
  attacks?: Attack[];
  sprites?: PokemonSpritesBeans;
  color?: string;
  custom: boolean;

  constructor(pokemon?: IPokemon) {
    this.id = pokemon?.id;
    this.name = pokemon?.name;
    this.level = pokemon?.level || 10;
    this.speed = pokemon?.speed;
    this.offStat = pokemon?.offStat;
    this.defStat = pokemon?.defStat;
    this.maxHealth = pokemon?.maxHealth;
    this.health = this.maxHealth;
    this.basePower = pokemon?.basePower;
    this.attacks = pokemon?.attacks;
    this.sprites = pokemon?.sprites;
    this.custom = pokemon?.custom;
  }

  public static BeansToPokemon(pokemonBeans: PokemonBeans): Pokemon {
    const attacks = pokemonBeans.moves
        .slice(0, 10)
        .map(m => ({
            name: m.move.name,
            basePower: pokemonBeans.stats.find( s => s.stat.name === 'attack').base_stat
        }));

    const speed = pokemonBeans.stats.find( s => s.stat.name === 'speed').base_stat;
    const hp = pokemonBeans.stats.find( s => s.stat.name === 'hp').base_stat;
    const offStat = pokemonBeans.stats.find( s => s.stat.name === 'attack').base_stat;
    const defStat = pokemonBeans.stats.find( s => s.stat.name === 'defense').base_stat;

    return new Pokemon({
        id: pokemonBeans.id,
        name: pokemonBeans.name,
        level: 10,
        speed,
        offStat,
        defStat,
        maxHealth: hp,
        attacks,
        sprites: pokemonBeans.sprites,
        custom: false
    });

}

  public loseHealth(damage: number): void {
    this.health -= damage;
    if (this.health < 0) {
      this.health = 0;
    }
  }
}
