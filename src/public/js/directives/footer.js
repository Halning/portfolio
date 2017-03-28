/**
 * Created by halning on 25.08.16.
 */
app.directive('myFooter', function () {
    return {
        restrict: 'E',
        scope: {},
        templateUrl: 'public/js/directives/footer.html',
        link: function (scope) {
        }
    };
});