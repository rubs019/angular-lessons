import { Attack } from '../Attack/Attack.definition';
import { PokemonSpritesBeans } from './pokemonBeans';

export interface IPokemon {
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
  specOffStat?: number;
  specDefStat?: number;
  sprites?: PokemonSpritesBeans;
}
