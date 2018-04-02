import { Component, OnInit } from '@angular/core';

import { FormApiRequestService } from '../shared/dynamic-form/services/form-api-request.service';


@Component({
    selector   : 'bo-form-examples',
    templateUrl: './form-examples.component.html',
    styleUrls  : ['form-examples.component.scss']
})

export class FormExamplesComponent implements OnInit {
    productExForm: any;
    crForm: any;
    deliveryTermForm: any;

    configExForm: any;
    configDForm: any;


    constructor(private fars: FormApiRequestService) {
    }

    ngOnInit() {
        this.fars.getFormDataFromDb(`api/formExPr`)
        .subscribe(data => {
            this.productExForm = data[0];
            this.configExForm = Object.assign(this.productExForm);
        });

        this.fars.getFormDataFromDb(`api/crForm`)
        .subscribe(data => {
            this.crForm = data[0];
            this.configDForm = Object.assign(this.crForm);
        });

        this.fars.getFormDataFromDb(`api/deliveryTermsform`)
        .subscribe(data => {
            this.deliveryTermForm = data;
        });
    }
}
