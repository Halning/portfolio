import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { WindowRefService } from '../core/window-ref.service';

@Component({
    selector: 'ha-page-not-found',
    template: `<div class="not-page-image" [ngStyle]="{'height': screenHeight}"></div>`,
    styleUrls: ['./page-not-found.component.scss']
})
export class PageNotFoundComponent implements OnInit {
    screenHeight: string;

    constructor(private window: WindowRefService,
                private titleService: Title ) {
    }

    ngOnInit() {
        this.initMainSize();
        this.titleService.setTitle('Not Found');
    }
    initMainSize(): void {
        this.screenHeight = `${this.window.nativeWindow.innerHeight + 2}px`;
    }
}
