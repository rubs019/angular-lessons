import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { PokemonSelectorComponent } from './pokemon-selector/pokemon-selector.component';
import { BattleComponent } from './battle/battle.component';
import { HighlightPkmnNameDirective } from './highlightPkmnName.directive';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    PokemonSelectorComponent,
    BattleComponent,
    HighlightPkmnNameDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
