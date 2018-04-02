import {
    ComponentFactoryResolver, Directive, Input, OnInit, Renderer2,
    ViewContainerRef
} from '@angular/core';
import { AbstractControl } from '@angular/forms';

import { BoFormGroup } from '../component-models';

import { FormGroupComponent } from '../form-group/form-group.component';
import { FormTextboxComponent } from '../form-brick/form-textbox/form-textbox.component';
import { FormSelectComponent } from '../form-brick/form-select/form-select.component';
import { FormCounterComponent } from '../form-brick/form-counter/form-counter.component';
import { FormRadioComponent } from '../form-brick/form-radio/form-radio.component';
import { FormCounterPriceComponent } from '../form-brick/form-counter/form-counter-price/form-counter-price.component';
import { FormCheckboxComponent } from '../form-brick/form-checkbox/form-checkbox.component';

// register of form component
const components = {
    group: FormGroupComponent,
    textbox: FormTextboxComponent,
    radio: FormRadioComponent,
    dropdown: FormSelectComponent,
    counter: FormCounterComponent,
    'counter-price': FormCounterPriceComponent,
    checkbox: FormCheckboxComponent
};

/* Depricated */

@Directive({
    selector: '[boDynamicBase]'
})
export class DynamicFieldDirective implements OnInit {
    @Input() controlKey: string;
    @Input() group: BoFormGroup;

    component;
    controlType: 'group' | 'control' | 'textbox' | 'radio' | 'select' | 'counter' | 'checkbox' | 'counter-price';

    constructor(private resolver: ComponentFactoryResolver,
                private container: ViewContainerRef,
                private renderer: Renderer2) {
    }

    ngOnInit() {
        const controlIns = this.group.get(this.controlKey);
        this.getControlType(controlIns);
        this.createFieldComponent(controlIns);
    }

    private getControlType(controlIns: AbstractControl): void {
        this.controlType = this.group.get(this.controlKey) instanceof BoFormGroup ? 'group' : 'control';

        if (this.controlType === 'control') {
            this.controlType = controlIns['controlType'];
        }
    }

    private createFieldComponent(controlIns: AbstractControl): void {
        const component = components[this.controlType];
        const factory = this.resolver.resolveComponentFactory<any>(component);
        this.component = this.container.createComponent(factory);
        this.component.instance.controlIns = controlIns;
        this.component.instance.group = this.group;

        // add class bootstrap grid to element
        this.renderer.addClass(this.component.location.nativeElement, controlIns['grid']);
    }
}
