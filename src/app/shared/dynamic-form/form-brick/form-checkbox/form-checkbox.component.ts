import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { BoFormGroup, BoFormCheckbox } from '../../component-models/';

export const VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => FormCheckboxComponent),
    multi: true,
};

@Component({
    selector: 'bo-form-checkbox',
    templateUrl: './form-checkbox.component.html',
    styleUrls: ['./form-checkbox.component.scss'],
    providers: [VALUE_ACCESSOR]
})
export class FormCheckboxComponent implements OnInit, ControlValueAccessor {
    @Input() controlIns: BoFormCheckbox;
    @Input() group: BoFormGroup;

    onChange;
    onTouched;

    constructor() {
    }

    ngOnInit() {
        // console.log(this.controlIns);
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
