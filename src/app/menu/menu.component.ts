import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

import { TranslateService } from '@ngx-translate/core';
import { WindowRefService } from '../core/window-ref.service';
import {LocalStorageService } from 'ng2-webstorage';

@Component({
    selector: 'ha-menu',
    templateUrl: 'menu.component.html',
    styleUrls: ['menu.component.scss']
})
export class MenuComponent implements OnInit {

    windowWidth: number;
    windowHeight: number;

    lastScrollTop = 0;
    menuTopStyle = '0px';

    toggleClassMenu = true;
    toggleClassMenuBW = true;
    toggleClassTransparent = true;

    showMenuMaterial = false;

    languages = [
        {code: 'en', label: 'En', active: true},
        {code: 'ua', label: 'Ua', active: false},
        {code: 'ru', label: 'Ru', active: false},
    ];
    currentLang = this.languages[0];

    mainMenu = [
        {link: '/home', label: 'Home'},
        {link: '/about', label: 'About'},
        {link: '/skills', label: 'Skills'},
        {link: '/projects', label: 'Projects'},
        {link: '/contacts', label: 'Contacts'}
    ];

    @HostListener('window:scroll', [])
    onWindowScroll() {
        const st = this.window.nativeDocument.scrollingElement.scrollTop;

        this.toggleInOutMenuClass(st);
        this.lastScrollTop = st;
        this.toggleWhiteBlackClass(st);
    }

    constructor(private window: WindowRefService,
                private location: Location, private router: Router,
                private translate: TranslateService,
                private localSt: LocalStorageService) {
        this.router.events.subscribe(() => {
            this.onWindowScroll();
        });
    }

    ngOnInit() {
        this.initMainSize();
        const curLang = this.localSt.retrieve('language');
        this.setLocale(curLang);
    }

    setLocale(code: string): void {
        this.currentLang.active = false;
        this.languages.forEach((lang) => {
            if (lang.code === code) {
                this.currentLang = lang;
                this.currentLang.active = true;
            }
        });
        this.translate.use(code);
        this.localSt.store('language', code);
    }

    initMainSize(): void {
        this.windowWidth = this.window.nativeWindow.innerWidth;
        this.windowHeight = this.window.nativeWindow.innerHeight;

        this.showMenuMaterial = this.windowWidth < 768;
    }

    private toggleInOutMenuClass(st: number): void {
        // up and down scroll for the header
        if (st > this.lastScrollTop) {
            if (st > 0 && this.toggleClassMenu) {
                this.toggleClassMenu = false;
                this.menuTopStyle = `0px`;

            }
        } else {
            this.toggleClassMenu = true;
            this.menuTopStyle = `${st - 5}px`;
        }
    }

    private toggleWhiteBlackClass(st: number): void {
        if (this.location.path().includes('home')) {
            if (!this.toggleClassMenuBW) {
                this.toggleClassMenuBW = true;
            }
        } else {
            this.toggleClassMenuBW = false;
        }

        this.toggleTranClass(st);
    }

    private toggleTranClass(st: number): void {
        if (this.toggleClassTransparent && st !== 0) {
            this.toggleClassTransparent = false;
        } else if (st === 0) {
            this.toggleClassTransparent = true;
        }
    }
}
