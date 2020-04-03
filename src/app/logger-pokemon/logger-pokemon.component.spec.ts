import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoggerPokemonComponent } from './logger-pokemon.component';
import { PkmnOpponentColorDirective } from '../pkmn-opponent-color.directive';

describe('LoggerPokemonComponent', () => {
  let component: LoggerPokemonComponent;
  let fixture: ComponentFixture<LoggerPokemonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoggerPokemonComponent, PkmnOpponentColorDirective ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoggerPokemonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
