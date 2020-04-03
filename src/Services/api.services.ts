import { Observable, throwError } from 'rxjs';
import { Pokemon } from 'src/app/Models/Pokemon/Pokemon';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { PokemonDefinition } from '../app/Models/Pokemon/Pokemon.definition';

@Injectable({
  providedIn: 'root'
})
export default class PokeApiService {
  public APIUrl = 'https://pokeapi.co/api/v2';
  public NbrPokemon = 100;

  constructor(private http: HttpClient) {}

  handleError(error: HttpErrorResponse) {
    let err: string;
    if (error.error instanceof ErrorEvent) {
      err = `Error: ${error.error.message}`;
    } else {
      err = `Error: ${error.message}`;
    }
    return throwError(err);
  }

  public getPokemon(key: string | number): Observable<Pokemon> {

    return this.http.get<PokemonDefinition>(`${this.APIUrl}/pokemon/${key}/`)
      .pipe(
        catchError(this.handleError),
        map(pokemon => Pokemon.BeansToPokemon(pokemon))
      );
  }

}
