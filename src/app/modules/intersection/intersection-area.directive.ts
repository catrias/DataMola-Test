import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appIntersectionArea]',
})
export class IntersectionAreaDirective {
  constructor(private elementRef: ElementRef<HTMLElement>) {
  }

  public get nativeElement(): HTMLElement {
    return this.elementRef.nativeElement;
  }
}
