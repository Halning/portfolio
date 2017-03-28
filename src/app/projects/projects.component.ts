import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'ha-projects',
    templateUrl: './projects.component.html',
    styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {
    animate = false;

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
    ]

    constructor() {
    }

    ngOnInit() {
        setTimeout(() => {
            this.animate = true;
        });
    }

}
