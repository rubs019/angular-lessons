import { Observable, throwError } from 'rxjs';
import { Pokemon } from 'src/app/Models/Pokemon/Pokemon';
import { Attack } from 'src/app/Models/Attack/Attack';
import { PokemonBeans } from 'src/app/Models/Pokemon/pokemonBeans';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export default class PokeApiService {
  public APIUrl = 'https://pokeapi.co/api/v2';
  public NbrPokemon = 100;

  constructor(private http: HttpClient) {}

  handleError(err: HttpErrorResponse) {
    let errorMessage = 'ERROR';
    if (err.error instanceof ErrorEvent) {
      // Client-side errors
      errorMessage = `Error: ${err.error.message}`;
    } else {
      errorMessage = `Error Code: ${err.status}\nMessage: ${err.message}`;
    }
    return throwError(errorMessage);
  }

  public getPokemon(key: string | number): Observable<Pokemon> {

    return this.http.get<PokemonBeans>(`${this.APIUrl}/pokemon/${key}/`)
      .pipe(
        catchError(this.handleError),
        map(pokemon => Pokemon.BeansToPokemon(pokemon))
      );
  }

}
