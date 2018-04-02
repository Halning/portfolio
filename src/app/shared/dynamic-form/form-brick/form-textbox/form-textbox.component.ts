import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { BoFormGroup, BoFormTextbox } from '../../component-models/';

export const VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => FormTextboxComponent),
    multi: true,
};

@Component({
    selector: 'bo-form-textbox',
    templateUrl: './form-textbox.component.html',
    styleUrls: ['./form-textbox.component.scss'],
    providers: [VALUE_ACCESSOR]
})
export class FormTextboxComponent implements OnInit, ControlValueAccessor {
    @Input() controlIns: BoFormTextbox;
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
