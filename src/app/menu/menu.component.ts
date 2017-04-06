import {Component, OnInit, HostListener} from '@angular/core';
import {Router} from '@angular/router';
import {Location} from '@angular/common';

import {TranslateService} from 'ng2-translate';
import {WindowRefService} from '../core/window-ref.service';

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

    revertColor: number;

    toggleClassMenu = true;
    toggleClassMenuBW = true;
    toggleClassTransparent = true;

    showMenuMaterial = false;

    languages = [
        {code: 'en', label: 'En', active: true},
        {code: 'ru', label: 'Ru', active: false},
        {code: 'ua', label: 'Ua', active: false},
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
                private translate: TranslateService) {
        this.router.events.subscribe(() => {
            this.onWindowScroll();
        });
    }

    ngOnInit() {
        this.initMainSize();
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
    }

    initMainSize(): void {
        this.windowWidth = this.window.nativeWindow.innerWidth;
        this.windowHeight = this.window.nativeWindow.innerHeight;

        this.showMenuMaterial = this.windowWidth < 700;
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

            if (this.windowWidth > 1200) {
                this.revertColor = this.windowHeight - 40;
            } else {
                this.revertColor = this.windowHeight / 3;
            }
            if (st > this.revertColor) {
                if (this.toggleClassMenuBW) {
                    this.toggleClassMenuBW = false;
                }

            } else {
                if (!this.toggleClassMenuBW) {
                    this.toggleClassMenuBW = true;
                }
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
