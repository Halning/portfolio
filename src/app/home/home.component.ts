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
            state('in', style({transform: 'scale(1, 1)'})),
            transition('void => *', [
                animate(300, keyframes([
                    style({opacity: 0, transform: 'scale(0.1, 0.1)', offset: 0}),
                    style({opacity: 1, transform: 'scale(1, 1)', offset: 1.0})
                ]))
            ]),
            transition('* => void', [
                animate(300, keyframes([
                    style({opacity: 1, transform: 'scale(1, 1)', offset: 0}),
                    style({opacity: 0, transform: 'scale(0.1, 0.1)', offset: 1.0})
                ]))
            ])
        ]),
        trigger('homeMainTitle', [
            state('in', style({opacity: 1})),
            state('void', style({opacity: 0})),
            transition('void => *', [
                animate('0.5s 1.5s ease')
            ])
        ]),
        trigger('homeTitle', [
            state('void', style({opacity: 0, transform: 'translate(0, 20px)'})),
            transition('void => *', [
                animate('1s 0.8s ease', style({
                    opacity: 1,
                    transform: 'translate(0px, 0px)'
                }))
            ])
        ]),
    ]
})
export class HomeComponent implements OnInit {
    screenHeight: string;

    constructor(private window: WindowRefService) {
    }

    ngOnInit() {
        this.initMainSize();
    }

    initMainSize(): void {
        this.screenHeight = `${this.window.nativeWindow.innerHeight}px`;
    }
}
