/**
 * Created by halning on 29.08.16.
 */
app.controller('ProjectController', ['$scope', function($scope) {
    $scope.viewClass = 'animate-projects';
    $scope.projects = [
        $scope.firstRow = [
            {
                href: 'http://makewear.club',
                src: '../public/img/mw1.png',
                desc: 'Интернет магазин одежды для оптовых и розничных покупателей\<br\>' +
                'Время работы над проектом 9 месяцев. Выполнял разнообразные задачи от верстки до разработки парсера на PHP.'+
                'Приобрел опыт в верстке, jQury, Bootstrap, PHP, MySQL, Gulp, Git и др.'
            },
            {
                href: '#',
                src: 'http://placehold.it/585x316',
                desc: 'Coming soon'
            }
        ],
        $scope.secondRow = [
            {
                href: '#',
                src: 'http://placehold.it/585x316',
                desc: 'Coming soon'
            },
            {
                href: '#',
                src: 'http://placehold.it/585x316',
                desc: 'Coming soon'
            }
        ],
        $scope.treeRow = [
            {
                href: '#',
                src: 'http://placehold.it/585x316',
                desc: 'Coming soon'
            },
            {
                href: '#',
                src: 'http://placehold.it/585x316',
                desc: 'Coming soon'
            }
        ],
    ]
}]);