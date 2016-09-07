/**
 * Created by halning on 29.08.16.
 */
"use strict";
app.controller('HomeController', ['$scope', '$window', function($scope, $window) {
    $scope.links = {
        codeAcademy: 'https://www.codecademy.com/',
        gitHub: 'https://github.com/Halning/brovary',
        makeWear: 'http://makewear.club/',
        cs50: 'https://cs50.harvard.edu/'
    };

    $scope.viewClass = 'animate-home';

}]);
