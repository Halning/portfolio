/**
 * Created by halning on 02.09.16.
 */
app.controller('CounterController', function($scope, $timeout) {
    var timer = null;
    $scope.counter = 0;
    $scope.toggle = 0;
    $scope.textArr = ['Start', 'Stop', 'Split'];
    $scope.buttonText = $scope.textArr[0];

    var updateCounter = function() {
        $scope.counter++;
        $scope.toggle = 1;
        $scope.buttonText = $scope.textArr[1];
        timer = $timeout(updateCounter, 100);
    };

    $scope.toggleCounter = function(ggg) {
        if (ggg) {
            $timeout.cancel(timer);
            timer = null;
            $scope.toggle = 0;
            $scope.buttonText = $scope.textArr[0];
            return;
        }
        if (timer === null) {
            console.log(ggg);
            updateCounter();
        }
    };

    $scope.getSplit = function() {
        console.log(1);
    }
});