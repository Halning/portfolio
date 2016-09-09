/**
 * Created by halning on 23.08.16.
 */
var app = angular.module('GalleryApp', ['ngRoute', 'ngAnimate']);

app.config(["$locationProvider", '$routeProvider', function ($locationProvider, $routeProvider) {
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

    $locationProvider.html5Mode(true);
}]);
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

/**
 * Created by halning on 23.08.16.
 */
"use strict";
app.controller('MainController', ['$scope', function ($scope) {
    $scope.initJquery = function () {
        var windowWidth = $(window).width();
        var windowHeight = $(window).height();
        var scrollCounter = 0;
        var $lastScrollTop = 0;
        var $isMobile = null;

        $isMobile = navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry)/);


        var $myelement = $('.main');

        document.addEventListener("scroll", myScroll, false);
        document.addEventListener("touchmove", myScroll, false);

        $myelement.scroll(function () {
            myScroll();
        });

        myMainResizes();
        setHeaders();
        windowResize();
        imageZesire();


        /**
         * resize main image depends window
         */
        function imageZesire() {
            if ($(".jumbotrom").length > 0) {
                $myelement.find(".jumbotrom").css({"height": windowHeight});
                fancyTitleIntro();
            }

            if ($(".skills").length > 0) {
                window.setTimeout(function () {
                    $myelement.addClass("init_2");
                }, 150);
            }

            if ($(".projects").length > 0) {
                window.setTimeout(function () {
                    $myelement.addClass("init_2");
                }, 150);
            }
        }

        /**
         * resize main height container foe scroll depend window
         */
        function myMainResizes() {
            //main resizes
            windowWidth = $(window).width();
            windowHeight = $(window).height();

            $myelement.css('height', windowHeight + 1);
        }

        /**
         * fancy title in main page
         */
        function fancyTitleIntro() {
            $myelement.find(".jumbotrom").addClass("init_1");
            window.setTimeout(function () {
                $myelement.find(".jumbotrom").addClass("init_2");
            }, 500);
        }

        /**
         * change header depend what background interactive
         */
        function myScroll() {
            var st = $myelement.scrollTop();

            //up and down scroll for the header
            if (st > $lastScrollTop) {
                // downscroll code
                if (st > 0) {
                    if ($('.header').hasClass('in')) {
                        scrollCounter++;
                        if (scrollCounter >= 1) {
                            $('.header').removeClass('in').addClass('out');
                            scrollCounter = 0;
                        }
                    }
                }

                if ($myelement.scrollTop() == $(document).height() - $(window).height()) {
                    $('.header').removeClass('out').addClass('in');
                }

            } else {
                if ($('.header').hasClass('out')) {
                    scrollCounter++;
                    if (scrollCounter >= 3) {
                        $('.header').removeClass('out').addClass('in');
                        scrollCounter = 0;
                    }
                }
            }
            $lastScrollTop = st;

            if (!~window.location.href.indexOf('skills')
                && !~window.location.href.indexOf('projects')
                && !~window.location.href.indexOf('contact')
            && !~window.location.href.indexOf('timer')) {
                console.log(window.location.href);
                if (windowWidth > 1200) {
                    var revertColor = windowHeight - 40;
                } else {
                    var revertColor = windowHeight / 3;
                }
                if ($myelement.scrollTop() > revertColor) {
                    if ($(".header").hasClass('white'))
                        $(".header").removeClass('white').addClass('black');
                    if ($(".header").hasClass('transparent'))
                        $(".header").removeClass('transparent');
                } else {
                    if ($myelement.find(".full-image").length > 0) {
                        if ($(".header").hasClass('black'))
                            $(".header").removeClass('black').addClass('white');
                    } else {
                        if ($(".header").hasClass('black'))
                            $(".header").addClass('transparent');
                    }
                }
            } else {
                revertColor = 60;
                if ($myelement.scrollTop() > revertColor) {
                    if ($(".header").hasClass('transparent'))
                        $(".header").removeClass('transparent');
                } else {
                    if ($(".header").hasClass('black'))
                        $(".header").addClass('transparent');
                }
            }
        }

        /**
         * set header class depend what is background
         */
        function setHeaders() {
            if ($myelement.find(".full-image").length > 0) {
                if ($(".header").hasClass('black'))
                    $(".header").removeClass('black').addClass('white');
            } else {
                if ($(".header").hasClass('white'))
                    $(".header").removeClass('white').addClass('black');
            }

            if ($(".header").hasClass('black'))
                $(".header").addClass('transparent');

            $('.header').removeClass('out').addClass('in');
            /*if( $isMobile != null ){
             $('body').addClass('mobile-no-hovers-dude');
             $('.header').removeClass('out').addClass('in');
             }*/
        }

        /**
         * resize all if window resize user
         */
        function windowResize() {
            $(window).resize(function () {
                if ($(window).width() != windowWidth || $(window).height != windowHeight) {
                    myMainResizes();
                    imageZesire();
                }
            });
        }
    };

}]);
/**
 * Created by halning on 29.08.16.
 */
"use strict";
app.controller('ProjectController', ['$scope', function($scope) {
    $scope.viewClass = 'animate-projects';
    $scope.projects = [
        $scope.firstRow = [
            {
                href: 'http://makewear.club',
                src: '../public/img/mw1.png',
                desc: 'Интернет магазин одежды для оптовых и розничных покупателей.' +
                'Время работы над проектом 9 месяцев. Выполнял разнообразные задачи от верстки до разработки парсера на PHP.'+
                'Приобрел опыт в верстке, jQuery, Bootstrap, PHP, MySQL, Gulp, Git и др.'
            },
            {
                href: '#',
                src: '../public/img/empty.png',
                desc: 'Coming soon'
            }
        ],
        $scope.secondRow = [
            {
                href: '#',
                src: '../public/img/empty.png',
                desc: 'Coming soon'
            },
            {
                href: '#',
                src: '../public/img/empty.png',
                desc: 'Coming soon'
            }
        ],
        $scope.treeRow = [
            {
                href: '#',
                src: '../public/img/empty.png',
                desc: 'Coming soon'
            },
            {
                href: '#',
                src: '../public/img/empty.png',
                desc: 'Coming soon'
            }
        ],
    ]
}]);
/**
 * Created by halning on 29.08.16.
 */
