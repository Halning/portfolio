/**
 * Created by halning on 29.08.16.
 */
app.controller('SkillsController', ['$scope', function($scope) {
    $scope.viewClass = 'animate-skills';
    $scope.frontEnd= [
        $scope.first = [
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
        $scope.second = [
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
    ]

    $scope.backEnd = [
        $scope.first = [
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
    ]

    $scope.other = [
        $scope.first = [
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
    ]
}]);