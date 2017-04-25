import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

import { WindowRefService } from '../core/window-ref.service';

import {
    trigger,
    state,
    style,
    animate,
    transition,
    keyframes
} from '@angular/animations';

import { TranslateService } from '@ngx-translate/core';
import { LocalStorageService } from 'ng2-webstorage';


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
            state('inactive', style({opacity: 0})),
            state('active', style({opacity: 1})),
            state('void', style({opacity: 0})),
            transition(':enter', [
                animate('0.8s 0.5s ease', style({opacity: 1}))
            ]),
            transition('inactive => active', [
                animate('0.8s ease')
            ])
        ]),
        trigger('homeMainTitle', [
            state('inactive', style({opacity: 0, transform: 'translate(0, -20px)'})),
            state('active', style({opacity: 1, transform: 'translate(0px, 0px)'})),
            state('void', style({opacity: 0, transform: 'translate(0px, -20px)'})),
            transition(':enter', [
                animate('1s 0.8s ease', style({
                    opacity: 1,
                    transform: 'translate(0px, 0px)'
                }))
            ]),
            transition('inactive => active', [
                animate('0.8s 0.5s ease')
            ])
        ]),
        trigger('homeTitle', [
            state('inactive', style({opacity: 0, transform: 'translate(0, 20px)'})),
            state('active', style({opacity: 1, transform: 'translate(0px, 0px)'})),
            state('void', style({opacity: 0, transform: 'translate(0, 20px)'})),
            transition(':enter', [
                animate('1s 1.2s ease', style({
                    opacity: 1,
                    transform: 'translate(0px, 0px)'
                }))
            ]),
            transition('inactive => active', [
                animate('0.8s 1s ease')
            ])
        ]),
    ]
})
export class HomeComponent implements OnInit {
    screenHeight: string;
    animate: string;

    constructor(private window: WindowRefService,
                private titleService: Title,
                private translate: TranslateService,
                private localSt: LocalStorageService,
                private meta: Meta) {
    }

    ngOnInit() {
        this.initMainSize();
        this.initMetaTags();
        const curLang = this.localSt.retrieve('language');
        this.setTranslateTitle(curLang);

        this.translate.onLangChange.subscribe((res) => {
            this.setTranslateTitle(res.lang);

            this.animate = 'inactive';
            setTimeout(() => {
                this.animate = 'active';
            });
        });
    }

    initMainSize(): void {
        this.screenHeight = `${this.window.nativeWindow.innerHeight}px`;
    }

    private setTranslateTitle(lang: string): void {
        this.translate.getTranslation(lang).subscribe(translate => {
            this.titleService.setTitle(translate.Titles.home);
        });
    }

    private initMetaTags(): void {
        this.meta.updateTag({name: 'description', content: 'Contacts: my contacts'});
    }
}
