import { Directive, ElementRef, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[appPkmnOpponentColor]'
})
export class PkmnOpponentColorDirective implements OnInit {
  constructor(private el: ElementRef) {
  }

  @Input('appPkmnOpponentColor') textColor: string;

  ngOnInit(): void {
    this.setColor();
  }

  private setColor() {
    console.log('this.textColor', this.textColor);
    this.el.nativeElement.style.color = this.textColor;
  }
}
