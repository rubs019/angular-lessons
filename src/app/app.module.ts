import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { PokemonSelectorComponent } from './pokemon-selector/pokemon-selector.component';
import { BattleComponent } from './battle/battle.component';
import { PkmnOpponentColorDirective } from './pkmn-opponent-color.directive';
import { HttpClientModule } from '@angular/common/http';
import { PokemonCreationComponent } from './pokemon-creation/pokemon-creation.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule, MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    PokemonSelectorComponent,
    BattleComponent,
    PkmnOpponentColorDirective,
    PokemonCreationComponent
  ],
  entryComponents: [
    PokemonCreationComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatDialogModule,
    FormsModule
  ],
  providers: [
    {provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: false}}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
