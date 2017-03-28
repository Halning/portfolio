import { Component, OnInit } from '@angular/core';


@Component({
    selector: 'ha-about-me',
    templateUrl: 'about-me.component.html',
    styleUrls: ['about-me.component.scss']
})

export class AboutMeComponent implements OnInit {
    links = {
        codeAcademy: 'https://www.codecademy.com/',
        gitHub: 'https://github.com/Halning/brovary',
        makeWear: 'http://makewear.club/',
        cs50: 'https://cs50.harvard.edu/'
    };

    constructor() {
    }

    ngOnInit() {
    }
}
