export class PokemonSpritesBeans {
    sprites: {
        back_default: string;
        back_female: string;
        back_shiny: string;
        back_shiny_female: string;
        front_default: string;
        front_female: string;
        front_shiny: string;
        front_shiny_female: string;
    };
}

export class PokemonMovesBeans {
    move: {
        name: string;
    };
}

export class PokemonStatsBeans {
    stats: {
        name: 'hp' | 'speed' | 'attack' | 'defense' | 'special-attack' | 'special-defense'
    };
    // tslint:disable-next-line:variable-name
    base_stat: number;
    effort: number;
}

export class PokemonBeans {
    id: number;
    name: string;
    // tslint:disable-next-line:variable-name
    base_experience: number;
    sprites: PokemonSpritesBeans;
    moves: PokemonMovesBeans[];
    stats: PokemonStatsBeans[];
}
