import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { PokemonSelectorComponent } from './pokemon-selector/pokemon-selector.component';
import { BattleComponent } from './battle/battle.component';
import { PkmnOpponentColorDirective } from './pkmn-opponent-color.directive';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    PokemonSelectorComponent,
    BattleComponent,
    PkmnOpponentColorDirective
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
