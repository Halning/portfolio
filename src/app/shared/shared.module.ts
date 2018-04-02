import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import {
//     MatCardModule, MatMenuModule, MatProgressSpinnerModule, MatInputModule, MatIconModule,
//     MatButtonModule, MatListModule
// } from '@angular/material';

import { HaLoaderComponent } from './ha-loader/ha-loader.component';
import { HaLoaderService } from './ha-loader/ha-loader.service';
import { DynamicFormModule } from './dynamic-form/dynamic-form.module';
import { CustomMaterialModule } from './custom-material.module';

const SE_MODULES_RE_EXPORT = [
    CommonModule,
    CustomMaterialModule,
    DynamicFormModule
];

@NgModule({
    imports: [
        SE_MODULES_RE_EXPORT
    ],
    declarations: [HaLoaderComponent],
    providers: [HaLoaderService],
    exports: [SE_MODULES_RE_EXPORT, HaLoaderComponent]
})
export class SharedModule {
}
