import {
  Directive,
  Inject,
  Input,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';

export class LetContext<T> {
  constructor(private readonly dir: LetDirective<T>) {}

  get ngLet(): T {
    return this.dir.ngLet;
  }
}

/**
 * Works like *ngIf but does not have a condition
 * Use it to declare the result of pipes calculation
 * (i.e. async pipe)
 */
@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: '[ngLet]',
})
export class LetDirective<T> {
  @Input() ngLet!: T;

  constructor(
    @Inject(ViewContainerRef) viewContainer: ViewContainerRef,
    @Inject(TemplateRef) templateRef: TemplateRef<LetContext<T>>,
  ) {
    viewContainer.createEmbeddedView(templateRef, new LetContext<T>(this));
  }
}

// usage
// https://stackblitz.com/edit/angular-tip-nglet?file=src%2Fapp%2Fapp.component.html
// https://twitter.com/Waterplea/status/1268478931935657985?ref_src=twsrc%5Etfw%7Ctwcamp%5Etweetembed%7Ctwterm%5E1268478931935657985%7Ctwgr%5E%7Ctwcon%5Es1_&ref_url=https%3A%2F%2Fcdn.embedly.com%2Fwidgets%2Fmedia.html%3Ftype%3Dtext2Fhtmlkey%3Da19fcc184b9711e1b4764040d3dc5c07schema%3Dtwitterurl%3Dhttps3A%2F%2Ftwitter.com%2Fwaterplea%2Fstatus%2F1268478931935657985image%3D
