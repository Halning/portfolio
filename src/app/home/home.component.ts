import { Component, OnInit } from '@angular/core';

import { WindowRefService } from '../core/window-ref.service';


@Component({
    selector: 'ha-home',
    templateUrl: 'home.component.html',
    styleUrls: ['home.component.scss']
})
export class HomeComponent implements OnInit {
    screenHeight: string;
    animate = false;

    constructor(private window: WindowRefService) {
    }

    ngOnInit() {
        this.screenHeight = `${this.window.nativeWindow.innerHeight}px`;
        setTimeout(() => {
            this.animate = true;
        });
    }
}
