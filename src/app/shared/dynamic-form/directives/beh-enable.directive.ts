import {
    Directive, ElementRef, HostBinding, Input, Renderer2
} from '@angular/core';

@Directive({
    selector: '[boBehEnable]'
})
export class BehEnableDirective {
    private disabledView: boolean;

    @Input() set boBehEnable(value) {
        // this.renderer.addClass(this.el.nativeElement, 'disabled');
        if (this.disabledView !== value) {
            this.disabledView = value;
        }
    }

    @HostBinding('class.disabled')
    get isDisabled() {
        return this.disabledView;
    }

    constructor(private el: ElementRef, private renderer: Renderer2) {
    }
}
