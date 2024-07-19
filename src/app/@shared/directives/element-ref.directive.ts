import { Directive, ElementRef } from '@angular/core';
import { Element } from '@angular/compiler';

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: '[elementRef]',
  exportAs: 'elementRef',
})
export class ElementRefDirective<T extends Element> extends ElementRef<T> {
  constructor({ nativeElement }: ElementRef<T>) {
    super(nativeElement);
  }
}

// <my-comp #ref="elementRef" elementRef></my-comp>
// <button (click)="ref.nativeElement.focus()">
