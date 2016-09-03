/**
 * Created by halning on 02.09.16.
 */
app.controller('TimerController', function ($scope, $timeout) {
    var timer = null;
    var $result = angular.element(document.querySelector("#result"));
    var $startStopButton = angular.element(document.querySelector(".row")).find('button').eq(0);

    $scope.counter = 0;
    $scope.stopStartMark = 0;
    $scope.buttonTextObj = {
        start: 'Start',
        stop: 'Stop',
        split: 'Split',
        reset: 'Reset'
    };
    $scope.buttonText = $scope.buttonTextObj.start;
    $scope.borderColor = {
        red: '#c9302c',
        blue: '#31b0d5'
    };

    var updateCounter = function () {
        $scope.counter++;
        timer = $timeout(updateCounter, 1);
    };

    var addElement = function (buttonTextObjIndex) {
        var newP = angular.element("<p>");
        var borderColor = (buttonTextObjIndex === 'Stop') ? $scope.borderColor.red : $scope.borderColor.blue;

        newP.css({
            textAlign: "left",
            padding: "3px",
            border: "1px solid" + borderColor,
            backgroundColor: "#fff",
            margin: "5px 0"
        });

        $result.append(newP);
        newP.text(buttonTextObjIndex + ' - ' + $scope.counter + ' ms');
    }

    var stopTimer = function() {
        $timeout.cancel(timer);
        timer = null;
        $startStopButton
            .removeClass('btn-danger')
            .addClass('btn-success');
        $scope.stopStartMark = 0;
        $scope.buttonText = $scope.buttonTextObj.start;
    }

    $scope.toggleCounter = function (stopStartMark) {
        if (stopStartMark) {
            stopTimer();
            addElement($scope.buttonTextObj.stop);
            return;
        }

        if (timer === null) {
            $startStopButton
                .removeClass('btn-success')
                .addClass('btn-danger');
            updateCounter();
            $scope.stopStartMark = 1;
            $scope.buttonText = $scope.buttonTextObj.stop;
        }
    };

    $scope.getSplit = function () {
        addElement($scope.buttonTextObj.split);
    }

    $scope.reset = function() {
        $scope.counter = 0;
        stopTimer();
        $result.find('p').remove();
    }
});