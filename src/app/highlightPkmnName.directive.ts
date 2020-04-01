import { Directive, ElementRef, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[appPkmnOpponentColor]'
})
export class HighlightPkmnNameDirective implements OnInit {
  constructor(private el: ElementRef) {
  }

  ngOnInit(): void {
    this.setColor();
  }


  @Input('appPkmnOpponentColor') textColor: string;

  private setColor() {
    console.log('this.textColor', this.textColor);
    this.el.nativeElement.style.color = this.textColor;
  }
}
