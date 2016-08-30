/**
 * Created by halning on 29.08.16.
 */
app.controller('SkillsController', ['$scope', function($scope) {
    $scope.viewClass = 'animate-skills';
    $scope.frontEnd= [
        $scope.first = [
            {
                name: 'HTML & CSS',
                src: '../public/img/html.png'
            },
            {
                name: 'SASS & LESS',
                src: '../public/img/sass-less.png'
            },
            {
                name: 'Bootstrap 3',
                src: '../public/img/bootstrap.png'
            },
            {
                name: 'JS',
                src: '../public/img/js.png'
            }

        ],
        $scope.second = [
            {
                name: 'jQuery',
                src: '../public/img/jquery.gif'
            },
            {
                name: 'AngularJS',
                src: '../public/img/ang.png'
            },
            {
                name: 'Gulp',
                src: '../public/img/gulp.png'
            },
            {
                name: 'jQuery-UI',
                src: '../public/img/jq-ui.png'
            }
        ],
    ]

    $scope.backEnd = [
        $scope.first = [
            {
                name: 'PHP + OOP',
                src: '../public/img/php.png'
            },
            {
                name: 'SQL',
                src: '../public/img/sql.png'
            },
            {
                name: 'MVC',
                src: '../public/img/mvc.png'
            },
            {
                name: 'Composer',
                src: '../public/img/composer.png'
            }
        ]
    ]

    $scope.other = [
        $scope.first = [
            {
                name: 'Git',
                src: '../public/img/git.png'
            },
            {
                name: 'Azure',
                src: '../public/img/azure.png'
            },
            {
                name: 'Cisco',
                src: '../public/img/cisco.png'
            },
            {
                name: 'English pre-intermediate',
                src: '../public/img/eng.png'
            }
        ]
    ]
}]);