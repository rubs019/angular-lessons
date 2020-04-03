import { Attack } from '../../Services/Attack/Attack.definition';

export type PokemonSpritesBeans = {
  back_default: string;
  back_female?: string;
  back_shiny?: string;
  back_shiny_female?: string;
  front_default: string;
  front_female?: string;
  front_shiny?: string;
  front_shiny_female?: string;
};

export type PokemonMovesBeans = {
  move: {
    name: string;
  };
};

export type PokemonStatsBeans = {
  stat: {
    name: 'hp' | 'speed' | 'attack' | 'defense' | 'special-attack' | 'special-defense'
  };
  base_stat: number;
  effort: number;
};

export type PokemonDefinition = {
  id: number;
  name: string;
  // tslint:disable-next-line:variable-name
  base_experience: number;
  sprites: PokemonSpritesBeans;
  moves: PokemonMovesBeans[];
  stats: PokemonStatsBeans[];
};

export interface IPokemon {
  id?: number;
  name?: string;
  level?: number;
  speed?: number;
  offStat?: number;
  defStat?: number;
  basePower?: number;
  maxHealth?: number;
  health?: number;
  attacks?: Attack[];
  sprites?: PokemonSpritesBeans;
  custom?: boolean;
}
