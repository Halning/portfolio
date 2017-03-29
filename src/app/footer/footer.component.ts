import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'ha-footer',
    template: `
        <div class="footer container">
            2017 © Kyiv
        </div>`,
    styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

    constructor() {
    }

    ngOnInit() {
    }

}
