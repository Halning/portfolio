import {Component, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';

import {
    trigger,
    state,
    style,
    animate,
    transition,
    keyframes
} from '@angular/animations';

@Component({
    selector: 'ha-contact',
    templateUrl: './contact.component.html',
    styleUrls: ['./contact.component.scss'],
    animations: [
        trigger('contactsState', [
            transition(':enter', [
                animate(300, keyframes([
                    style({opacity: 0, transform: 'rotate(90deg)', offset: 0}),
                    style({opacity: 1, transform: 'rotate(0)', offset: 1.0})
                ]))
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
            link: '#',
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
        },
        {
            name: 'VK',
            link: 'https://vk.com/halning',
            icon: 'contacts'
        }
    ];

    constructor(private titleService: Title) {
    }

    ngOnInit() {
        this.titleService.setTitle('Contact');
    }

    cancel(): void {
        this.mail.subject = '';
        this.mail.message = '';
    }

    onSubmit(): void {
        console.log(this.mail);
        this.submitted = true;
    }

}
