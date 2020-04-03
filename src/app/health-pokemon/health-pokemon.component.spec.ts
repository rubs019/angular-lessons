import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HealthPokemonComponent } from './health-pokemon.component';

describe('HealthPokemonComponent', () => {
  let component: HealthPokemonComponent;
  let fixture: ComponentFixture<HealthPokemonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HealthPokemonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HealthPokemonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
