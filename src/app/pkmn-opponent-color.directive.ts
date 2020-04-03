import { Directive, ElementRef, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[appPokemonOpponentColor]'
})
export class PkmnOpponentColorDirective implements OnInit {
  constructor(private el: ElementRef) {
  }

  @Input('appPokemonOpponentColor') pkmnOpponentColor: string;

  ngOnInit(): void {
    this.setColor();
  }

  private setColor() {
    this.el.nativeElement.style.color = this.pkmnOpponentColor;
  }
}