"use strict";
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
/**
 * Created by halning on 02.09.16.
 */
"use strict";
app.controller('TimerController', function ($scope, $timeout) {
    var timer = null;
    var beginDate = null;
    var stopDate = null;
    var startDate = null;
    var $result = angular.element(document.querySelector("#result"));
    var $startStopButton = angular.element(document.querySelector("#stop-start__btn"));
    var $splitButton = angular.element(document.querySelector("#split-btn"));

    var split = {
        minutes: 0,
        seconds: 0,
        millisecond: 0,
        millisecondShow: 0
    };

    $scope.calculate = {
        minutes: 0,
        seconds: 0,
        millisecond: 0,
        millisecondShow: 0
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
        $scope.calculate.millisecondShow = $scope.calculate.millisecond - $scope.calculate.seconds * 1000;

        timer = $timeout(updateCounter, 1);
    };

    var addElement = function (buttonTextObjIndex, showDate) {
        var newP = angular.element("<p>");
        var borderColor = (buttonTextObjIndex === 'Stop') ? $scope.borderColor.red : $scope.borderColor.blue;

        newP.css({border: "1px solid" + borderColor});

        $result.append(newP);
        newP.text(buttonTextObjIndex + ' - ' + showDate.minutes + ' m : ' + showDate.seconds + ' s : ' + showDate.millisecondShow + ' ms');
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
        split.millisecondShow = split.millisecond - split.seconds * 1000;
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
/**
 * Created by halning on 25.08.16.
 */
app.directive('navigation', function () {
    return {
        restrict: 'E',
        scope: {},
        templateUrl: 'public/js/directives/nav.html',
        link: function (scope) {
        }
    };
});
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


//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyIsImNvbnRyb2xsZXJzL0hvbWVDb250cm9sbGVyLmpzIiwiY29udHJvbGxlcnMvTWFpbkNvbnRyb2xsZXIuanMiLCJjb250cm9sbGVycy9Qcm9qZWN0Q29udHJvbGxlci5qcyIsImNvbnRyb2xsZXJzL1NraWxsc0NvbnRyb2xsZXIuanMiLCJjb250cm9sbGVycy9UaW1lckNvbnRyb2xsZXIuanMiLCJkaXJlY3RpdmVzL2Zvb3Rlci5qcyIsImRpcmVjdGl2ZXMvbmF2LmpzIiwiZGlyZWN0aXZlcy9yZWFkTW9yZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNoQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNmQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDbExBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUM5Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUN2RkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQy9IQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNYQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNYQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiYXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBDcmVhdGVkIGJ5IGhhbG5pbmcgb24gMjMuMDguMTYuXG4gKi9cbnZhciBhcHAgPSBhbmd1bGFyLm1vZHVsZSgnR2FsbGVyeUFwcCcsIFsnbmdSb3V0ZScsICduZ0FuaW1hdGUnXSk7XG5cbmFwcC5jb25maWcoW1wiJGxvY2F0aW9uUHJvdmlkZXJcIiwgJyRyb3V0ZVByb3ZpZGVyJywgZnVuY3Rpb24gKCRsb2NhdGlvblByb3ZpZGVyLCAkcm91dGVQcm92aWRlcikge1xuICAgICRyb3V0ZVByb3ZpZGVyXG4gICAgICAgIC53aGVuKCcvJywge1xuICAgICAgICAgICAgY29udHJvbGxlcjogJ0hvbWVDb250cm9sbGVyJyxcbiAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAndGVtcGxhdGVzL21haW4uaHRtbCdcbiAgICAgICAgfSlcbiAgICAgICAgLndoZW4oJy9za2lsbHMnLCB7XG4gICAgICAgICAgICBjb250cm9sbGVyOiAnU2tpbGxzQ29udHJvbGxlcicsXG4gICAgICAgICAgICB0ZW1wbGF0ZVVybDogJ3RlbXBsYXRlcy9za2lsbHMuaHRtbCdcbiAgICAgICAgfSlcbiAgICAgICAgLndoZW4oJy9wcm9qZWN0cycsIHtcbiAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdQcm9qZWN0Q29udHJvbGxlcicsXG4gICAgICAgICAgICB0ZW1wbGF0ZVVybDogJ3RlbXBsYXRlcy9wcm9qZWN0cy5odG1sJ1xuICAgICAgICB9KVxuICAgICAgICAud2hlbignL3RpbWVyJywge1xuICAgICAgICAgICAgY29udHJvbGxlcjogJ1RpbWVyQ29udHJvbGxlcicsXG4gICAgICAgICAgICB0ZW1wbGF0ZVVybDogJ3RlbXBsYXRlcy90aW1lci5odG1sJ1xuICAgICAgICB9KVxuICAgICAgICAud2hlbignL2NvbnRhY3QnLCB7XG4gICAgICAgICAgICAvL2NvbnRyb2xsZXI6ICdNYWluQ29udHJvbGxlcicsXG4gICAgICAgICAgICB0ZW1wbGF0ZVVybDogJ3RlbXBsYXRlcy9jb250YWN0Lmh0bWwnXG4gICAgICAgIH0pXG4gICAgICAgIC5vdGhlcndpc2Uoe1xuICAgICAgICAgICAgcmVkaXJlY3RUbzogJy8nXG4gICAgICAgIH0pO1xuXG4gICAgJGxvY2F0aW9uUHJvdmlkZXIuaHRtbDVNb2RlKHRydWUpO1xufV0pOyIsIi8qKlxuICogQ3JlYXRlZCBieSBoYWxuaW5nIG9uIDI5LjA4LjE2LlxuICovXG5cInVzZSBzdHJpY3RcIjtcbmFwcC5jb250cm9sbGVyKCdIb21lQ29udHJvbGxlcicsIFsnJHNjb3BlJywgJyR3aW5kb3cnLCBmdW5jdGlvbigkc2NvcGUsICR3aW5kb3cpIHtcbiAgICAkc2NvcGUubGlua3MgPSB7XG4gICAgICAgIGNvZGVBY2FkZW15OiAnaHR0cHM6Ly93d3cuY29kZWNhZGVteS5jb20vJyxcbiAgICAgICAgZ2l0SHViOiAnaHR0cHM6Ly9naXRodWIuY29tL0hhbG5pbmcvYnJvdmFyeScsXG4gICAgICAgIG1ha2VXZWFyOiAnaHR0cDovL21ha2V3ZWFyLmNsdWIvJyxcbiAgICAgICAgY3M1MDogJ2h0dHBzOi8vY3M1MC5oYXJ2YXJkLmVkdS8nXG4gICAgfTtcblxuICAgICRzY29wZS52aWV3Q2xhc3MgPSAnYW5pbWF0ZS1ob21lJztcblxufV0pO1xuIiwiLyoqXG4gKiBDcmVhdGVkIGJ5IGhhbG5pbmcgb24gMjMuMDguMTYuXG4gKi9cblwidXNlIHN0cmljdFwiO1xuYXBwLmNvbnRyb2xsZXIoJ01haW5Db250cm9sbGVyJywgWyckc2NvcGUnLCBmdW5jdGlvbiAoJHNjb3BlKSB7XG4gICAgJHNjb3BlLmluaXRKcXVlcnkgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciB3aW5kb3dXaWR0aCA9ICQod2luZG93KS53aWR0aCgpO1xuICAgICAgICB2YXIgd2luZG93SGVpZ2h0ID0gJCh3aW5kb3cpLmhlaWdodCgpO1xuICAgICAgICB2YXIgc2Nyb2xsQ291bnRlciA9IDA7XG4gICAgICAgIHZhciAkbGFzdFNjcm9sbFRvcCA9IDA7XG4gICAgICAgIHZhciAkaXNNb2JpbGUgPSBudWxsO1xuXG4gICAgICAgICRpc01vYmlsZSA9IG5hdmlnYXRvci51c2VyQWdlbnQubWF0Y2goLyhpUGhvbmV8aVBvZHxpUGFkfEFuZHJvaWR8QmxhY2tCZXJyeSkvKTtcblxuXG4gICAgICAgIHZhciAkbXllbGVtZW50ID0gJCgnLm1haW4nKTtcblxuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwic2Nyb2xsXCIsIG15U2Nyb2xsLCBmYWxzZSk7XG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJ0b3VjaG1vdmVcIiwgbXlTY3JvbGwsIGZhbHNlKTtcblxuICAgICAgICAkbXllbGVtZW50LnNjcm9sbChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBteVNjcm9sbCgpO1xuICAgICAgICB9KTtcblxuICAgICAgICBteU1haW5SZXNpemVzKCk7XG4gICAgICAgIHNldEhlYWRlcnMoKTtcbiAgICAgICAgd2luZG93UmVzaXplKCk7XG4gICAgICAgIGltYWdlWmVzaXJlKCk7XG5cblxuICAgICAgICAvKipcbiAgICAgICAgICogcmVzaXplIG1haW4gaW1hZ2UgZGVwZW5kcyB3aW5kb3dcbiAgICAgICAgICovXG4gICAgICAgIGZ1bmN0aW9uIGltYWdlWmVzaXJlKCkge1xuICAgICAgICAgICAgaWYgKCQoXCIuanVtYm90cm9tXCIpLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICAkbXllbGVtZW50LmZpbmQoXCIuanVtYm90cm9tXCIpLmNzcyh7XCJoZWlnaHRcIjogd2luZG93SGVpZ2h0fSk7XG4gICAgICAgICAgICAgICAgZmFuY3lUaXRsZUludHJvKCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICgkKFwiLnNraWxsc1wiKS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgd2luZG93LnNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAkbXllbGVtZW50LmFkZENsYXNzKFwiaW5pdF8yXCIpO1xuICAgICAgICAgICAgICAgIH0sIDE1MCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICgkKFwiLnByb2plY3RzXCIpLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICB3aW5kb3cuc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICRteWVsZW1lbnQuYWRkQ2xhc3MoXCJpbml0XzJcIik7XG4gICAgICAgICAgICAgICAgfSwgMTUwKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiByZXNpemUgbWFpbiBoZWlnaHQgY29udGFpbmVyIGZvZSBzY3JvbGwgZGVwZW5kIHdpbmRvd1xuICAgICAgICAgKi9cbiAgICAgICAgZnVuY3Rpb24gbXlNYWluUmVzaXplcygpIHtcbiAgICAgICAgICAgIC8vbWFpbiByZXNpemVzXG4gICAgICAgICAgICB3aW5kb3dXaWR0aCA9ICQod2luZG93KS53aWR0aCgpO1xuICAgICAgICAgICAgd2luZG93SGVpZ2h0ID0gJCh3aW5kb3cpLmhlaWdodCgpO1xuXG4gICAgICAgICAgICAkbXllbGVtZW50LmNzcygnaGVpZ2h0Jywgd2luZG93SGVpZ2h0ICsgMSk7XG4gICAgICAgIH1cblxuICAgICAgICAvKipcbiAgICAgICAgICogZmFuY3kgdGl0bGUgaW4gbWFpbiBwYWdlXG4gICAgICAgICAqL1xuICAgICAgICBmdW5jdGlvbiBmYW5jeVRpdGxlSW50cm8oKSB7XG4gICAgICAgICAgICAkbXllbGVtZW50LmZpbmQoXCIuanVtYm90cm9tXCIpLmFkZENsYXNzKFwiaW5pdF8xXCIpO1xuICAgICAgICAgICAgd2luZG93LnNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICRteWVsZW1lbnQuZmluZChcIi5qdW1ib3Ryb21cIikuYWRkQ2xhc3MoXCJpbml0XzJcIik7XG4gICAgICAgICAgICB9LCA1MDApO1xuICAgICAgICB9XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIGNoYW5nZSBoZWFkZXIgZGVwZW5kIHdoYXQgYmFja2dyb3VuZCBpbnRlcmFjdGl2ZVxuICAgICAgICAgKi9cbiAgICAgICAgZnVuY3Rpb24gbXlTY3JvbGwoKSB7XG4gICAgICAgICAgICB2YXIgc3QgPSAkbXllbGVtZW50LnNjcm9sbFRvcCgpO1xuXG4gICAgICAgICAgICAvL3VwIGFuZCBkb3duIHNjcm9sbCBmb3IgdGhlIGhlYWRlclxuICAgICAgICAgICAgaWYgKHN0ID4gJGxhc3RTY3JvbGxUb3ApIHtcbiAgICAgICAgICAgICAgICAvLyBkb3duc2Nyb2xsIGNvZGVcbiAgICAgICAgICAgICAgICBpZiAoc3QgPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICgkKCcuaGVhZGVyJykuaGFzQ2xhc3MoJ2luJykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNjcm9sbENvdW50ZXIrKztcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzY3JvbGxDb3VudGVyID49IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKCcuaGVhZGVyJykucmVtb3ZlQ2xhc3MoJ2luJykuYWRkQ2xhc3MoJ291dCcpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNjcm9sbENvdW50ZXIgPSAwO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKCRteWVsZW1lbnQuc2Nyb2xsVG9wKCkgPT0gJChkb2N1bWVudCkuaGVpZ2h0KCkgLSAkKHdpbmRvdykuaGVpZ2h0KCkpIHtcbiAgICAgICAgICAgICAgICAgICAgJCgnLmhlYWRlcicpLnJlbW92ZUNsYXNzKCdvdXQnKS5hZGRDbGFzcygnaW4nKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgaWYgKCQoJy5oZWFkZXInKS5oYXNDbGFzcygnb3V0JykpIHtcbiAgICAgICAgICAgICAgICAgICAgc2Nyb2xsQ291bnRlcisrO1xuICAgICAgICAgICAgICAgICAgICBpZiAoc2Nyb2xsQ291bnRlciA+PSAzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAkKCcuaGVhZGVyJykucmVtb3ZlQ2xhc3MoJ291dCcpLmFkZENsYXNzKCdpbicpO1xuICAgICAgICAgICAgICAgICAgICAgICAgc2Nyb2xsQ291bnRlciA9IDA7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAkbGFzdFNjcm9sbFRvcCA9IHN0O1xuXG4gICAgICAgICAgICBpZiAoIX53aW5kb3cubG9jYXRpb24uaHJlZi5pbmRleE9mKCdza2lsbHMnKVxuICAgICAgICAgICAgICAgICYmICF+d2luZG93LmxvY2F0aW9uLmhyZWYuaW5kZXhPZigncHJvamVjdHMnKVxuICAgICAgICAgICAgICAgICYmICF+d2luZG93LmxvY2F0aW9uLmhyZWYuaW5kZXhPZignY29udGFjdCcpXG4gICAgICAgICAgICAmJiAhfndpbmRvdy5sb2NhdGlvbi5ocmVmLmluZGV4T2YoJ3RpbWVyJykpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyh3aW5kb3cubG9jYXRpb24uaHJlZik7XG4gICAgICAgICAgICAgICAgaWYgKHdpbmRvd1dpZHRoID4gMTIwMCkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgcmV2ZXJ0Q29sb3IgPSB3aW5kb3dIZWlnaHQgLSA0MDtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB2YXIgcmV2ZXJ0Q29sb3IgPSB3aW5kb3dIZWlnaHQgLyAzO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoJG15ZWxlbWVudC5zY3JvbGxUb3AoKSA+IHJldmVydENvbG9yKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICgkKFwiLmhlYWRlclwiKS5oYXNDbGFzcygnd2hpdGUnKSlcbiAgICAgICAgICAgICAgICAgICAgICAgICQoXCIuaGVhZGVyXCIpLnJlbW92ZUNsYXNzKCd3aGl0ZScpLmFkZENsYXNzKCdibGFjaycpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoJChcIi5oZWFkZXJcIikuaGFzQ2xhc3MoJ3RyYW5zcGFyZW50JykpXG4gICAgICAgICAgICAgICAgICAgICAgICAkKFwiLmhlYWRlclwiKS5yZW1vdmVDbGFzcygndHJhbnNwYXJlbnQnKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBpZiAoJG15ZWxlbWVudC5maW5kKFwiLmZ1bGwtaW1hZ2VcIikubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCQoXCIuaGVhZGVyXCIpLmhhc0NsYXNzKCdibGFjaycpKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICQoXCIuaGVhZGVyXCIpLnJlbW92ZUNsYXNzKCdibGFjaycpLmFkZENsYXNzKCd3aGl0ZScpO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCQoXCIuaGVhZGVyXCIpLmhhc0NsYXNzKCdibGFjaycpKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICQoXCIuaGVhZGVyXCIpLmFkZENsYXNzKCd0cmFuc3BhcmVudCcpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXZlcnRDb2xvciA9IDYwO1xuICAgICAgICAgICAgICAgIGlmICgkbXllbGVtZW50LnNjcm9sbFRvcCgpID4gcmV2ZXJ0Q29sb3IpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCQoXCIuaGVhZGVyXCIpLmhhc0NsYXNzKCd0cmFuc3BhcmVudCcpKVxuICAgICAgICAgICAgICAgICAgICAgICAgJChcIi5oZWFkZXJcIikucmVtb3ZlQ2xhc3MoJ3RyYW5zcGFyZW50Jyk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCQoXCIuaGVhZGVyXCIpLmhhc0NsYXNzKCdibGFjaycpKVxuICAgICAgICAgICAgICAgICAgICAgICAgJChcIi5oZWFkZXJcIikuYWRkQ2xhc3MoJ3RyYW5zcGFyZW50Jyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIHNldCBoZWFkZXIgY2xhc3MgZGVwZW5kIHdoYXQgaXMgYmFja2dyb3VuZFxuICAgICAgICAgKi9cbiAgICAgICAgZnVuY3Rpb24gc2V0SGVhZGVycygpIHtcbiAgICAgICAgICAgIGlmICgkbXllbGVtZW50LmZpbmQoXCIuZnVsbC1pbWFnZVwiKS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgaWYgKCQoXCIuaGVhZGVyXCIpLmhhc0NsYXNzKCdibGFjaycpKVxuICAgICAgICAgICAgICAgICAgICAkKFwiLmhlYWRlclwiKS5yZW1vdmVDbGFzcygnYmxhY2snKS5hZGRDbGFzcygnd2hpdGUnKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgaWYgKCQoXCIuaGVhZGVyXCIpLmhhc0NsYXNzKCd3aGl0ZScpKVxuICAgICAgICAgICAgICAgICAgICAkKFwiLmhlYWRlclwiKS5yZW1vdmVDbGFzcygnd2hpdGUnKS5hZGRDbGFzcygnYmxhY2snKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKCQoXCIuaGVhZGVyXCIpLmhhc0NsYXNzKCdibGFjaycpKVxuICAgICAgICAgICAgICAgICQoXCIuaGVhZGVyXCIpLmFkZENsYXNzKCd0cmFuc3BhcmVudCcpO1xuXG4gICAgICAgICAgICAkKCcuaGVhZGVyJykucmVtb3ZlQ2xhc3MoJ291dCcpLmFkZENsYXNzKCdpbicpO1xuICAgICAgICAgICAgLyppZiggJGlzTW9iaWxlICE9IG51bGwgKXtcbiAgICAgICAgICAgICAkKCdib2R5JykuYWRkQ2xhc3MoJ21vYmlsZS1uby1ob3ZlcnMtZHVkZScpO1xuICAgICAgICAgICAgICQoJy5oZWFkZXInKS5yZW1vdmVDbGFzcygnb3V0JykuYWRkQ2xhc3MoJ2luJyk7XG4gICAgICAgICAgICAgfSovXG4gICAgICAgIH1cblxuICAgICAgICAvKipcbiAgICAgICAgICogcmVzaXplIGFsbCBpZiB3aW5kb3cgcmVzaXplIHVzZXJcbiAgICAgICAgICovXG4gICAgICAgIGZ1bmN0aW9uIHdpbmRvd1Jlc2l6ZSgpIHtcbiAgICAgICAgICAgICQod2luZG93KS5yZXNpemUoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIGlmICgkKHdpbmRvdykud2lkdGgoKSAhPSB3aW5kb3dXaWR0aCB8fCAkKHdpbmRvdykuaGVpZ2h0ICE9IHdpbmRvd0hlaWdodCkge1xuICAgICAgICAgICAgICAgICAgICBteU1haW5SZXNpemVzKCk7XG4gICAgICAgICAgICAgICAgICAgIGltYWdlWmVzaXJlKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9O1xuXG59XSk7IiwiLyoqXG4gKiBDcmVhdGVkIGJ5IGhhbG5pbmcgb24gMjkuMDguMTYuXG4gKi9cblwidXNlIHN0cmljdFwiO1xuYXBwLmNvbnRyb2xsZXIoJ1Byb2plY3RDb250cm9sbGVyJywgWyckc2NvcGUnLCBmdW5jdGlvbigkc2NvcGUpIHtcbiAgICAkc2NvcGUudmlld0NsYXNzID0gJ2FuaW1hdGUtcHJvamVjdHMnO1xuICAgICRzY29wZS5wcm9qZWN0cyA9IFtcbiAgICAgICAgJHNjb3BlLmZpcnN0Um93ID0gW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGhyZWY6ICdodHRwOi8vbWFrZXdlYXIuY2x1YicsXG4gICAgICAgICAgICAgICAgc3JjOiAnLi4vcHVibGljL2ltZy9tdzEucG5nJyxcbiAgICAgICAgICAgICAgICBkZXNjOiAn0JjQvdGC0LXRgNC90LXRgiDQvNCw0LPQsNC30LjQvSDQvtC00LXQttC00Ysg0LTQu9GPINC+0L/RgtC+0LLRi9GFINC4INGA0L7Qt9C90LjRh9C90YvRhSDQv9C+0LrRg9C/0LDRgtC10LvQtdC5LicgK1xuICAgICAgICAgICAgICAgICfQktGA0LXQvNGPINGA0LDQsdC+0YLRiyDQvdCw0LQg0L/RgNC+0LXQutGC0L7QvCA5INC80LXRgdGP0YbQtdCyLiDQktGL0L/QvtC70L3Rj9C7INGA0LDQt9C90L7QvtCx0YDQsNC30L3Ri9C1INC30LDQtNCw0YfQuCDQvtGCINCy0LXRgNGB0YLQutC4INC00L4g0YDQsNC30YDQsNCx0L7RgtC60Lgg0L/QsNGA0YHQtdGA0LAg0L3QsCBQSFAuJytcbiAgICAgICAgICAgICAgICAn0J/RgNC40L7QsdGA0LXQuyDQvtC/0YvRgiDQsiDQstC10YDRgdGC0LrQtSwgalF1ZXJ5LCBCb290c3RyYXAsIFBIUCwgTXlTUUwsIEd1bHAsIEdpdCDQuCDQtNGALidcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgaHJlZjogJyMnLFxuICAgICAgICAgICAgICAgIHNyYzogJy4uL3B1YmxpYy9pbWcvZW1wdHkucG5nJyxcbiAgICAgICAgICAgICAgICBkZXNjOiAnQ29taW5nIHNvb24nXG4gICAgICAgICAgICB9XG4gICAgICAgIF0sXG4gICAgICAgICRzY29wZS5zZWNvbmRSb3cgPSBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgaHJlZjogJyMnLFxuICAgICAgICAgICAgICAgIHNyYzogJy4uL3B1YmxpYy9pbWcvZW1wdHkucG5nJyxcbiAgICAgICAgICAgICAgICBkZXNjOiAnQ29taW5nIHNvb24nXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGhyZWY6ICcjJyxcbiAgICAgICAgICAgICAgICBzcmM6ICcuLi9wdWJsaWMvaW1nL2VtcHR5LnBuZycsXG4gICAgICAgICAgICAgICAgZGVzYzogJ0NvbWluZyBzb29uJ1xuICAgICAgICAgICAgfVxuICAgICAgICBdLFxuICAgICAgICAkc2NvcGUudHJlZVJvdyA9IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBocmVmOiAnIycsXG4gICAgICAgICAgICAgICAgc3JjOiAnLi4vcHVibGljL2ltZy9lbXB0eS5wbmcnLFxuICAgICAgICAgICAgICAgIGRlc2M6ICdDb21pbmcgc29vbidcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgaHJlZjogJyMnLFxuICAgICAgICAgICAgICAgIHNyYzogJy4uL3B1YmxpYy9pbWcvZW1wdHkucG5nJyxcbiAgICAgICAgICAgICAgICBkZXNjOiAnQ29taW5nIHNvb24nXG4gICAgICAgICAgICB9XG4gICAgICAgIF0sXG4gICAgXVxufV0pOyIsIi8qKlxuICogQ3JlYXRlZCBieSBoYWxuaW5nIG9uIDI5LjA4LjE2LlxuICovXG5cInVzZSBzdHJpY3RcIjtcbmFwcC5jb250cm9sbGVyKCdTa2lsbHNDb250cm9sbGVyJywgWyckc2NvcGUnLCBmdW5jdGlvbigkc2NvcGUpIHtcbiAgICAkc2NvcGUudmlld0NsYXNzID0gJ2FuaW1hdGUtc2tpbGxzJztcbiAgICAkc2NvcGUuZnJvbnRFbmQ9IFtcbiAgICAgICAgJHNjb3BlLmZpcnN0ID0gW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIG5hbWU6ICdIVE1MICYgQ1NTJyxcbiAgICAgICAgICAgICAgICBpY29uOiAnaHRtbCdcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgbmFtZTogJ1NBU1MgJiBMRVNTJyxcbiAgICAgICAgICAgICAgICBpY29uOiAnbGVzcydcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgbmFtZTogJ0Jvb3RzdHJhcCAzJyxcbiAgICAgICAgICAgICAgICBpY29uOiAnYm9vdCdcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgbmFtZTogJ0pTJyxcbiAgICAgICAgICAgICAgICBpY29uOiAnanMnXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgXSxcbiAgICAgICAgJHNjb3BlLnNlY29uZCA9IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBuYW1lOiAnalF1ZXJ5JyxcbiAgICAgICAgICAgICAgICBpY29uOiAnanF1ZXJ5J1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBuYW1lOiAnQW5ndWxhckpTJyxcbiAgICAgICAgICAgICAgICBpY29uOiAnYW5nJ1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBuYW1lOiAnR3VscCcsXG4gICAgICAgICAgICAgICAgaWNvbjogJ2d1bHAnXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIG5hbWU6ICdqUXVlcnktVUknLFxuICAgICAgICAgICAgICAgIGljb246ICdqcS11aSdcbiAgICAgICAgICAgIH1cbiAgICAgICAgXSxcbiAgICBdXG5cbiAgICAkc2NvcGUuYmFja0VuZCA9IFtcbiAgICAgICAgJHNjb3BlLmZpcnN0ID0gW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIG5hbWU6ICdQSFAgKyBPT1AnLFxuICAgICAgICAgICAgICAgIGljb246ICdwaHAnXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIG5hbWU6ICdTUUwnLFxuICAgICAgICAgICAgICAgIGljb246ICdzcWwnXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIG5hbWU6ICdNVkMnLFxuICAgICAgICAgICAgICAgIGljb246ICdtdmMnXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIG5hbWU6ICdDb21wb3NlcicsXG4gICAgICAgICAgICAgICAgaWNvbjogJ2NvbXBvc2VyJ1xuICAgICAgICAgICAgfVxuICAgICAgICBdXG4gICAgXVxuXG4gICAgJHNjb3BlLm90aGVyID0gW1xuICAgICAgICAkc2NvcGUuZmlyc3QgPSBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgbmFtZTogJ0dpdCcsXG4gICAgICAgICAgICAgICAgaWNvbjogJ2dpdCdcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgbmFtZTogJ0F6dXJlJyxcbiAgICAgICAgICAgICAgICBpY29uOiAnYXp1cmUnXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIG5hbWU6ICdDaXNjbycsXG4gICAgICAgICAgICAgICAgaWNvbjogJ2Npc2NvJ1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBuYW1lOiAnRW5nbGlzaCBwcmUtaW50ZXJtZWRpYXRlJyxcbiAgICAgICAgICAgICAgICBpY29uOiAnZW5nbGlzaCdcbiAgICAgICAgICAgIH1cbiAgICAgICAgXVxuICAgIF1cbn1dKTsiLCIvKipcbiAqIENyZWF0ZWQgYnkgaGFsbmluZyBvbiAwMi4wOS4xNi5cbiAqL1xuXCJ1c2Ugc3RyaWN0XCI7XG5hcHAuY29udHJvbGxlcignVGltZXJDb250cm9sbGVyJywgZnVuY3Rpb24gKCRzY29wZSwgJHRpbWVvdXQpIHtcbiAgICB2YXIgdGltZXIgPSBudWxsO1xuICAgIHZhciBiZWdpbkRhdGUgPSBudWxsO1xuICAgIHZhciBzdG9wRGF0ZSA9IG51bGw7XG4gICAgdmFyIHN0YXJ0RGF0ZSA9IG51bGw7XG4gICAgdmFyICRyZXN1bHQgPSBhbmd1bGFyLmVsZW1lbnQoZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNyZXN1bHRcIikpO1xuICAgIHZhciAkc3RhcnRTdG9wQnV0dG9uID0gYW5ndWxhci5lbGVtZW50KGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjc3RvcC1zdGFydF9fYnRuXCIpKTtcbiAgICB2YXIgJHNwbGl0QnV0dG9uID0gYW5ndWxhci5lbGVtZW50KGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjc3BsaXQtYnRuXCIpKTtcblxuICAgIHZhciBzcGxpdCA9IHtcbiAgICAgICAgbWludXRlczogMCxcbiAgICAgICAgc2Vjb25kczogMCxcbiAgICAgICAgbWlsbGlzZWNvbmQ6IDAsXG4gICAgICAgIG1pbGxpc2Vjb25kU2hvdzogMFxuICAgIH07XG5cbiAgICAkc2NvcGUuY2FsY3VsYXRlID0ge1xuICAgICAgICBtaW51dGVzOiAwLFxuICAgICAgICBzZWNvbmRzOiAwLFxuICAgICAgICBtaWxsaXNlY29uZDogMCxcbiAgICAgICAgbWlsbGlzZWNvbmRTaG93OiAwXG4gICAgfTtcblxuICAgICRzY29wZS5zdG9wU3RhcnRNYXJrID0gMDtcbiAgICAkc2NvcGUuYnV0dG9uVGV4dE9iaiA9IHtcbiAgICAgICAgc3RhcnQ6ICdTdGFydCcsXG4gICAgICAgIHN0b3A6ICdTdG9wJyxcbiAgICAgICAgc3BsaXQ6ICdTcGxpdCcsXG4gICAgICAgIHJlc2V0OiAnUmVzZXQnXG4gICAgfTtcbiAgICAkc2NvcGUuYnV0dG9uVGV4dCA9ICRzY29wZS5idXR0b25UZXh0T2JqLnN0YXJ0O1xuICAgICRzY29wZS5ib3JkZXJDb2xvciA9IHtcbiAgICAgICAgcmVkOiAnI2M5MzAyYycsXG4gICAgICAgIGJsdWU6ICcjMzFiMGQ1J1xuICAgIH07XG5cbiAgICB2YXIgdXBkYXRlQ291bnRlciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgJHNjb3BlLmNhbGN1bGF0ZS5taWxsaXNlY29uZCA9IChzdG9wRGF0ZSA9PT0gbnVsbCkgPyBEYXRlLm5vdygpIC0gYmVnaW5EYXRlIDogRGF0ZS5ub3coKSAtICgoc3RhcnREYXRlIC0gc3RvcERhdGUpICsgYmVnaW5EYXRlKTtcbiAgICAgICAgJHNjb3BlLmNhbGN1bGF0ZS5zZWNvbmRzID0gTWF0aC5mbG9vcigoJHNjb3BlLmNhbGN1bGF0ZS5taWxsaXNlY29uZCAvIDEwMDApICUgNjApO1xuICAgICAgICAkc2NvcGUuY2FsY3VsYXRlLm1pbnV0ZXMgPSBNYXRoLmZsb29yKCgkc2NvcGUuY2FsY3VsYXRlLm1pbGxpc2Vjb25kIC8gMTAwMCAvIDYwKSAlIDYwKTtcbiAgICAgICAgJHNjb3BlLmNhbGN1bGF0ZS5taWxsaXNlY29uZFNob3cgPSAkc2NvcGUuY2FsY3VsYXRlLm1pbGxpc2Vjb25kIC0gJHNjb3BlLmNhbGN1bGF0ZS5zZWNvbmRzICogMTAwMDtcblxuICAgICAgICB0aW1lciA9ICR0aW1lb3V0KHVwZGF0ZUNvdW50ZXIsIDEpO1xuICAgIH07XG5cbiAgICB2YXIgYWRkRWxlbWVudCA9IGZ1bmN0aW9uIChidXR0b25UZXh0T2JqSW5kZXgsIHNob3dEYXRlKSB7XG4gICAgICAgIHZhciBuZXdQID0gYW5ndWxhci5lbGVtZW50KFwiPHA+XCIpO1xuICAgICAgICB2YXIgYm9yZGVyQ29sb3IgPSAoYnV0dG9uVGV4dE9iakluZGV4ID09PSAnU3RvcCcpID8gJHNjb3BlLmJvcmRlckNvbG9yLnJlZCA6ICRzY29wZS5ib3JkZXJDb2xvci5ibHVlO1xuXG4gICAgICAgIG5ld1AuY3NzKHtib3JkZXI6IFwiMXB4IHNvbGlkXCIgKyBib3JkZXJDb2xvcn0pO1xuXG4gICAgICAgICRyZXN1bHQuYXBwZW5kKG5ld1ApO1xuICAgICAgICBuZXdQLnRleHQoYnV0dG9uVGV4dE9iakluZGV4ICsgJyAtICcgKyBzaG93RGF0ZS5taW51dGVzICsgJyBtIDogJyArIHNob3dEYXRlLnNlY29uZHMgKyAnIHMgOiAnICsgc2hvd0RhdGUubWlsbGlzZWNvbmRTaG93ICsgJyBtcycpO1xuICAgIH1cblxuICAgIHZhciBzdG9wVGltZXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICR0aW1lb3V0LmNhbmNlbCh0aW1lcik7XG4gICAgICAgIHRpbWVyID0gbnVsbDtcbiAgICAgICAgc3RvcERhdGUgKz0gRGF0ZS5ub3coKSAtIGJlZ2luRGF0ZTtcblxuICAgICAgICAkc3RhcnRTdG9wQnV0dG9uXG4gICAgICAgICAgICAucmVtb3ZlQ2xhc3MoJ2J0bi1kYW5nZXInKVxuICAgICAgICAgICAgLmFkZENsYXNzKCdidG4tc3VjY2VzcycpO1xuICAgICAgICAkc2NvcGUuc3RvcFN0YXJ0TWFyayA9IDA7XG4gICAgICAgICRzY29wZS5idXR0b25UZXh0ID0gJHNjb3BlLmJ1dHRvblRleHRPYmouc3RhcnQ7XG4gICAgICAgICRzcGxpdEJ1dHRvbi5hdHRyKCdkaXNhYmxlZCcsIFwiZGlzYWJsZWRcIik7XG4gICAgfVxuXG4gICAgJHNjb3BlLnRvZ2dsZUNvdW50ZXIgPSBmdW5jdGlvbiAoc3RvcFN0YXJ0TWFyaykge1xuICAgICAgICBpZiAoc3RvcFN0YXJ0TWFyaykge1xuICAgICAgICAgICAgc3RvcFRpbWVyKCk7XG4gICAgICAgICAgICBhZGRFbGVtZW50KCRzY29wZS5idXR0b25UZXh0T2JqLnN0b3AsICRzY29wZS5jYWxjdWxhdGUpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGJlZ2luRGF0ZSA9PT0gbnVsbCkge1xuICAgICAgICAgICAgYmVnaW5EYXRlID0gRGF0ZS5ub3coKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aW1lciA9PT0gbnVsbCkge1xuICAgICAgICAgICAgc3RhcnREYXRlICs9IERhdGUubm93KCkgLSBiZWdpbkRhdGU7XG5cbiAgICAgICAgICAgICRzdGFydFN0b3BCdXR0b25cbiAgICAgICAgICAgICAgICAucmVtb3ZlQ2xhc3MoJ2J0bi1zdWNjZXNzJylcbiAgICAgICAgICAgICAgICAuYWRkQ2xhc3MoJ2J0bi1kYW5nZXInKTtcblxuICAgICAgICAgICAgdXBkYXRlQ291bnRlcigpO1xuXG4gICAgICAgICAgICAkc2NvcGUuc3RvcFN0YXJ0TWFyayA9IDE7XG4gICAgICAgICAgICAkc2NvcGUuYnV0dG9uVGV4dCA9ICRzY29wZS5idXR0b25UZXh0T2JqLnN0b3A7XG4gICAgICAgICAgICAkc3BsaXRCdXR0b24uYXR0cignZGlzYWJsZWQnLCBcIlwiKTtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICAkc2NvcGUuZ2V0U3BsaXQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHNwbGl0Lm1pbnV0ZXMgPSAkc2NvcGUuY2FsY3VsYXRlLm1pbnV0ZXMgLSBzcGxpdC5taW51dGVzO1xuICAgICAgICBzcGxpdC5zZWNvbmRzID0gJHNjb3BlLmNhbGN1bGF0ZS5zZWNvbmRzIC0gc3BsaXQuc2Vjb25kcztcbiAgICAgICAgc3BsaXQubWlsbGlzZWNvbmQgPSAkc2NvcGUuY2FsY3VsYXRlLm1pbGxpc2Vjb25kIC0gc3BsaXQubWlsbGlzZWNvbmQ7XG5cbiAgICAgICAgYWRkRWxlbWVudCgkc2NvcGUuYnV0dG9uVGV4dE9iai5zcGxpdCwgc3BsaXQpO1xuXG4gICAgICAgIHNwbGl0Lm1pbnV0ZXMgPSAkc2NvcGUuY2FsY3VsYXRlLm1pbnV0ZXM7XG4gICAgICAgIHNwbGl0LnNlY29uZHMgPSAkc2NvcGUuY2FsY3VsYXRlLnNlY29uZHM7XG4gICAgICAgIHNwbGl0Lm1pbGxpc2Vjb25kID0gJHNjb3BlLmNhbGN1bGF0ZS5taWxsaXNlY29uZDtcbiAgICAgICAgc3BsaXQubWlsbGlzZWNvbmRTaG93ID0gc3BsaXQubWlsbGlzZWNvbmQgLSBzcGxpdC5zZWNvbmRzICogMTAwMDtcbiAgICB9XG5cbiAgICAkc2NvcGUucmVzZXQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHN0b3BUaW1lcigpO1xuXG4gICAgICAgIGJlZ2luRGF0ZSA9IG51bGw7XG4gICAgICAgIHN0YXJ0RGF0ZSA9IG51bGw7XG4gICAgICAgIHN0b3BEYXRlID0gbnVsbDtcblxuICAgICAgICAkc2NvcGUuY2FsY3VsYXRlLm1pbGxpc2Vjb25kID0gMDtcbiAgICAgICAgJHNjb3BlLmNhbGN1bGF0ZS5zZWNvbmRzID0gMDtcbiAgICAgICAgJHNjb3BlLmNhbGN1bGF0ZS5taW51dGVzID0gMDtcbiAgICAgICAgc3BsaXQubWludXRlcyA9IDA7XG4gICAgICAgIHNwbGl0LnNlY29uZHMgPSAwO1xuICAgICAgICBzcGxpdC5taWxsaXNlY29uZCA9IDA7XG5cbiAgICAgICAgJHJlc3VsdC5maW5kKCdwJykucmVtb3ZlKCk7XG4gICAgfVxufSk7IiwiLyoqXG4gKiBDcmVhdGVkIGJ5IGhhbG5pbmcgb24gMjUuMDguMTYuXG4gKi9cbmFwcC5kaXJlY3RpdmUoJ215Rm9vdGVyJywgZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB7XG4gICAgICAgIHJlc3RyaWN0OiAnRScsXG4gICAgICAgIHNjb3BlOiB7fSxcbiAgICAgICAgdGVtcGxhdGVVcmw6ICdwdWJsaWMvanMvZGlyZWN0aXZlcy9mb290ZXIuaHRtbCcsXG4gICAgICAgIGxpbms6IGZ1bmN0aW9uIChzY29wZSkge1xuICAgICAgICB9XG4gICAgfTtcbn0pOyIsIi8qKlxuICogQ3JlYXRlZCBieSBoYWxuaW5nIG9uIDI1LjA4LjE2LlxuICovXG5hcHAuZGlyZWN0aXZlKCduYXZpZ2F0aW9uJywgZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB7XG4gICAgICAgIHJlc3RyaWN0OiAnRScsXG4gICAgICAgIHNjb3BlOiB7fSxcbiAgICAgICAgdGVtcGxhdGVVcmw6ICdwdWJsaWMvanMvZGlyZWN0aXZlcy9uYXYuaHRtbCcsXG4gICAgICAgIGxpbms6IGZ1bmN0aW9uIChzY29wZSkge1xuICAgICAgICB9XG4gICAgfTtcbn0pOyIsIi8qKlxuICogQ3JlYXRlZCBieSBoYWxuaW5nIG9uIDIzLjA4LjE2LlxuICovXG5hcHAuZGlyZWN0aXZlKCdyZWFkTW9yZScsIGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgICByZXN0cmljdDogJ0UnLFxuICAgICAgICBzY29wZToge30sXG4gICAgICAgIHRlbXBsYXRlVXJsOiAncHVibGljL2pzL2RpcmVjdGl2ZXMvcmVhZE1vcmUuaHRtbCcsXG4gICAgICAgIGxpbms6IGZ1bmN0aW9uIChzY29wZSkge1xuICAgICAgICAgICAgc2NvcGUucmVhZCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBkZXN0aW5hdGlvbiA9ICQoJy5zdGFydF9yZWFkaW5nJykub2Zmc2V0KCkudG9wO1xuICAgICAgICAgICAgICAgICQoJy5tYWluJykuYW5pbWF0ZSh7c2Nyb2xsVG9wOiBkZXN0aW5hdGlvbn0sIDUwMCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9O1xufSk7XG5cbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
