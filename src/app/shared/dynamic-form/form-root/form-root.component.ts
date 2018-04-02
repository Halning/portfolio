import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { RegisterComponent } from '../../components-list-map.meta';

import { BoFormRoot } from '../component-models/';



import { DynamicFormBuilderService } from '../services/dynamic-form-builder.service';
import { BehsResolverService } from '../services/behs-resolver.service';
import { FormApiRequestService } from '../services/form-api-request.service';

import { environment } from '../../../../environments/environment';


@Component({
    selector: 'bo-form-root',
    templateUrl: './form-root.component.html',
    styleUrls: ['./form-root.component.scss']
})

@RegisterComponent('form-root')

export class FormRootComponent implements OnInit {
    @Input() reactiveForm: BoFormRoot;
    @Output() close = new EventEmitter<boolean>();

    data: object;

    env = environment;

    set rForm(value) {
        if (this.data) {
            this.reactiveForm = this.dfb.createForm(JSON.parse(JSON.stringify(this.data)));
        } else {
            this.reactiveForm = this.dfb.createForm(value);
        }
    }

    constructor(private dfb: DynamicFormBuilderService,
                private bdo: BehsResolverService,
                private far: FormApiRequestService) {
    }

    ngOnInit() {
        this.rForm = this.reactiveForm;
        console.log(this.reactiveForm);

        const subVC = this.reactiveForm.valueChanges
            .subscribe(() => {
                // show form and hide loader when ViewInit and all behavior services worked depend formValue
                this.reactiveForm.loading = false;
                subVC.unsubscribe();
            });

        this.bdo.initBehaviors(this.reactiveForm);

        // setValue of form which we saved.
        // This is necessary for all the behavior services to work when the form is created
        this.reactiveForm.setValue(this.reactiveForm.formDefaultValue);
    }

    // main btns of form

    onClose(): void {
        this.close.emit(false);
    }

    revert(): void {
        this.reactiveForm.reset(this.reactiveForm.formDefaultValue);
    }

    onSubmit(): void {
        // console.log(this.reactiveForm.value);
        this.far.submitReactiveForm<void>(this.reactiveForm)
            .subscribe(() => {
                this.close.emit(true);
            }, error => {
                this.reactiveForm.responseError = error;
            });
    }

    // error

    deleteFormError(): void {
        this.reactiveForm.responseError = null;
    }
}
