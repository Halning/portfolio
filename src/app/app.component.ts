import { Component, HostListener, Inject, OnInit } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';
import { Location } from '@angular/common';

import { WindowRefService } from './core/window-ref.service';

@Component({
    selector: 'ha-app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    screenHeight: string;

    windowWidth: number;
    windowHeight: number;

    lastScrollTop = 0;
    scrollCounter = 0;

    revertColor: number;

    toggleClassMenu = true;
    toggleClassMenuBW = true;
    toggleClassTransporent = true;

    @HostListener('window:scroll', [])
    onWindowScroll() {
        const st = this.document.body.scrollTop;

        this.toggleInOutMenuClass(st);
        this.lastScrollTop = st;
        this.toggleWhiteBlackClass(st);
    }

    constructor(private window: WindowRefService,
                @Inject(DOCUMENT) private document: Document,
                private location: Location) {
    }

    ngOnInit() {
        this.initMainSize();
    }

    initMainSize(): void {
        this.windowWidth = this.window.nativeWindow.innerWidth;
        this.windowHeight = this.window.nativeWindow.innerHeight;

        this.screenHeight = `${this.windowHeight + 1}px`;
    }

    private toggleInOutMenuClass(st: number): void {
        // up and down scroll for the header
        if (st > this.lastScrollTop) {
            if (st > 0 && this.toggleClassMenu) {

                this.scrollCounter++;
                if (this.scrollCounter >= 1) {
                    this.toggleClassMenu = false;
                    this.scrollCounter = 0;
                }

            }
        } else {
            if (!this.toggleClassMenu) {
                this.scrollCounter++;
                if (this.scrollCounter >= 3) {
                    this.toggleClassMenu = true;
                    this.scrollCounter = 0;
                }
            }
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
                if (this.toggleClassTransporent) {
                    this.toggleClassTransporent = false;
                }
            } else {
                if (!this.toggleClassMenuBW) {
                    this.toggleClassMenuBW = true;
                }
            }
        }
    }
}

