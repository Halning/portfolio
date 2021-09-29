import {
  Directive,
  Inject,
  Input,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';

const MAX_VALUE = 0x10000;

export class RepeatTimesContext {
  constructor(readonly $implicit: number) {}
}

@Directive({
  selector: '[repeatTimes][repeatTimesOf]',
})
export class RepeatTimesDirective {
  @Input()
  set repeatTimesOf(count: number) {
    const safeCount = Math.floor(Math.max(0, Math.min(count, MAX_VALUE)));
    const { length } = this.viewContainer;

    if (safeCount < length) {
      this.removeContainers(length - safeCount);
    } else {
      this.addContainers(length, safeCount);
    }
  }

  constructor(
    @Inject(ViewContainerRef) private readonly viewContainer: ViewContainerRef,
    @Inject(TemplateRef)
    private readonly templateRef: TemplateRef<RepeatTimesContext>,
  ) {}

  private addContainers(length: number, count: number) {
    for (let index = length; index < count; index++) {
      this.viewContainer.createEmbeddedView<RepeatTimesContext>(
        this.templateRef,
        new RepeatTimesContext(index),
      );
    }
  }

  private removeContainers(amount: number) {
    for (let index = 0; index < amount; index++) {
      this.viewContainer.remove();
    }
  }
}

// usage
// <div class="calendar">
// <button *repeatTimes="let day of days" (click)="onDaySelect(day + 1)">
//   {{day + 1}}
// </button>
// </div>


// https://twitter.com/marsibarsi/status/1270282771458555906?ref_src=twsrc%5Etfw%7Ctwcamp%5Etweetembed%7Ctwterm%5E1270282771458555906%7Ctwgr%5E%7Ctwcon%5Es1_&ref_url=https%3A%2F%2Fcdn.embedly.com%2Fwidgets%2Fmedia.html%3Ftype%3Dtext2Fhtmlkey%3Da19fcc184b9711e1b4764040d3dc5c07schema%3Dtwitterurl%3Dhttps3A%2F%2Ftwitter.com%2Fmarsibarsi%2Fstatus%2F1270282771458555906image%3D
