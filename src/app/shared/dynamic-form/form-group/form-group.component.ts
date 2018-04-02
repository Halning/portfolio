import { Component, Input, OnInit } from '@angular/core';

import { BoFormGroup } from '../component-models/';

@Component({
    selector: 'bo-form-group',
    templateUrl: './form-group.component.html',
    styleUrls: ['./form-group.component.scss']
})
export class FormGroupComponent implements OnInit {
    @Input() controlIns: BoFormGroup;
    @Input() group: BoFormGroup;

    constructor() {
    }

    ngOnInit() {
    }
}
