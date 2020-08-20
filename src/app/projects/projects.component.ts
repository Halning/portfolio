import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

import { trigger, state, style, animate, transition } from '@angular/animations';

import { WindowRefService } from '../@core/window-ref.service';
import { TranslateService } from '@ngx-translate/core';
import { LocalStorageService } from 'ngx-webstorage';

@Component({
  selector: 'ha-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
  animations: [
    trigger('projectTop', [
      state('void', style({ marginTop: '500px' })),
      transition('void => 0', [
        animate(
          '0.3s ease',
          style({
            marginTop: '30px'
          })
        )
      ]),
      transition('void => 1', [
        animate(
          '0.3s 300ms ease',
          style({
            marginTop: '30px'
          })
        )
      ]),
      transition('void => 2', [
        animate(
          '0.3s 600ms ease',
          style({
            marginTop: '30px'
          })
        )
      ])
    ])
  ]
})
export class ProjectsComponent implements OnInit {
  projects = [
    [
      {
        href: 'http://makewear.com.ua/',
        src: '../../assets/img/mw1.png',
        btn: `MakeWear`
      },
      {
        href: 'https://equerest.com/',
        src: '../../assets/img/equerest.jpg',
        btn: `equerest`
      }
    ],
    [
      {
        href: 'https://cosmonova.net',
        src: '../../assets/img/top-secret.jpg',
        btn: `Cosmonova`
      },
      {
        href: '#',
        src: '../../assets/img/empty.png',
        btn: 'Coming soon'
      }
    ],
    [
      {
        href: '#',
        src: '../../assets/img/empty.png',
        btn: 'Coming soon'
      },
      {
        href: '#',
        src: '../../assets/img/empty.png',
        btn: 'Coming soon'
      }
    ]
  ];

  constructor(
    private titleService: Title,
    private window: WindowRefService,
    private translate: TranslateService,
    private localSt: LocalStorageService,
    private meta: Meta
  ) {}

  ngOnInit() {
    this.initMetaTags();

    const curLang = this.localSt.retrieve('language');
    this.setTranslateTitle(curLang);

    this.translate.onLangChange.subscribe(res => {
      this.setTranslateTitle(res.lang);
    });
  }

  goToProject(url: string): void {
    this.window.nativeWindow.location.href = url;
  }

  private setTranslateTitle(lang: string): void {
    this.translate.getTranslation(lang).subscribe(translate => {
      this.titleService.setTitle(translate.Titles.projects);
    });
  }

  private initMetaTags(): void {
    this.meta.updateTag({ name: 'description', content: 'Projects: Halning projects I worked with and work with' });
  }
}
