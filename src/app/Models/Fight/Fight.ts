import { Pokemon } from '../Pokemon/Pokemon';

function randomInt(numberMax: number): number {
    return Math.floor(Math.random() * Math.floor(numberMax));
}

export class Battle {

    static getFasterPokemon(pokemon1: Pokemon, pokemon2: Pokemon): Pokemon {
      if (pokemon1.speed === pokemon2.speed) return randomInt(2) === 0 ? pokemon1 : pokemon2;

      return pokemon1.speed > pokemon2.speed ? pokemon1 : pokemon2;
    }
}
