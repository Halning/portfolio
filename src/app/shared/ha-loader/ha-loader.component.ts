import { Component, OnInit } from '@angular/core';
import { HaLoaderService } from './ha-loader.service';

@Component({
    selector: 'ha-ha-loader',
    template: `
        <div class="loader-wrapper" *ngIf="isShowLoader">
            <md-spinner class="loader"></md-spinner>
        </div>`,
    styleUrls: ['./ha-loader.component.scss']
})
export class HaLoaderComponent implements OnInit {

    isShowLoader = false;

    constructor(private loader: HaLoaderService) {
    }

    ngOnInit(): void {
        this.loader.loaderEmitter.subscribe((res: boolean) => {
            this.isShowLoader = res;
        });
    }

}

