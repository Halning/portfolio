import { Component, Input, OnInit } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';

import { FormBaseType } from '../component-models/form-base.type';

import { BoFormGroup } from '../component-models/';

@Component({
    selector: 'bo-form-dynamic',
    templateUrl: './form-dynamic.component.html',
    styles: [`:host-context(bo-form-group) {
        height: 100%
    }`],
    animations: [
        trigger('flyInOut', [
            state('in', style({transform: 'translateY(0)', opacity: 1})),
            transition(':enter', [
                style({transform: 'translateX(-200%)', opacity: 0}),
                animate('0.15s 0.1s ease-in-out')
            ]),
            // transition(':leave', [
            //     style({height: '0'}),
            //     animate('0.05s ease',
            //         style({transform: 'translateY(100%)', opacity: 0}))
            // ])
        ])
    ]
})
export class FormDynamicComponent implements OnInit {
    @Input() controlsArray: Array<FormBaseType>;
    @Input() form: BoFormGroup;

    constructor() {
    }

    ngOnInit() {
    }
}
