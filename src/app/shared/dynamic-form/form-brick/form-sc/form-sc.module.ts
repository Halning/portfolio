import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomMaterialModule } from '../../../custom-material.module';

import { FormErrorPipe } from '../../pipes/form-error.pipe';

import { FormScTitleComponent } from './sc-building-components/sc-option-elements/sc--title/sc--title.component';
import { FormScSubTitleComponent } from './sc-building-components/sc-option-elements/sc--subtitle/sc--subtitle.component';
import { FormScIconComponent } from './sc-building-components/sc-option-elements/sc--icon/sc--icon.component';
import { FormScMarkComponent } from './sc-building-components/sc-option-elements/sc--mark/sc--mark.component';
import { FormScStatsComponent } from './sc-building-components/sc-option-elements/sc--stats/sc--stats.component';

import { FormScComponent } from './form-sc-base/form-sc.component';
import { FormScSearchComponent } from './form-sc-base/form-sc-search/form-sc-search.component';
import { ScTempDefaultComponent } from './sc-building-components/sc-option-templates/sc-option-temp-default/sc-temp-default.component';
import { FormScOptionComponent } from './form-sc-base/form-sc-option/form-sc-option.component';
import { FormScWidgetComponent } from './form-sc-widget/form-sc-widget.component';

import { FormScService } from './form-sc.service';


const SC_MODULES = [
    CommonModule,
    CustomMaterialModule
];

const SC_COMPONENT = [
    FormScComponent,
    ScTempDefaultComponent,
    FormScOptionComponent,
    FormScSearchComponent,
    FormScWidgetComponent
];

const SC_ENTRY_COMPONENTS = [
    ScTempDefaultComponent,
    FormScSearchComponent
];

const SC_PIPES = [
    FormErrorPipe,
];

const BUILDING_ELEMENTS = [
    FormScIconComponent,
    FormScSubTitleComponent,
    FormScMarkComponent,
    FormScTitleComponent,
    FormScStatsComponent
];

const SE_PROVIDERS = [
    FormScService
];

@NgModule({
    imports: [
        SC_MODULES
    ],
    declarations: [
        SC_COMPONENT,
        SC_PIPES,
        BUILDING_ELEMENTS
    ],
    providers: [
        SE_PROVIDERS
    ],
    exports: [
        SC_COMPONENT,
        SC_PIPES
    ],
    entryComponents: [
        SC_ENTRY_COMPONENTS,
        BUILDING_ELEMENTS
    ]
})

export class FormScModule {
}
