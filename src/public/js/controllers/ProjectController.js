/**
 * Created by halning on 29.08.16.
 */
"use strict";
app.controller('ProjectController', ['$scope', function($scope) {
    $scope.viewClass = 'animate-projects';
    $scope.projects = [
        $scope.firstRow = [
            {
                href: 'http://makewear.club',
                src: '../public/img/mw1.png',
                desc: 'Интернет магазин одежды для оптовых и розничных покупателей.' +
                'Время работы над проектом 9 месяцев. Выполнял разнообразные задачи от верстки до разработки парсера на PHP.'+
                'Приобрел опыт в верстке, jQuery, Bootstrap, PHP, MySQL, Gulp, Git и др.'
            },
            {
                href: '#',
                src: '../public/img/empty.png',
                desc: 'Coming soon'
            }
        ],
        $scope.secondRow = [
            {
                href: '#',
                src: '../public/img/empty.png',
                desc: 'Coming soon'
            },
            {
                href: '#',
                src: '../public/img/empty.png',
                desc: 'Coming soon'
            }
        ],
        $scope.treeRow = [
            {
                href: '#',
                src: '../public/img/empty.png',
                desc: 'Coming soon'
            },
            {
                href: '#',
                src: '../public/img/empty.png',
                desc: 'Coming soon'
            }
        ],
    ]
}]);