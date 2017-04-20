import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';

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
            transition(':enter', [
                animate(300, keyframes([
                    style({opacity: 0, transform: 'scale(0.1, 0.1)', offset: 0}),
                    style({opacity: 1, transform: 'scale(1, 1)', offset: 1.0})
                ]))
            ]),
            transition(':leave', [
                animate(300, keyframes([
                    style({opacity: 1, transform: 'scale(1, 1)', offset: 0}),
                    style({opacity: 0, transform: 'scale(0.1, 0.1)', offset: 1.0})
                ]))
            ])
        ]),
        trigger('homeHello', [
            state('void', style({opacity: 0})),
            transition(':enter', [
                animate('0.8s 0.5s ease', style({opacity: 1}))
            ])
        ]),
        trigger('homeMainTitle', [
            state('void', style({opacity: 0, transform: 'translate(0, -20px)'})),
            transition(':enter', [
                animate('1s 0.8s ease', style({
                    opacity: 1,
                    transform: 'translate(0px, 0px)'
                }))
            ])
        ]),
        trigger('homeTitle', [
            state('void', style({opacity: 0, transform: 'translate(0, 20px)'})),
            transition(':enter', [
                animate('1s 1.2s ease', style({
                    opacity: 1,
                    transform: 'translate(0px, 0px)'
                }))
            ])
        ]),
    ]
})
export class HomeComponent implements OnInit {
    screenHeight: string;

    constructor(private window: WindowRefService,
                private titleService: Title,
                private route: ActivatedRoute) {
    }

    ngOnInit() {
        this.initMainSize();

        this.route.data
            .subscribe((data) => {
                this.titleService.setTitle(data.title);
            });
    }

    initMainSize(): void {
        this.screenHeight = `${this.window.nativeWindow.innerHeight}px`;
    }
}
