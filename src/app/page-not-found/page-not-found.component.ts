import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { WindowRefService } from '../core/window-ref.service';

@Component({
    selector: 'ha-page-not-found',
    template: `
        <md-card class="card" [ngStyle]="{'height': screenHeight}">
            <img src="../../assets/img/404.jpg">
        </md-card>`,
    styles: [`.card {
        display: flex;
        align-items: center;
        justify-content: space-around;
    }`]
})
export class PageNotFoundComponent implements OnInit {
    screenHeight: string;

    constructor(private window: WindowRefService,
                private titleService: Title) {
    }

    ngOnInit() {
        this.initMainSize();
        this.titleService.setTitle('Not Found');
    }

    initMainSize(): void {
        this.screenHeight = `${this.window.nativeWindow.innerHeight + 2}px`;
    }
}
