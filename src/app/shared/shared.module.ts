import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MdCardModule, MdMenuModule, MdProgressSpinnerModule, MdInputModule, MdIconModule,
  MdButtonModule, MdListModule
} from '@angular/material';

import { HaLoaderComponent } from './ha-loader/ha-loader.component';
import { HaLoaderService } from './ha-loader/ha-loader.service';

const SE_MODULES_RE_EXPORT = [
  CommonModule,
  MdProgressSpinnerModule,
  MdCardModule,
  MdMenuModule,
  MdInputModule,
  MdIconModule,
  MdButtonModule,
  MdListModule
];

@NgModule({
  imports: [
    SE_MODULES_RE_EXPORT
  ],
  declarations: [HaLoaderComponent],
  providers: [HaLoaderService],
  exports: [SE_MODULES_RE_EXPORT, HaLoaderComponent]
})
export class SharedModule { }
