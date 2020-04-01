import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Pokemon } from '../Models/Pokemon/Pokemon';
import { PokemonBeans } from '../Models/Pokemon/pokemonBeans';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  public APIUrl = 'https://pokeapi.co/api/v2';
  public NbrPokemon = 100;

  constructor(private http: HttpClient) {}

  handleError(error: HttpErrorResponse) {
    let err = 'ERROR';
    if (error.error instanceof ErrorEvent) {
      err = `Error: ${error.error.message}`;
    } else {
      err = `Error: ${error.message}`;
    }
    return throwError(err);
  }

  public getPokemon(key: string | number): Observable<Pokemon> {

    return this.http.get<PokemonBeans>(`${this.APIUrl}/pokemon/${key}`)
      .pipe(
        catchError(this.handleError),
        map(pokemon => Pokemon.BeansToPokemon(pokemon))
      );
  }
}
