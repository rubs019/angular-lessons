import { TestBed } from '@angular/core/testing';
import { BattleService } from './battle-service.service';
import { Pokemon } from '../../Models/Pokemon/Pokemon';

describe('BattleServiceService', () => {
  let service: BattleService;
  let pikachu: Pokemon;
  let bulbizard: Pokemon;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BattleService);

    pikachu = new Pokemon({
      name: 'Pikachu',
      speed: 90,
    });
    bulbizard = new Pokemon({
      name: 'Bulbizard',
      speed: 48,
    });
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should pick the faster Pokemon', () => {
    expect(service.getFasterPokemon(bulbizard, pikachu)).toBe(pikachu);
    expect(service.getFasterPokemon(pikachu, bulbizard)).toBe(pikachu);
  });
});
