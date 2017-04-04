import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';


@Component({
    selector: 'ha-app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {

    showFooter = true;

    constructor(private router: Router) {
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

