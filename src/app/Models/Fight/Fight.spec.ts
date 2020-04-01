import { Pokemon } from '../Pokemon/Pokemon';
import { Battle } from './Fight';


describe('It should be Pikachu', () => {
    const pikachu: Pokemon = new Pokemon({
        name: 'Pikachu',
        speed: 90,
    });
    const bulbizard: Pokemon = new Pokemon({
        name: 'Bulbizard',
        speed: 48,
    });

    test('should pick the faster Pokemon', () => {
      expect(Battle.getFasterPokemon(bulbizard, pikachu)).toBe(pikachu);
      expect(Battle.getFasterPokemon(pikachu, bulbizard)).toBe(pikachu);
    });
});
