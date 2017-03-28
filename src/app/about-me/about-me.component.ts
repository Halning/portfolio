import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';


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
/*        const spanWidth = 10; // $('#text span').width();
        console.log(this.text);
        this.text.animate( { width: spanWidth }, 3000 );*/
    }
}
