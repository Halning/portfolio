/**
 * Created by halning on 02.09.16.
 */
app.controller('TimerController', function ($scope, $timeout) {
    var timer = null;
    var beginDate = null;
    var stopDate = null;
    var startDate = null;
    var $result = angular.element(document.querySelector("#result"));
    var $startStopButton = angular.element(document.querySelector(".row")).find('button').eq(0);
    var $splitButton = angular.element(document.querySelector("#split-btn"));

    var split = {
        minutes: 0,
        seconds: 0,
        millisecond: 0
    };

    $scope.calculate = {
        minutes: 0,
        seconds: 0,
        millisecond: 0
    };

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
        $scope.calculate.millisecond = (stopDate === null) ? Date.now() - beginDate : Date.now() - ((startDate - stopDate) + beginDate);
        $scope.calculate.seconds = Math.floor(($scope.calculate.millisecond / 1000) % 60);
        $scope.calculate.minutes = Math.floor(($scope.calculate.millisecond / 1000 / 60) % 60);
        $scope.calculate.millisecond = $scope.calculate.millisecond - $scope.calculate.seconds * 1000;

        timer = $timeout(updateCounter, 1);
    };

    var addElement = function (buttonTextObjIndex, showDate) {
        var newP = angular.element("<p>");
        var borderColor = (buttonTextObjIndex === 'Stop') ? $scope.borderColor.red : $scope.borderColor.blue;

        newP.css({border: "1px solid" + borderColor});

        $result.append(newP);
        newP.text(buttonTextObjIndex + ' - ' + showDate.minutes + ' m : ' + showDate.seconds + ' s : ' + showDate.millisecond + ' ms');
    }

    var stopTimer = function () {
        $timeout.cancel(timer);
        timer = null;
        stopDate += Date.now() - beginDate;

        $startStopButton
            .removeClass('btn-danger')
            .addClass('btn-success');
        $scope.stopStartMark = 0;
        $scope.buttonText = $scope.buttonTextObj.start;
        $splitButton.attr('disabled', "disabled");
    }

    $scope.toggleCounter = function (stopStartMark) {
        if (stopStartMark) {
            stopTimer();
            addElement($scope.buttonTextObj.stop, $scope.calculate);
            return;
        }

        if (beginDate === null) {
            beginDate = Date.now();
        }

        if (timer === null) {
            startDate += Date.now() - beginDate;

            $startStopButton
                .removeClass('btn-success')
                .addClass('btn-danger');

            updateCounter();

            $scope.stopStartMark = 1;
            $scope.buttonText = $scope.buttonTextObj.stop;
            $splitButton.attr('disabled', "");
        }
    };

    $scope.getSplit = function () {
        split.minutes = $scope.calculate.minutes - split.minutes;
        split.seconds = $scope.calculate.seconds - split.seconds;
        split.millisecond = $scope.calculate.millisecond - split.millisecond;

        addElement($scope.buttonTextObj.split, split);

        split.minutes = $scope.calculate.minutes;
        split.seconds = $scope.calculate.seconds;
        split.millisecond = $scope.calculate.millisecond;
    }

    $scope.reset = function () {
        stopTimer();

        beginDate = null;
        startDate = null;
        stopDate = null;

        $scope.calculate.millisecond = 0;
        $scope.calculate.seconds = 0;
        $scope.calculate.minutes = 0;
        split.minutes = 0;
        split.seconds = 0;
        split.millisecond = 0;

        $result.find('p').remove();
    }
});