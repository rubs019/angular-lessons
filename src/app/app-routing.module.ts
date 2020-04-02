import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './main/main.component';
import { BattleComponent } from './battle/battle.component';
import { PokemonCreationComponent } from './pokemon-creation/pokemon-creation.component';


const routes: Routes = [
  {path: '', component: MainComponent},
  {path: 'battle', component: BattleComponent},
  {path: 'create-pokemon', component: PokemonCreationComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
