import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { TranslateService } from 'ng2-translate';


@Component({
    selector: 'ha-app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {

    showFooter = true;

    constructor(private router: Router,
                private af: AngularFire,
                private translate: TranslateService) {
        // this.items = af.database.list('/item');
        // this language will be used as a fallback when a translation isn't found in the current language
        this.translate.setDefaultLang('en');

        // the lang to use, if the lang isn't available, it will use the current loader to get them
        this.translate.use('en');
    }

    ngOnInit() {
        this.router.events
            .subscribe(event => {
                if (event instanceof NavigationEnd) {
                    if (event.url === '/home') {
                        this.showFooter = false;
                    } else {
                        this.showFooter = true;
                    }
                }
            });
    }
}

