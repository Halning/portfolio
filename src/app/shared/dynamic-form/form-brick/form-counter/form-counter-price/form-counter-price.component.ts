import { Component, forwardRef, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { FormCounterComponent } from '../form-counter.component';

export const VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => FormCounterPriceComponent),
    multi: true,
};

@Component({
    selector: 'bo-form-counter-price',
    templateUrl: './form-counter-price.component.html',
    styleUrls: ['../form-counter.component.scss', './form-counter-price.component.scss'],
    providers: [VALUE_ACCESSOR]
})
export class FormCounterPriceComponent extends FormCounterComponent implements OnInit, ControlValueAccessor {

    constructor() {
        super();
    }

    ngOnInit() {
        super.ngOnInit();
    }
}
