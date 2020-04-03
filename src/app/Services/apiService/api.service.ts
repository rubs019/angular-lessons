import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, forkJoin } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Pokemon } from 'src/app/Models/Pokemon/Pokemon';
import { PokemonDefinition } from '../../Models/Pokemon/Pokemon.definition';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  public API_URL = 'https://pokeapi.co/api/v2';
  public NB_MAX_POKEMON = 61;

  constructor(private http: HttpClient) {}

  handleError(error: HttpErrorResponse) {
    let err;
    if (error.error instanceof ErrorEvent) {
      err = `Error: ${error.error.message}`;
    } else {
      err = `Error: ${error.message}`;
    }
    return throwError(err);
  }

  public getPokemon(key: string | number): Observable<Pokemon> {

    return this.http.get<PokemonDefinition>(`${this.API_URL}/pokemon/${key}`)
      .pipe(
        catchError(this.handleError),
        map(pokemon => Pokemon.BeansToPokemon(pokemon))
      );
  }

  public getPokemons(): Observable<Pokemon[]> {
    const requests: Observable<Pokemon>[] = [];

    for (let i = 1 ; i < this.NB_MAX_POKEMON ; i++ ) {
      requests.push(this.getPokemon(i));
    }
    return forkJoin(requests);
  }
}
