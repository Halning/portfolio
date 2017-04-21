export class AboutContentModel {
    chapters = [
        {
            main: 'About.stage1.name',
            date: 'About.stage1.date',
            textMain: [
                ['About.stage1.textMain.0',
                    {
                        linkName: 'CodeCademy',
                        link: 'https://www.codecademy.com/'
                    },
                    'About.stage1.textMain.1'
                ]
            ],
        },
        {
            main: 'Первая работа',
            date: 'Август 2015 – Июнь 2016',
            textMain: [
                [
                    'Компания',
                    {
                        linkName: 'MakeWear',
                        link: 'http://makewear.club/'
                    },
                    '. Был взят в компанию для разработки парсера(скраппера) товаров из более 30 сайтов.' +
                    ' Скраппер реализовывался на PHP в ООП с использованием шаблонов проектирования.'
                ],
                [
                    `После успешно выполненной задачи занимался корзиной c нуля.
                     Использовал Bootstrap, LESS , Query, Query UI, Pjax,
                     Google API а так же AJAX и JSON для общения с сервером.
                     Серверная часть реализовывалась на PHP в связке с MySQL.В это же время познакомился с Gulp и начал его использовать.`
                ],
                [`В последние месяцы выполнял много задач по разработки Акции компании от верстки до серверной части.
                 А также в свободное время проходил курс CS50 - `,
                    {
                        linkName: 'CS50 Harvard ',
                        link: 'https://cs50.harvard.edu/'
                    },
                    '. В компании работал в scrum-команде. Есть небольшой опыт в DevOps и Azure.'
                ]
            ]
        },
        {
            main: 'Первая Frontend',
            date: 'Июль 2016 – Октябрь 2016',
            textMain: [
                ['Компания',
                    {
                        linkName: 'Equerest',
                        link: 'https://equerest.com/'
                    },
                    `. В компании работал именно Frontend-разработчиком.
                    Первая и основная моя задача верстка проекта под мобильные устройства и оптимизация, 
                    расширение функционала Angular, по большей части переход на Component-based app архитектуру.
                     В проекте работал с такими технологиями как Angular 1.5, Gulp, SASS, Bulma и Bootstrap 3 иногда jQuery.
                     Работа организована по scrum. Контроль версии Git.`
                ]
            ]
        },
        {
            main: 'В данный момент',
            date: 'Октябрь 2016 - сейчас',
            textMain: [
                ['Компания',
                    {
                        linkName: 'Cosmonova',
                        link: 'https://cosmonova.net/'
                    },
                    '. Должность Frontend-разработчик. Используемые технологии: ',
                    {
                        linkName: 'Angular',
                        link: 'https://angular.io/'
                    },
                    `, кроме основного ядра Angular Material, Angular Cli, Angular Animations, Webpack. 
                    Написания Unit тестов, а также тестов в контексте выполнения Angular, верстка. 
                    Работа  в scrum-команде, управление проектом через Jira. Разглашать больше информации не имею парво!)`
                ]
            ]
        },
    ];
}
