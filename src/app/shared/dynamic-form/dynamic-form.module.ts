import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
// import { DpDatePickerModule } from 'ng2-date-picker';

import { FormScModule } from './form-brick/form-sc/form-sc.module';
import { CustomMaterialModule } from '../custom-material.module';
import { BlockLoaderModule } from '../block-loader/block-loader.module';


import { DynamicFieldDirective } from './form-base/dinamic-base.directive';
import { BehEnableDirective } from './directives/beh-enable.directive';

import { FormRootComponent } from './form-root/form-root.component';
import { FormGroupComponent } from './form-group/form-group.component';
import { FormDynamicComponent } from './form-base/form-dynamic.component';
import { FormTextboxComponent } from './form-brick/form-textbox/form-textbox.component';
import { FormSelectComponent } from './form-brick/form-select/form-select.component';
import { FormSelectOptionsComponent } from './form-brick/form-select/form-select-option/form-select-options.component';
import { FormCounterComponent } from './form-brick/form-counter/form-counter.component';
import { FormRadioComponent } from './form-brick/form-radio/form-radio.component';
import { FormCheckboxComponent } from './form-brick/form-checkbox/form-checkbox.component';
import { FormCounterPriceComponent } from './form-brick/form-counter/form-counter-price/form-counter-price.component';
// import { FormDatePickerComponent } from './form-brick/form-date-picker/form-date-picker.component';
// import { FormDPDropdownComponent } from './form-brick/form-date-picker/form-dp-dropdown/form-dp-dropdown.component';

import { BehsResolverService } from './services/behs-resolver.service';
import { DynamicFormBuilderService } from './services/dynamic-form-builder.service';
import { FormApiRequestService } from './services/form-api-request.service';



@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        CustomMaterialModule,
        FormScModule,
        BlockLoaderModule,
        // DpDatePickerModule,
    ],
    exports: [
        FormRootComponent
    ],
    declarations: [
        DynamicFieldDirective,
        FormRootComponent,
        FormDynamicComponent,
        FormGroupComponent,
        BehEnableDirective,
        FormTextboxComponent,
        FormSelectComponent,
        FormSelectOptionsComponent,
        FormCounterComponent,
        FormRadioComponent,
        FormCheckboxComponent,
        FormCounterPriceComponent,
        // FormDatePickerComponent,
        // FormDPDropdownComponent
    ],
    entryComponents: [
        FormRootComponent,
        FormSelectOptionsComponent,
        // FormDPDropdownComponent
    ],
    providers: [
        BehsResolverService,
        DynamicFormBuilderService,
        FormApiRequestService
    ]
})

export class DynamicFormModule {
}
