import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {
    trigger,
    state,
    style,
    animate,
    transition
} from '@angular/animations';


@Component({
    selector: 'ha-about-me',
    templateUrl: 'about-me.component.html',
    styleUrls: ['about-me.component.scss'],
    animations: [
        trigger('heroState', [
            state('inactive', style({
                backgroundColor: '#eee',
                transform: 'scale(1)'
            })),
            state('active',   style({
                backgroundColor: '#cfd8dc',
                transform: 'scale(1.1)'
            })),
            transition('inactive => active', animate('100ms ease-in')),
            transition('active => inactive', animate('100ms ease-out'))
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

    hero = false;

    constructor() {
    }

    ngOnInit() {
        setTimeout(() => {
            this.hero = false;
        }, 20);
        setTimeout(() => {
            this.hero = true;
        }, 3000);
/*        const spanWidth = 10; // $('#text span').width();
        console.log(this.text);
        this.text.animate( { width: spanWidth }, 3000 );*/
    }
}
