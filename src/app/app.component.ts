import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Headers, Http } from '@angular/http';

import { AngularFire, FirebaseApp } from 'angularfire2';
import { TranslateService } from 'ng2-translate';
import { LocalStorageService } from 'ng2-webstorage';
import * as firebase from 'firebase';
import { HaApiRequest } from './core/request/HaApiRequest';


@Component({
    selector: 'ha-app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {

    showFooter = true;
    private _messaging: firebase.messaging.Messaging;

    constructor(private router: Router,
                private af: AngularFire,
                @Inject(FirebaseApp) private _firebaseApp: firebase.app.App,
                private translate: TranslateService,
                private localSt: LocalStorageService,
                private http: Http) {
        // this.items = af.database.list('/item');
        // this language will be used as a fallback when a translation isn't found in the current language
        this.translate.setDefaultLang('en');

        // the lang to use, if the lang isn't available, it will use the current loader to get them
        this.setLanguage();
    }

    ngOnInit() {
        this._messaging = firebase.messaging(this._firebaseApp);
        const key = `AAAAjMPPYEY:APA91bHslOS29Svccm8EoebI3doWghJsXpNlRy9K3tYcXpJccldsqN-mZpxzSInILi7fTf-dJjttEeBcNs3_1eysIk6GLrYOzyRoVSNE7C1q67m-wCVgrq_7zkQKPqu29n3hPilducR2`;


        const body = {
            notification: {
                'title': 'Portugal vs. Denmark',
                'body': '5 to 1',
                'icon': 'firebase-logo.png',
                'click_action': 'http://localhost:4300'
            },
            to: `B2Dy70S8OOT1OvtfuFgAJvn8bGj2`
        };

        const header = new Headers();

        header.append('Authorization', 'key=' + key);
        header.append('Content-Type', 'application/json');

        this._messaging.requestPermission()
            .then(() => {
                console.log(1);
                this.http.post(`https://fcm.googleapis.com/fcm/send`, JSON.stringify({
                    'notification': body.notification,
                    'to': body.to
                }), {
                    headers: header
                }).subscribe(res => {
                    console.log(res);
                }, error => {
                    console.log(error);
                });
            })
            .catch((error) => {
                console.log(10);
            });
        this.router.events
            .subscribe(event => {
                if (event instanceof NavigationEnd) {
                    this.showFooter = event.url !== '/home';
                }
            });
    }

    private setLanguage(): void {
        const curLang = this.localSt.retrieve('language');

        if (!curLang) {
            this.localSt.store('language', 'en');
        }
    }
}

