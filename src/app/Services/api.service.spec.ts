import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed, async } from '@angular/core/testing';

import { ApiService } from './api.service';
import { Pokemon } from '../Models/Pokemon/Pokemon';
import { PokemonBeans } from '../Models/Pokemon/pokemonBeans';

describe('ApiService', () => {
  let service: ApiService;
  let httpMock: HttpTestingController;
  const pokemonBeans = {
    name: 'ditto',
      moves: [
        {
          move : {
            name: 'transform',
          }
        }
      ],
      stats: [
        {
          base_stat: 45,
          stat: {
            name: 'speed',
          }
        },
        {
          base_stat: 65,
          stat: {
            name: 'special-defense',
          }
        },
        {
          base_stat: 65,
          stat: {
            name: 'special-attack',
          }
        },
        {
          base_stat: 49,
          stat: {
            name: 'defense',
          }
        },
        {
          base_stat: 49,
          stat: {
            name: 'attack',
          }
        },
        {
          base_stat: 45,
          stat: {
            name: 'hp',
          }
        }
      ],
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(ApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return a pokemon', async(() => {
    service.getPokemon('ditto').subscribe((pokemon: Pokemon) => {
      console.log('Pokemon', pokemon.name); // Ditta
      expect(pokemon.name).toBe('ditto');
    });

    httpMock.expectOne(`${service.APIUrl}/pokemon/ditto`).flush(pokemonBeans);

    httpMock.verify();
  }));
});
