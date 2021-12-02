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

// usage
// https://twitter.com/Waterplea/status/1283385882310062080?ref_src=twsrc%5Etfw%7Ctwcamp%5Etweetembed%7Ctwterm%5E1283385882310062080%7Ctwgr%5E%7Ctwcon%5Es1_&ref_url=https%3A%2F%2Fcdn.embedly.com%2Fwidgets%2Fmedia.html%3Ftype%3Dtext2Fhtmlkey%3Da19fcc184b9711e1b4764040d3dc5c07schema%3Dtwitterurl%3Dhttps3A%2F%2Ftwitter.com%2Fwaterplea%2Fstatus%2F1283385882310062080image%3D
