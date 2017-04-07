import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import {
    trigger,
    state,
    style,
    animate,
    transition,
    keyframes
} from '@angular/animations';

@Component({
    selector: 'ha-skills',
    templateUrl: './skills.component.html',
    styleUrls: ['./skills.component.scss'],
    animations: [
        trigger('skillsState', [
            transition(':enter', [
                animate(300, keyframes([
                    style({opacity: 0, transform: 'skewY(-15deg)', offset: 0}),
                    style({opacity: 1, transform: 'skewY(0deg)',     offset: 1.0})
                ]))
            ]),
            transition(':leave', [
                animate(300, keyframes([
                    style({opacity: 1, transform: 'skewY(0deg)',     offset: 0}),
                    style({opacity: 0, transform: 'skewY(-15deg)',  offset: 1.0})
                ]))
            ])
        ]),
        trigger('skillsIcon', [
            state('void', style({transform: 'translate(30px, 0)'})),
            transition(':enter', [
                animate('0.5s ease', style({
                    transform: 'translate(0px, 0px)'
                }))
            ])
        ]),
        trigger('skillsTitle', [
            state('void', style({opacity: 0, transform: 'translate(0, 20px)'})),
            transition(':enter', [
                animate('0.5s ease', style({
                    opacity: 1,
                    transform: 'translate(0px, 0px)'
                }))
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
            },
            {
                name: 'Bulma',
                icon: 'bulma'
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
                name: 'NodeJs',
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
            },
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

    constructor(private titleService: Title) {
    }

    ngOnInit() {
        this.titleService.setTitle('Skills');
    }

}
