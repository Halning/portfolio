import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'ha-skills',
    templateUrl: './skills.component.html',
    styleUrls: ['./skills.component.scss']
})
export class SkillsComponent implements OnInit {
    animate = false;

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
        setTimeout(() => {
            this.animate = true;
        });
    }

}
