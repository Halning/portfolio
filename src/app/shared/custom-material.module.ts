import { NgModule } from '@angular/core';
import {
    MatButtonModule, MatCardModule,
    MatDialogModule, MatIconModule,
    MatInputModule, MatListModule, MatMenuModule,
    MatOptionModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatTooltipModule
} from '@angular/material';


const MAT_MODULES = [
    MatProgressSpinnerModule,
    MatCardModule,
    MatMenuModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatListModule,

    MatSelectModule,
    MatOptionModule,
    MatDialogModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatTooltipModule
];

@NgModule({
    imports: [
        MAT_MODULES
    ],
    exports: [
        MAT_MODULES
    ]
})

export class CustomMaterialModule {
}
