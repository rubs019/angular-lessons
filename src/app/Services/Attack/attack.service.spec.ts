import { TestBed } from '@angular/core/testing';

import { AttackService } from './attack.service';
import { Pokemon } from '../../Models/Pokemon/Pokemon';
import { Bulbizard, Pikachu } from '../../Models/FakePokemons';

describe('AttackService', () => {
  let service: AttackService;
  let pikachu: Pokemon;
  let bulbizard: Pokemon;
  let spy: any;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AttackService]
    });
    service = TestBed.inject(AttackService);

    pikachu = new Pokemon(Pikachu);
    bulbizard = new Pokemon(Bulbizard);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('Should return a correct AttackInformation', () => {
    spyOn(service, 'calculateAttackDamage').and.returnValue(10);
    spyOn(service, 'randomIndex').and.returnValue(0);
    const damages = service.attack(pikachu, bulbizard);
    expect(service.calculateAttackDamage).toHaveBeenCalledTimes(1);
    expect(service.randomIndex).toHaveBeenCalledTimes(1);

    expect(damages).toStrictEqual({
      attackName: 'Charge',
      attackerName: 'Pikachu',
      damage: 10,
      defenderName: 'Bulbizard'
    });
  });

  it('Calculated damage of Bulbizard should be 3', () => {
    const damages = service.calculateAttackDamage(bulbizard, bulbizard.attacks[0], pikachu);
    expect(damages).toBe(2);
  });
});
