import { Directive, ElementRef, Inject, Renderer2 } from '@angular/core';
import { fromEvent } from 'rxjs';
import { distinctUntilChanged, map, pairwise, startWith } from 'rxjs/operators';
import { WINDOW } from '@ng-web-apis/common';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

const THRESHOLD = 200;

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: '[sticky]',
})
@UntilDestroy()
export class StickyDirective {
  constructor(
    @Inject(WINDOW) windowRef: Window,
    renderer: Renderer2,
    { nativeElement }: ElementRef<HTMLElement>,
  ) {
    fromEvent(windowRef, 'scroll')
      .pipe(
        map(() => windowRef.scrollY),
        pairwise(),
        map(([prev, next]) => next < THRESHOLD || prev > next),
        distinctUntilChanged(),
        startWith(true),
        untilDestroyed(this),
      )
      .subscribe((stuck) => {
        renderer.setAttribute(nativeElement, 'data-stuck', String(stuck));
      });
  }
}
