import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import {
    trigger,
    state,
    style,
    animate,
    transition,
    keyframes
} from '@angular/animations';

import { AboutContentModel } from './AboutContent.model';


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

    content = new AboutContentModel().chapters;

    constructor(private titleService: Title,
                private route: ActivatedRoute) {
    }

    ngOnInit() {
        this.route.data
            .subscribe((data) => {
                this.titleService.setTitle(data.title);
            });
    }
}
