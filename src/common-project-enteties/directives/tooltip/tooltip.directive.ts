import { Directive, Input, ElementRef, HostListener, Renderer2, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

type TooltipPosition = 'left' | 'right' | 'above' | 'below';

// TODO consider rewriting to '@angular/cdk/overlay';
@Directive({
  selector: '[tooltip]'
})
export class TooltipDirective {
  @Input('tooltip') tooltipTitle!: string;
  @Input() position: TooltipPosition = 'above';
  @Input() delay = 0;

  readonly offset = 7;

  private tooltip!: HTMLElement | null;

  constructor(
    private readonly el: ElementRef,
    private readonly renderer: Renderer2,
    @Inject('Window') private readonly window: Window,
    @Inject(DOCUMENT) private readonly document: Document
  ) {}

  @HostListener('mouseenter') onMouseEnter(): void {
    if (!this.tooltip) {
      this.show();
    }
  }

  @HostListener('mouseleave') onMouseLeave(): void {
    if (this.tooltip) {
      this.hide();
    }
  }

  private show(): void {
    this.create();
    this.setPosition();
    this.renderer.addClass(this.tooltip, 'ng-tooltip-show');
  }

  private hide(): void {
    this.renderer.removeClass(this.tooltip, 'ng-tooltip-show');
    setTimeout(() => {
      this.renderer.removeChild(this.document.body, this.tooltip);
      this.tooltip = null;
    }, this.delay);
  }

  private create(): void {
    this.tooltip = this.renderer.createElement('span');

    this.renderer.appendChild(this.tooltip, this.renderer.createText(this.tooltipTitle));

    this.renderer.appendChild(this.document.body, this.tooltip);

    this.renderer.addClass(this.tooltip, 'ng-tooltip');
    this.renderer.addClass(this.tooltip, `ng-tooltip-${this.position}`);
    this.renderer.setStyle(this.tooltip, 'transition', `opacity ${this.delay}ms`);
  }

  private setPosition(): void {
    const hostPos = this.el.nativeElement.getBoundingClientRect();
    const tooltipPos = this.tooltip?.getBoundingClientRect();

    const scrollPos =
      this.window.pageYOffset || this.document.documentElement.scrollTop || this.document.body.scrollTop || 0;

    let top, left;

    if (tooltipPos && this.position === 'above') {
      top = hostPos.top - tooltipPos.height - this.offset;
      left = hostPos.left + (hostPos.width - tooltipPos.width) / 2;
    }

    if (tooltipPos && this.position === 'below') {
      top = hostPos.bottom + this.offset;
      left = hostPos.left + (hostPos.width - tooltipPos.width) / 2;
    }

    if (tooltipPos && this.position === 'left') {
      top = hostPos.top + (hostPos.height - tooltipPos.height) / 2;
      left = hostPos.left - tooltipPos.width - this.offset;
    }

    if (tooltipPos && this.position === 'right') {
      top = hostPos.top + (hostPos.height - tooltipPos.height) / 2;
      left = hostPos.right + this.offset;
    }

    this.renderer.setStyle(this.tooltip, 'top', `${top + scrollPos}px`);
    this.renderer.setStyle(this.tooltip, 'left', `${left}px`);
  }
}
