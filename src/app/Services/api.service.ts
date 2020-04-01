import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  BASE_URL = 'https://pokeapi.co/api/v2';
  constructor(private http: HttpClient) { }

  getPokemon(pokemonIdentifier: string | number): Observable<any> {
    return this.http.get(`${this.BASE_URL}/pokemon/${pokemonIdentifier}`);
  }
}
