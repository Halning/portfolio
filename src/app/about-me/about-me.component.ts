import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import {
    trigger,
    state,
    style,
    animate,
    transition,
    keyframes
} from '@angular/animations';

import { TranslateService } from '@ngx-translate/core';

import { AboutContentModel } from './AboutContent.model';
import { LocalStorageService } from 'ngx-webstorage';


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
            state('inactive', style({width: '0', transform: 'steps(100, end)'})),
            state('active', style({width: '100%', transform: 'steps(100, end)'})),
            state('void', style({width: '0', transform: 'steps(100, end)'})),
            transition(':enter', [
                animate(2000, style({width: '100%', transform: 'steps(100, end)'}))
            ]),
            transition('inactive => active', [
                animate(1000)
            ])
        ]),
        trigger('alive', [
            state('inactive', style({opacity: 0.9, transform: 'scale(0.8)'})),
            state('active', style({opacity: 1, transform: 'scale(1)'})),
            state('void', style({opacity: 0.9, transform: 'scale(0.8)'})),
            transition(':enter', [
                animate(800, style({opacity: 1, transform: 'scale(1)'}))
            ]),
            transition('inactive => active', [
                animate(300)
            ])
        ])
    ]
})

export class AboutMeComponent implements OnInit {

    content = new AboutContentModel().chapters;

    animate: string;

    constructor(private titleService: Title,
                private translate: TranslateService,
                private localSt: LocalStorageService,
                private meta: Meta) {
    }

    ngOnInit() {
        this.initMetaTags();

        const curLang = this.localSt.retrieve('language');
        this.setTranslateTitle(curLang);
        this.startAnimation();

        this.translate.onLangChange.subscribe((res) => {
            this.setTranslateTitle(res.lang);
            this.startAnimation();
        });

    }

    private startAnimation(): void {
        this.animate = 'inactive';

        setTimeout(() => {
            this.animate = 'active';
        })
    }

    private setTranslateTitle(lang: string): void {
        this.translate.getTranslation(lang).subscribe(translate => {
            this.titleService.setTitle(translate.Titles.about);
        });
    }

    private initMetaTags(): void {
        this.meta.updateTag({name: 'description',
            content: 'About myself: Halning experience information'});
    }
}
