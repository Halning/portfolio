import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

import {
    trigger,
    state,
    style,
    animate,
    transition
} from '@angular/animations';

import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { LocalStorageService } from 'ngx-webstorage';

import { ApiRequestService } from '../core/request/api-request.service';

@Component({
    selector: 'ha-contact',
    templateUrl: './contact.component.html',
    styleUrls: ['./contact.component.scss'],
    animations: [
        trigger('contactBlockList', [
            state('void', style({opacity: 0, transform: 'rotate(-90deg)'})),
            transition(':enter', [
                animate('.3s ease', style({
                    opacity: 1,
                    transform: 'rotate(0)'
                }))
            ])
        ]),
        trigger('mailBlock', [
            state('void', style({opacity: 0, transform: 'rotate(90deg)'})),
            transition(':enter', [
                animate('.3s ease', style({
                    opacity: 1,
                    transform: 'rotate(0)'
                }))
            ])
        ]),
        trigger('print', [
            state('void', style({width: '0', transform: 'steps(100, end)'})),
            transition(':enter', [
                animate(2000, style({width: '100%', transform: 'steps(100, end)'}))
            ])
        ])
    ]
})

export class ContactComponent implements OnInit {

    mail = {
        subject: '',
        message: ''
    };

    submitted = false;
    showLoader = false;
    submitColor = '';

    showError = false;

    contacts = [
        {
            name: 'Mobile',
            value: '+38(063)608-76-89',
            icon: 'phone_android'
        },
        {
            name: 'Email',
            value: 'Halningus@gmail.com',
            icon: 'contact_mail'
        },
        {
            name: 'Skype',
            value: 'live:halningus',
            icon: 'contacts'
        },
        {
            name: 'Telegram',
            value: '@halning',
            icon: 'contacts'
        }
    ];

    socials = [
        {
            name: 'LinkedIn',
            link: 'https://www.linkedin.com/in/andrii-khomenko/',
            icon: 'group'
        },
        {
            name: 'GitHub',
            link: 'https://github.com/Halning',
            icon: 'contacts'
        },
        {
            name: 'Facebook',
            link: 'https://www.facebook.com/profile.php?id=100005548219474',
            icon: 'tag_faces'
        }
    ];

    constructor(private titleService: Title,
                private apiHttp: ApiRequestService,
                private translate: TranslateService,
                private localSt: LocalStorageService,
                private meta: Meta) {

    }

    ngOnInit() {
        this.initMetaTags();

        const curLang = this.localSt.retrieve('language');
        this.setTranslateTitle(curLang);

        this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
            this.setTranslateTitle(event.lang);
        });
    }

    cancel(): void {
        this.mail.subject = '';
        this.mail.message = '';
    }

    onSubmit(): void {
        this.showLoader = true;
        this.apiHttp.request(`/sendMeMail`, {
            method: 'POST',
            body: this.mail
        }).subscribe(() => {
            this.submitted = true;
            this.submitColor = 'rgba(0, 153, 0, .2)';
            this.showLoader = false;
        }, () => {
            this.showLoader = false;
            this.submitColor = 'rgba(255, 0, 0, .1)';
            this.showError = true;
        });
    }

    private setTranslateTitle(lang: string): void {
        this.translate.getTranslation(lang).subscribe(translate => {
            this.titleService.setTitle(translate.Titles.contacts);
        });
    }

    private initMetaTags(): void {
        this.meta.updateTag({name: 'description',
            content: 'Projects: Halning projects I worked with and work with'});
    }
}
