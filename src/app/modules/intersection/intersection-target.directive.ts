import { Directive, ElementRef, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';

import { IntersectionAreaDirective } from './intersection-area.directive';

@Directive({
  selector: '[appIntersectionTarget]',
})
export class IntersectionTargetDirective implements OnInit, OnDestroy {
  @Output() public readonly intersected: EventEmitter<void> = new EventEmitter();

  private intersectionObserver: IntersectionObserver;

  constructor(
    private elementRef: ElementRef<HTMLElement>,
    private intersectionArea: IntersectionAreaDirective,
  ) {
  }

  public ngOnInit(): void {
    this.intersectionObserver = new IntersectionObserver(entries => this.onIntersect(entries[0]), {
      root: this.intersectionArea.nativeElement,
    });

    this.intersectionObserver.observe(this.elementRef.nativeElement);
  }

  public ngOnDestroy(): void {
    this.intersectionObserver.disconnect();
  }

  protected onIntersect(entry: IntersectionObserverEntry): void {
    if (!entry.isIntersecting) {
      return;
    }

    this.intersected.emit();
  }
}
