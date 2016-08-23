/**
 * Created by halning on 23.08.16.
 */
var app = angular.module('GalleryApp', ['ngRoute']);

app.config(function ($routeProvider) {
    $routeProvider
        .when('/', {
            controller: 'MainController',
            templateUrl: 'templates/main.html'
        })
        .when('/skils', {
            //controller: 'PhotoController',
            templateUrl: 'templates/skils.html'
        })
        .otherwise({
            redirectTo: '/'
        });
});