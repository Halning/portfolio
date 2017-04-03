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

import { WindowRefService } from '../core/window-ref.service';


@Component({
    selector: 'ha-projects',
    templateUrl: './projects.component.html',
    styleUrls: ['./projects.component.scss'],
    animations: [
        trigger('projectsState', [
            transition(':enter', [
                animate(300, keyframes([
                    style({opacity: 0, transform: 'translateY(1000px)', offset: 0}),
                    style({opacity: 1, transform: 'translateY(0px)', offset: 1.0})
                ]))
            ]),
            transition(':leave', [
                animate(300, keyframes([
                    style({opacity: 1, transform: 'translateY(0px)', offset: 0}),
                    style({opacity: 0, transform: 'translateY(1000px)', offset: 1.0})
                ]))
            ])
        ]),
        trigger('projectTop', [
            state('void', style({marginTop: '500px'})),
            transition('void => 0', [
                animate('0.3s ease', style({
                    marginTop: '30px'
                }))
            ]),
            transition('void => 1', [
                animate('0.3s 0.3s ease', style({
                    marginTop: '30px'
                }))
            ]),
            transition('void => 2', [
                animate('0.3s 0.6s ease', style({
                    marginTop: '30px'
                }))
            ])
        ]),
    ]
})
export class ProjectsComponent implements OnInit {

    projects = [
        [
            {
                href: 'http://makewear.club',
                src: '../../assets/img/mw1.png',
                desc: 'Интернет магазин одежды для оптовых и розничных покупателей.' +
                'Время работы над проектом 9 месяцев. Выполнял разнообразные задачи от верстки до разработки парсера на PHP.' +
                'Приобрел опыт в верстке, jQuery, Bootstrap, PHP, MySQL, Gulp, Git и др.'
            },
            {
                href: 'https://equerest.com/',
                src: '../../assets/img/equerest.jpg',
                desc: 'Coming soon'
            }
        ],
        [
            {
                href: '#',
                src: '../../assets/img/empty.png',
                desc: 'Coming soon'
            },
            {
                href: '#',
                src: '../../assets/img/empty.png',
                desc: 'Coming soon'
            }
        ],
        [
            {
                href: '#',
                src: '../../assets/img/empty.png',
                desc: 'Coming soon'
            },
            {
                href: '#',
                src: '../../assets/img/empty.png',
                desc: 'Coming soon'
            }
        ],
    ];

    constructor(private titleService: Title,
                private window: WindowRefService) {
    }

    ngOnInit() {
        this.titleService.setTitle('Projects');
    }

    goToProject(url: string): void {
        this.window.nativeWindow.location.href = url;
    }
}
