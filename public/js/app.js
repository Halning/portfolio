/**
 * Created by halning on 23.08.16.
 */
var app = angular.module('GalleryApp', ['ngRoute', 'ngAnimate']);

app.config(function ($routeProvider) {
    $routeProvider
        .when('/', {
            controller: 'HomeController',
            templateUrl: 'templates/main.html'
        })
        .when('/skills', {
            controller: 'SkillsController',
            templateUrl: 'templates/skills.html'
        })
        .when('/projects', {
            controller: 'ProjectController',
            templateUrl: 'templates/projects.html'
        })
        .when('/timer', {
            controller: 'TimerController',
            templateUrl: 'templates/timer.html'
        })
        .when('/contact', {
            //controller: 'MainController',
            templateUrl: 'templates/contact.html'
        })
        .otherwise({
            redirectTo: '/'
        });
});