import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import {
    trigger,
    state,
    style,
    animate,
    transition,
    keyframes
} from '@angular/animations';


@Component({
    selector: 'ha-about-me',
    templateUrl: 'about-me.component.html',
    styleUrls: ['about-me.component.scss'],
    animations: [
        trigger('aboutState', [
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
        trigger('print', [
            state('void', style({width: '0', transform: 'steps(100, end)'})),
            transition(':enter', [
                animate(2000, style({width: '100%', transform: 'steps(100, end)'}))
            ])
        ]),
        trigger('alive', [
            state('void', style({opacity: 0.9, transform: 'scale(0.8)'})),
            transition(':enter', [
                animate(1000, style({opacity: 1, transform: 'scale(1)'}))
            ])
        ])
    ]
})

export class AboutMeComponent implements OnInit {
    links = {
        codeAcademy: 'https://www.codecademy.com/',
        gitHub: 'https://github.com/Halning/brovary',
        makeWear: 'http://makewear.club/',
        cs50: 'https://cs50.harvard.edu/'
    };

    constructor(private titleService: Title) {
    }

    ngOnInit() {
        this.titleService.setTitle('About Me');
    }
}
