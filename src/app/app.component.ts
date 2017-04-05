import {Component, Inject, LOCALE_ID, OnInit, ViewEncapsulation} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';


@Component({
    selector: 'ha-app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {

    languages = [
        { code: 'en', label: 'English'},
        { code: 'ru', label: 'Русский'},
    ];

    showFooter = true;

    constructor(private router: Router,
                @Inject(LOCALE_ID) protected localeId: string) {
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

