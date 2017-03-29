import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
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
/*    animations: [
        trigger('heroState', [
            state('inactive', style({
                backgroundColor: '#eee',
                transform: 'scale(1)'
            })),
            state('active',   style({
                backgroundColor: '#cfd8dc',
                transform: 'scale(1.1)'
            })),
            transition(':enter', animate('100ms ease-in')),
            transition('* => in', animate('100ms ease-out'))
        ])
    ]*/
    animations: [
        trigger('aboutState', [
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

export class AboutMeComponent implements OnInit {
    links = {
        codeAcademy: 'https://www.codecademy.com/',
        gitHub: 'https://github.com/Halning/brovary',
        makeWear: 'http://makewear.club/',
        cs50: 'https://cs50.harvard.edu/'
    };

    hero = 'inactive';

    constructor() {
    }

    ngOnInit() {
        setTimeout(() => {
            this.hero = 'active';
        }, 3000);
/*        const spanWidth = 10; // $('#text span').width();
        console.log(this.text);
        this.text.animate( { width: spanWidth }, 3000 );*/
    }
}
