import { Component, OnInit } from '@angular/core';

import { WindowRefService } from '../core/window-ref.service';

import {
    trigger,
    state,
    style,
    animate,
    transition,
    keyframes
} from '@angular/animations';


@Component({
    selector: 'ha-home',
    templateUrl: 'home.component.html',
    styleUrls: ['home.component.scss'],
    animations: [
        trigger('homeState', [
            state('out', style({transform: 'scale(0.1, 0.1)'})),
            transition('void => *', [
                animate(300, keyframes([
                    style({opacity: 0, transform: 'scale(0.1, 0.1)', offset: 0}),
                    style({opacity: 1, transform: 'scale(1, 1)',     offset: 1.0})
                ]))
            ]),
            transition('* => void', [
                animate(300, keyframes([
                    style({opacity: 1, transform: 'scale(1, 1)',     offset: 0}),
                    style({opacity: 0, transform: 'scale(0.1, 0.1)',  offset: 1.0})
                ]))
            ])
        ])
    ]
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
