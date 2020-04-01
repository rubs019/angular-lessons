import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { ApiService } from './api.service';
import { Pokemon } from '../Models/Pokemon/Pokemon';

describe('ApiService', () => {
  let service: ApiService;
  let httpMock: HttpTestingController;

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

  it('should return a pokemon', async () => {
    service.getPokemon('ditto').subscribe((pokemon: Pokemon) => {
      console.log('Pokemon', pokemon.name);
      return pokemon.name;
    });

    httpMock.expectOne(`${service.BASE_URL}/pokemon/ditto`).flush({
      name: 'Ditta'
    });

    httpMock.verify();
  });
});
