/**
 * Created by halning on 23.08.16.
 */
app.directive('readMore', function () {
    return {
        restrict: 'E',
        scope: {},
        templateUrl: 'public/js/directives/readMore.html',
        link: function (scope) {
            scope.read = function () {
                destination = $('.start_reading').offset().top;
                $('.main').animate({scrollTop: destination}, 500);
            }
        }
    };
});

