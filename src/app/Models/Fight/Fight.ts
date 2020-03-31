import { Pokemon } from '../Pokemon/Pokemon';


function randomInt(numberMax: number): number {
    return Math.floor(Math.random() * Math.floor(numberMax));
}

export class Battle {

    static getFaster(pokemon1: Pokemon, pokemon2: Pokemon): Pokemon {
        if (pokemon1.speed > pokemon2.speed){
            return pokemon1;
        } else if (pokemon2.speed > pokemon2.speed) {
            return pokemon2;
        } else {
            const rand = randomInt(2);
            return rand === 0 ? pokemon1 : pokemon2;
        }
    }
}
