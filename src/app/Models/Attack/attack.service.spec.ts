import AttackService from './attack.service';
import { Pokemon } from '../Pokemon/Pokemon';
import { Attack, AttackInformation } from './Attack.definition';
import { Bulbizard, Pikachu } from '../FakePokemons';

describe('Attack', () => {
  let pikachu: Pokemon;
  let bulbizard: Pokemon;

  beforeEach( () => {
    pikachu = new Pokemon(Pikachu);
    bulbizard = new Pokemon(Bulbizard);
  });

  it('Calculated damages of Pikachu Eclair should be 29', () => {
    const damages = AttackService.calculateAttackDammages(pikachu, pikachu.attacks[0], bulbizard);
    expect(damages).toBe(15);
  });

  it('Calculated damages of Bulbizard should be 3', () => {
    const damages = AttackService.calculateAttackDammages(bulbizard, bulbizard.attacks[0], pikachu);
    expect(damages).toBe(2);
  });

  it('Bulbizard should have 19 health', () => {
    AttackService.attack(pikachu, bulbizard);
    expect(bulbizard.health).toBe(33);
  });

  it('Attack should return 29 damages ', () => {
    const attackInformation = AttackService.attack(pikachu, bulbizard);
    const expectResult: AttackInformation = {
      attackerName: pikachu.name,
      attackName: 'coucou',
      damage: 15,
      defenderName: bulbizard.name
    };
    expect(attackInformation).toContain({
      attackerName: pikachu.name,
      attackName: expect.any(String),
      damage: 15,
      defenderName: bulbizard.name
    });
  });
});
