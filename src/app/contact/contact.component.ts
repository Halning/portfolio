import {Component, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {Http, Headers, RequestOptions} from '@angular/http';

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

    constructor(private titleService: Title,
                private http: Http) {
    }

    ngOnInit() {
        this.titleService.setTitle('Contact');
    }

    cancel(): void {
        this.mail.subject = '';
        this.mail.message = '';
    }

    onSubmit(): void {
        const mail = `subject=${this.mail.subject}&message=${this.mail.message}`;

        const headers = new Headers({ 'Content-Type': 'application/X-www-form-urlencoded' });
        const options = new RequestOptions({ headers: headers });

        this.http.post('https://us-central1-portfolio-2a12b.cloudfunctions.net/sendMeMail', mail, options).subscribe((data) => {
            console.log(data);
        });
        this.submitted = true;
    }
}
