import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { BoFormRadio, BoFormGroup } from '../../component-models/';

export const VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => FormRadioComponent),
    multi: true,
};

@Component({
    selector: 'bo-form-radio',
    templateUrl: './form-radio.component.html',
    styleUrls: ['./form-radio.component.scss'],
    providers: [VALUE_ACCESSOR]
})
export class FormRadioComponent implements ControlValueAccessor {
    @Input() controlIns: BoFormRadio;
    @Input() group: BoFormGroup;

    onChange;
    onTouched;

    constructor() {
    }

    writeValue(value: string): void {
    }

    registerOnChange(fn: any): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }
}
