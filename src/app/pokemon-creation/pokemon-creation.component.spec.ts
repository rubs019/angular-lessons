import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonCreationComponent } from './pokemon-creation.component';

describe('PokemonCreationComponent', () => {
  let component: PokemonCreationComponent;
  let fixture: ComponentFixture<PokemonCreationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PokemonCreationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PokemonCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
