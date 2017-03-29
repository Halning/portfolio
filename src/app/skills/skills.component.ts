import { Component, OnInit } from '@angular/core';
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
            state('out', style({transform: 'skewY(-15deg)'})),
            transition('void => *', [
                animate(300, keyframes([
                    style({opacity: 0, transform: 'skewY(-15deg)', offset: 0}),
                    style({opacity: 1, transform: 'skewY(0deg)',     offset: 1.0})
                ]))
            ]),
            transition('* => void', [
                animate(300, keyframes([
                    style({opacity: 1, transform: 'skewY(0deg)',     offset: 0}),
                    style({opacity: 0, transform: 'skewY(-15deg)',  offset: 1.0})
                ]))
            ])
        ]),
        trigger('skillsIcon', [
            state('void', style({transform: 'translate(30px, 0)'})),
            transition('void => *', [
                animate('0.5s ease', style({
                    transform: 'translate(0px, 0px)'
                }))
            ])
        ]),
        trigger('skillsTitle', [
            state('void', style({opacity: 0, transform: 'translate(0, 20px)'})),
            transition('void => *', [
                animate('0.5s ease', style({
                    opacity: 1,
                    backgroundColor: 'rgba(999, 999, 999, 0.2)',
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
                name: 'HTML & CSS',
                icon: 'html'
            },
            {
                name: 'SASS & LESS',
                icon: 'less'
            },
            {
                name: 'Bootstrap 3',
                icon: 'boot'
            },
            {
                name: 'JS',
                icon: 'js'
            }

        ],
        [
            {
                name: 'jQuery',
                icon: 'jquery'
            },
            {
                name: 'AngularJS',
                icon: 'ang'
            },
            {
                name: 'Gulp',
                icon: 'gulp'
            },
            {
                name: 'jQuery-UI',
                icon: 'jq-ui'
            }
        ],
    ];

    backEnd = [
        [
            {
                name: 'PHP + OOP',
                icon: 'php'
            },
            {
                name: 'SQL',
                icon: 'sql'
            },
            {
                name: 'MVC',
                icon: 'mvc'
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
                name: 'Git',
                icon: 'git'
            },
            {
                name: 'Azure',
                icon: 'azure'
            },
            {
                name: 'Cisco',
                icon: 'cisco'
            },
            {
                name: 'English pre-intermediate',
                icon: 'english'
            }
        ]
    ];

    constructor() {
    }

    ngOnInit() {
    }

}
