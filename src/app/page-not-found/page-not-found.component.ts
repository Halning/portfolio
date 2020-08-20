import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';

import { WindowRefService } from '../@core/window-ref.service';

@Component({
  selector: 'ha-page-not-found',
  template: `
    <mat-card class="card" [ngStyle]="{ height: screenHeight }">
      <img src="../../assets/img/404.jpg" />
    </mat-card>
  `,
  styles: [
    `
      .card {
        display: flex;
        align-items: center;
        justify-content: space-around;
      }
    `
  ]
})
export class PageNotFoundComponent implements OnInit {
  screenHeight: string;

  constructor(private window: WindowRefService, private titleService: Title, private route: ActivatedRoute) {}

  ngOnInit() {
    this.initMainSize();

    this.route.data.subscribe(data => {
      this.titleService.setTitle(data.title);
    });
  }

  initMainSize(): void {
    this.screenHeight = `${this.window.nativeWindow.innerHeight + 2}px`;
  }
}
