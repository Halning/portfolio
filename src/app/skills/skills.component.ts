import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { trigger, state, style, animate, transition, keyframes } from '@angular/animations';
import { TranslateService } from '@ngx-translate/core';
import { LocalStorageService } from 'ngx-webstorage';

@Component({
  selector: 'ha-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.scss'],
  animations: [
    trigger('skillsState', [
      transition(':enter', [
        animate(
          300,
          keyframes([
            style({ opacity: 0, transform: 'skewY(-15deg)', offset: 0 }),
            style({ opacity: 1, transform: 'skewY(0deg)', offset: 1.0 })
          ])
        )
      ]),
      transition(':leave', [
        animate(
          300,
          keyframes([
            style({ opacity: 1, transform: 'skewY(0deg)', offset: 0 }),
            style({ opacity: 0, transform: 'skewY(-15deg)', offset: 1.0 })
          ])
        )
      ])
    ]),
    trigger('skillsIcon', [
      state('void', style({ transform: 'translate(30px, 0)' })),
      transition(':enter', [
        animate(
          '0.5s ease',
          style({
            transform: 'translate(0px, 0px)'
          })
        )
      ])
    ]),
    trigger('skillsTitle', [
      state('void', style({ opacity: 0, transform: 'translate(0, 20px)' })),
      transition(':enter', [
        animate(
          '0.5s ease',
          style({
            opacity: 1,
            transform: 'translate(0px, 0px)'
          })
        )
      ])
    ])
  ]
})
export class SkillsComponent implements OnInit {
  frontEnd = [
    [
      {
        name: 'JS',
        icon: 'js'
      },
      {
        name: 'Angular',
        icon: 'ang2'
      },
      {
        name: 'AngularJS',
        icon: 'ang'
      },

      {
        name: 'jQuery',
        icon: 'jquery'
      }
    ],
    [
      {
        name: 'ES6',
        icon: 'es6'
      },
      {
        name: 'HTML & CSS',
        icon: 'html'
      },
      {
        name: 'SASS & LESS',
        icon: 'less'
      },
      {
        name: 'Bootstrap 3, 4',
        icon: 'boot'
      }
    ],
    [
      {
        name: 'Webpack',
        icon: 'webpack'
      },
      {
        name: 'Gulp',
        icon: 'gulp'
      },
      {
        name: 'Jasmine',
        icon: 'jasmine'
      },
      {
        name: 'Npm',
        icon: 'npm'
      }
    ]
  ];

  backEnd = [
    [
      {
        name: 'PHP + OOP',
        icon: 'php'
      },
      {
        name: 'Basic NodeJs',
        icon: 'nodejs'
      },
      {
        name: 'SQL',
        icon: 'sql'
      },
      {
        name: 'Composer',
        icon: 'composer'
      }
    ]
  ];

  other = [
    [
      {
        name: 'PhpStorm',
        icon: 'phpstorm'
      },
      {
        name: 'NetBeans',
        icon: 'netbeans'
      },
      {
        name: 'Linux',
        icon: 'ubuntu'
      },
      {
        name: 'Git',
        icon: 'git'
      }
    ],
    [
      {
        name: 'Jira',
        icon: 'jira'
      },
      {
        name: 'Azure',
        icon: 'azure'
      },
      {
        name: 'Firebase',
        icon: 'firebase'
      },
      {
        name: 'English pre-intermediate',
        icon: 'english'
      }
    ]
  ];

  constructor(
    private titleService: Title,
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

  private setTranslateTitle(lang: string): void {
    this.translate.getTranslation(lang).subscribe(translate => {
      this.titleService.setTitle(translate.Titles.skills);
    });
  }

  private initMetaTags(): void {
    this.meta.updateTag({ name: 'description', content: 'Skills: My developer skills list' });
  }
}
