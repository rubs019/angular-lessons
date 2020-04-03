import { async, ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { PokemonCreationComponent } from './pokemon-creation.component';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';

describe('PokemonCreationComponent', () => {
  let component: PokemonCreationComponent;
  let fixture: ComponentFixture<PokemonCreationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, FormsModule],
      providers: [{
        provide: MatDialogRef
      }],
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
