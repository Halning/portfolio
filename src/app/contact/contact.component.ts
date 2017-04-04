import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
    selector: 'ha-contact',
    templateUrl: './contact.component.html',
    styleUrls: ['./contact.component.scss']
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
