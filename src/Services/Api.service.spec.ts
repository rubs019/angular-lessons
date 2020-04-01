import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import ApiService from './api.services';
import { Pokemon } from 'src/app/Models/Pokemon/Pokemon';

describe('ApiService', () => {
  let api: ApiService;
  let httpMock: HttpTestingController;
  let pokemonName: string;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    api = TestBed.inject(ApiService);
    httpMock = TestBed.get(HttpTestingController);
    pokemonName = 'ditto';
  });

  it('Should be created', () => {
    expect(api).toBeTruthy();
    api.getPokemon('ditto').subscribe((pokemon: Pokemon) => {
      expect(pokemonName).toBe('ditto');
      console.log('pokemon :' + pokemon.name);
    });
    httpMock.expectOne(`${api.APIUrl}/pokemon/ditto/`).flush({
      name: 'ditto'
    });
    httpMock.verify();
  });
});
