import { Injectable } from '@angular/core';
import { Pokemon } from 'src/app/Models/Pokemon/Pokemon';

@Injectable({
  providedIn: 'root'
})
export class CreationService {

    public createPokemon: Pokemon = new Pokemon();
    constructor() { }
}
