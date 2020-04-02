import { Component, OnInit } from '@angular/core';
import { CreationService } from '../Services/creationService/CreationService';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-pokemon-creation',
  templateUrl: './pokemon-creation.component.html',
  styleUrls: ['./pokemon-creation.component.css']
})
export class PokemonCreationComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<PokemonCreationComponent>, public creationService: CreationService) { }

  ngOnInit(): void {
  }

  createPokemon(): void {
    this.dialogRef.close();
  }
}
