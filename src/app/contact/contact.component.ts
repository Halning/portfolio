import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

import {
    trigger,
    state,
    style,
    animate,
    transition
} from '@angular/animations';

import { HaApiRequest } from '../core/request/HaApiRequest';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';

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
        message: ``
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
            value: 'Halningus',
            icon: 'contacts'
        }
    ];

    socials = [
        {
            name: 'LinkedIn',
            link: 'https://www.linkedin.com/in/andreii-khomenko-552821141/',
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
        }/*,
        {
            name: 'VK',
            link: 'https://vk.com/halning',
            icon: 'contacts'
        }*/
    ];

    constructor(private titleService: Title,
                private apiHttp: HaApiRequest,
                private translate: TranslateService) {
        this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
            this.setDefaultMailMassage(event.lang);
        });
    }

    ngOnInit() {
        this.titleService.setTitle('Contact');
        this.setDefaultMailMassage(this.translate.currentLang);
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

    private setDefaultMailMassage(lang: string): void {
        if (!this.mail.message || this.mail.message === 'Hello, Andrei!'
            || this.mail.message === 'Здравствуйте, Андрей!'
            || this.mail.message === 'Привет, Андрей!') {
            switch (lang) {
                case 'en':
                    this.mail.message = 'Hello, Andrei!';
                    break;
                case 'ru':
                    this.mail.message = 'Здравствуйте, Андрей!';
                    break;
                case 'ua':
                    this.mail.message = 'Привет, Андрей!';
                    break;
                default:
                    this.mail.message = 'Hello, Andrei!';
            }
        }
    }
}
