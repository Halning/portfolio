import { NgIf, NgIfContext } from '@angular/common';
import { Directive, Input, OnChanges, TemplateRef } from '@angular/core';

@Directive({
  selector: '[ngIf][ngIfOr],[ngIf][ngIfBut]',
})
export class NgIfAugmentedDirective<T> implements OnChanges {
  @Input()
  ngIf: unknown = false;

  @Input()
  ngIfElse: TemplateRef<NgIfContext<T>> | null = null;

  @Input()
  ngIfThen: TemplateRef<NgIfContext<T>> = this.templateRef;

  @Input()
  ngIfOr: TemplateRef<NgIfContext<T>> | null = null;

  @Input()
  ngIfBut: TemplateRef<NgIfContext<T>> | null = null;

  constructor(
    private readonly directive: NgIf<T>,
    private readonly templateRef: TemplateRef<NgIfContext<T>>,
  ) {}

  ngOnChanges() {
    if (this.ngIf === null && this.ngIfOr) {
      this.directive.ngIfElse = this.ngIfOr;

      return;
    }

    if (this.ngIf instanceof Error && this.ngIfBut) {
      this.directive.ngIfThen = this.ngIfBut;

      return;
    }

    if (this.directive.ngIfThen !== this.ngIfThen) {
      this.directive.ngIfThen = this.ngIfThen;
    }

    if (this.directive.ngIfElse !== this.ngIfElse) {
      this.directive.ngIfElse = this.ngIfElse;
    }
  }
}

// usage
// https://habr.com/ru/company/tinkoff/blog/580172/?s=09
