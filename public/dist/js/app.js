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

    //$locationProvider.html5Mode(true);
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


//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyIsImNvbnRyb2xsZXJzL0hvbWVDb250cm9sbGVyLmpzIiwiY29udHJvbGxlcnMvTWFpbkNvbnRyb2xsZXIuanMiLCJjb250cm9sbGVycy9Qcm9qZWN0Q29udHJvbGxlci5qcyIsImNvbnRyb2xsZXJzL1NraWxsc0NvbnRyb2xsZXIuanMiLCJjb250cm9sbGVycy9UaW1lckNvbnRyb2xsZXIuanMiLCJkaXJlY3RpdmVzL2Zvb3Rlci5qcyIsImRpcmVjdGl2ZXMvbmF2LmpzIiwiZGlyZWN0aXZlcy9yZWFkTW9yZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNoQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNmQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDbExBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUM5Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUN2RkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQy9IQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNYQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNYQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiYXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBDcmVhdGVkIGJ5IGhhbG5pbmcgb24gMjMuMDguMTYuXG4gKi9cbnZhciBhcHAgPSBhbmd1bGFyLm1vZHVsZSgnR2FsbGVyeUFwcCcsIFsnbmdSb3V0ZScsICduZ0FuaW1hdGUnXSk7XG5cbmFwcC5jb25maWcoW1wiJGxvY2F0aW9uUHJvdmlkZXJcIiwgJyRyb3V0ZVByb3ZpZGVyJywgZnVuY3Rpb24gKCRsb2NhdGlvblByb3ZpZGVyLCAkcm91dGVQcm92aWRlcikge1xuICAgICRyb3V0ZVByb3ZpZGVyXG4gICAgICAgIC53aGVuKCcvJywge1xuICAgICAgICAgICAgY29udHJvbGxlcjogJ0hvbWVDb250cm9sbGVyJyxcbiAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAndGVtcGxhdGVzL21haW4uaHRtbCdcbiAgICAgICAgfSlcbiAgICAgICAgLndoZW4oJy9za2lsbHMnLCB7XG4gICAgICAgICAgICBjb250cm9sbGVyOiAnU2tpbGxzQ29udHJvbGxlcicsXG4gICAgICAgICAgICB0ZW1wbGF0ZVVybDogJ3RlbXBsYXRlcy9za2lsbHMuaHRtbCdcbiAgICAgICAgfSlcbiAgICAgICAgLndoZW4oJy9wcm9qZWN0cycsIHtcbiAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdQcm9qZWN0Q29udHJvbGxlcicsXG4gICAgICAgICAgICB0ZW1wbGF0ZVVybDogJ3RlbXBsYXRlcy9wcm9qZWN0cy5odG1sJ1xuICAgICAgICB9KVxuICAgICAgICAud2hlbignL3RpbWVyJywge1xuICAgICAgICAgICAgY29udHJvbGxlcjogJ1RpbWVyQ29udHJvbGxlcicsXG4gICAgICAgICAgICB0ZW1wbGF0ZVVybDogJ3RlbXBsYXRlcy90aW1lci5odG1sJ1xuICAgICAgICB9KVxuICAgICAgICAud2hlbignL2NvbnRhY3QnLCB7XG4gICAgICAgICAgICAvL2NvbnRyb2xsZXI6ICdNYWluQ29udHJvbGxlcicsXG4gICAgICAgICAgICB0ZW1wbGF0ZVVybDogJ3RlbXBsYXRlcy9jb250YWN0Lmh0bWwnXG4gICAgICAgIH0pXG4gICAgICAgIC5vdGhlcndpc2Uoe1xuICAgICAgICAgICAgcmVkaXJlY3RUbzogJy8nXG4gICAgICAgIH0pO1xuXG4gICAgLy8kbG9jYXRpb25Qcm92aWRlci5odG1sNU1vZGUodHJ1ZSk7XG59XSk7IiwiLyoqXG4gKiBDcmVhdGVkIGJ5IGhhbG5pbmcgb24gMjkuMDguMTYuXG4gKi9cblwidXNlIHN0cmljdFwiO1xuYXBwLmNvbnRyb2xsZXIoJ0hvbWVDb250cm9sbGVyJywgWyckc2NvcGUnLCAnJHdpbmRvdycsIGZ1bmN0aW9uKCRzY29wZSwgJHdpbmRvdykge1xuICAgICRzY29wZS5saW5rcyA9IHtcbiAgICAgICAgY29kZUFjYWRlbXk6ICdodHRwczovL3d3dy5jb2RlY2FkZW15LmNvbS8nLFxuICAgICAgICBnaXRIdWI6ICdodHRwczovL2dpdGh1Yi5jb20vSGFsbmluZy9icm92YXJ5JyxcbiAgICAgICAgbWFrZVdlYXI6ICdodHRwOi8vbWFrZXdlYXIuY2x1Yi8nLFxuICAgICAgICBjczUwOiAnaHR0cHM6Ly9jczUwLmhhcnZhcmQuZWR1LydcbiAgICB9O1xuXG4gICAgJHNjb3BlLnZpZXdDbGFzcyA9ICdhbmltYXRlLWhvbWUnO1xuXG59XSk7XG4iLCIvKipcbiAqIENyZWF0ZWQgYnkgaGFsbmluZyBvbiAyMy4wOC4xNi5cbiAqL1xuXCJ1c2Ugc3RyaWN0XCI7XG5hcHAuY29udHJvbGxlcignTWFpbkNvbnRyb2xsZXInLCBbJyRzY29wZScsIGZ1bmN0aW9uICgkc2NvcGUpIHtcbiAgICAkc2NvcGUuaW5pdEpxdWVyeSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIHdpbmRvd1dpZHRoID0gJCh3aW5kb3cpLndpZHRoKCk7XG4gICAgICAgIHZhciB3aW5kb3dIZWlnaHQgPSAkKHdpbmRvdykuaGVpZ2h0KCk7XG4gICAgICAgIHZhciBzY3JvbGxDb3VudGVyID0gMDtcbiAgICAgICAgdmFyICRsYXN0U2Nyb2xsVG9wID0gMDtcbiAgICAgICAgdmFyICRpc01vYmlsZSA9IG51bGw7XG5cbiAgICAgICAgJGlzTW9iaWxlID0gbmF2aWdhdG9yLnVzZXJBZ2VudC5tYXRjaCgvKGlQaG9uZXxpUG9kfGlQYWR8QW5kcm9pZHxCbGFja0JlcnJ5KS8pO1xuXG5cbiAgICAgICAgdmFyICRteWVsZW1lbnQgPSAkKCcubWFpbicpO1xuXG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJzY3JvbGxcIiwgbXlTY3JvbGwsIGZhbHNlKTtcbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcInRvdWNobW92ZVwiLCBteVNjcm9sbCwgZmFsc2UpO1xuXG4gICAgICAgICRteWVsZW1lbnQuc2Nyb2xsKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIG15U2Nyb2xsKCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIG15TWFpblJlc2l6ZXMoKTtcbiAgICAgICAgc2V0SGVhZGVycygpO1xuICAgICAgICB3aW5kb3dSZXNpemUoKTtcbiAgICAgICAgaW1hZ2VaZXNpcmUoKTtcblxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiByZXNpemUgbWFpbiBpbWFnZSBkZXBlbmRzIHdpbmRvd1xuICAgICAgICAgKi9cbiAgICAgICAgZnVuY3Rpb24gaW1hZ2VaZXNpcmUoKSB7XG4gICAgICAgICAgICBpZiAoJChcIi5qdW1ib3Ryb21cIikubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgICRteWVsZW1lbnQuZmluZChcIi5qdW1ib3Ryb21cIikuY3NzKHtcImhlaWdodFwiOiB3aW5kb3dIZWlnaHR9KTtcbiAgICAgICAgICAgICAgICBmYW5jeVRpdGxlSW50cm8oKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKCQoXCIuc2tpbGxzXCIpLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICB3aW5kb3cuc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICRteWVsZW1lbnQuYWRkQ2xhc3MoXCJpbml0XzJcIik7XG4gICAgICAgICAgICAgICAgfSwgMTUwKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKCQoXCIucHJvamVjdHNcIikubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgIHdpbmRvdy5zZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgJG15ZWxlbWVudC5hZGRDbGFzcyhcImluaXRfMlwiKTtcbiAgICAgICAgICAgICAgICB9LCAxNTApO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIHJlc2l6ZSBtYWluIGhlaWdodCBjb250YWluZXIgZm9lIHNjcm9sbCBkZXBlbmQgd2luZG93XG4gICAgICAgICAqL1xuICAgICAgICBmdW5jdGlvbiBteU1haW5SZXNpemVzKCkge1xuICAgICAgICAgICAgLy9tYWluIHJlc2l6ZXNcbiAgICAgICAgICAgIHdpbmRvd1dpZHRoID0gJCh3aW5kb3cpLndpZHRoKCk7XG4gICAgICAgICAgICB3aW5kb3dIZWlnaHQgPSAkKHdpbmRvdykuaGVpZ2h0KCk7XG5cbiAgICAgICAgICAgICRteWVsZW1lbnQuY3NzKCdoZWlnaHQnLCB3aW5kb3dIZWlnaHQgKyAxKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBmYW5jeSB0aXRsZSBpbiBtYWluIHBhZ2VcbiAgICAgICAgICovXG4gICAgICAgIGZ1bmN0aW9uIGZhbmN5VGl0bGVJbnRybygpIHtcbiAgICAgICAgICAgICRteWVsZW1lbnQuZmluZChcIi5qdW1ib3Ryb21cIikuYWRkQ2xhc3MoXCJpbml0XzFcIik7XG4gICAgICAgICAgICB3aW5kb3cuc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgJG15ZWxlbWVudC5maW5kKFwiLmp1bWJvdHJvbVwiKS5hZGRDbGFzcyhcImluaXRfMlwiKTtcbiAgICAgICAgICAgIH0sIDUwMCk7XG4gICAgICAgIH1cblxuICAgICAgICAvKipcbiAgICAgICAgICogY2hhbmdlIGhlYWRlciBkZXBlbmQgd2hhdCBiYWNrZ3JvdW5kIGludGVyYWN0aXZlXG4gICAgICAgICAqL1xuICAgICAgICBmdW5jdGlvbiBteVNjcm9sbCgpIHtcbiAgICAgICAgICAgIHZhciBzdCA9ICRteWVsZW1lbnQuc2Nyb2xsVG9wKCk7XG5cbiAgICAgICAgICAgIC8vdXAgYW5kIGRvd24gc2Nyb2xsIGZvciB0aGUgaGVhZGVyXG4gICAgICAgICAgICBpZiAoc3QgPiAkbGFzdFNjcm9sbFRvcCkge1xuICAgICAgICAgICAgICAgIC8vIGRvd25zY3JvbGwgY29kZVxuICAgICAgICAgICAgICAgIGlmIChzdCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCQoJy5oZWFkZXInKS5oYXNDbGFzcygnaW4nKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2Nyb2xsQ291bnRlcisrO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHNjcm9sbENvdW50ZXIgPj0gMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICQoJy5oZWFkZXInKS5yZW1vdmVDbGFzcygnaW4nKS5hZGRDbGFzcygnb3V0Jyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2Nyb2xsQ291bnRlciA9IDA7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAoJG15ZWxlbWVudC5zY3JvbGxUb3AoKSA9PSAkKGRvY3VtZW50KS5oZWlnaHQoKSAtICQod2luZG93KS5oZWlnaHQoKSkge1xuICAgICAgICAgICAgICAgICAgICAkKCcuaGVhZGVyJykucmVtb3ZlQ2xhc3MoJ291dCcpLmFkZENsYXNzKCdpbicpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBpZiAoJCgnLmhlYWRlcicpLmhhc0NsYXNzKCdvdXQnKSkge1xuICAgICAgICAgICAgICAgICAgICBzY3JvbGxDb3VudGVyKys7XG4gICAgICAgICAgICAgICAgICAgIGlmIChzY3JvbGxDb3VudGVyID49IDMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICQoJy5oZWFkZXInKS5yZW1vdmVDbGFzcygnb3V0JykuYWRkQ2xhc3MoJ2luJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBzY3JvbGxDb3VudGVyID0gMDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgICRsYXN0U2Nyb2xsVG9wID0gc3Q7XG5cbiAgICAgICAgICAgIGlmICghfndpbmRvdy5sb2NhdGlvbi5ocmVmLmluZGV4T2YoJ3NraWxscycpXG4gICAgICAgICAgICAgICAgJiYgIX53aW5kb3cubG9jYXRpb24uaHJlZi5pbmRleE9mKCdwcm9qZWN0cycpXG4gICAgICAgICAgICAgICAgJiYgIX53aW5kb3cubG9jYXRpb24uaHJlZi5pbmRleE9mKCdjb250YWN0JylcbiAgICAgICAgICAgICYmICF+d2luZG93LmxvY2F0aW9uLmhyZWYuaW5kZXhPZigndGltZXInKSkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHdpbmRvdy5sb2NhdGlvbi5ocmVmKTtcbiAgICAgICAgICAgICAgICBpZiAod2luZG93V2lkdGggPiAxMjAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciByZXZlcnRDb2xvciA9IHdpbmRvd0hlaWdodCAtIDQwO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciByZXZlcnRDb2xvciA9IHdpbmRvd0hlaWdodCAvIDM7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmICgkbXllbGVtZW50LnNjcm9sbFRvcCgpID4gcmV2ZXJ0Q29sb3IpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCQoXCIuaGVhZGVyXCIpLmhhc0NsYXNzKCd3aGl0ZScpKVxuICAgICAgICAgICAgICAgICAgICAgICAgJChcIi5oZWFkZXJcIikucmVtb3ZlQ2xhc3MoJ3doaXRlJykuYWRkQ2xhc3MoJ2JsYWNrJyk7XG4gICAgICAgICAgICAgICAgICAgIGlmICgkKFwiLmhlYWRlclwiKS5oYXNDbGFzcygndHJhbnNwYXJlbnQnKSlcbiAgICAgICAgICAgICAgICAgICAgICAgICQoXCIuaGVhZGVyXCIpLnJlbW92ZUNsYXNzKCd0cmFuc3BhcmVudCcpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICgkbXllbGVtZW50LmZpbmQoXCIuZnVsbC1pbWFnZVwiKS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoJChcIi5oZWFkZXJcIikuaGFzQ2xhc3MoJ2JsYWNrJykpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJChcIi5oZWFkZXJcIikucmVtb3ZlQ2xhc3MoJ2JsYWNrJykuYWRkQ2xhc3MoJ3doaXRlJyk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoJChcIi5oZWFkZXJcIikuaGFzQ2xhc3MoJ2JsYWNrJykpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJChcIi5oZWFkZXJcIikuYWRkQ2xhc3MoJ3RyYW5zcGFyZW50Jyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJldmVydENvbG9yID0gNjA7XG4gICAgICAgICAgICAgICAgaWYgKCRteWVsZW1lbnQuc2Nyb2xsVG9wKCkgPiByZXZlcnRDb2xvcikge1xuICAgICAgICAgICAgICAgICAgICBpZiAoJChcIi5oZWFkZXJcIikuaGFzQ2xhc3MoJ3RyYW5zcGFyZW50JykpXG4gICAgICAgICAgICAgICAgICAgICAgICAkKFwiLmhlYWRlclwiKS5yZW1vdmVDbGFzcygndHJhbnNwYXJlbnQnKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBpZiAoJChcIi5oZWFkZXJcIikuaGFzQ2xhc3MoJ2JsYWNrJykpXG4gICAgICAgICAgICAgICAgICAgICAgICAkKFwiLmhlYWRlclwiKS5hZGRDbGFzcygndHJhbnNwYXJlbnQnKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvKipcbiAgICAgICAgICogc2V0IGhlYWRlciBjbGFzcyBkZXBlbmQgd2hhdCBpcyBiYWNrZ3JvdW5kXG4gICAgICAgICAqL1xuICAgICAgICBmdW5jdGlvbiBzZXRIZWFkZXJzKCkge1xuICAgICAgICAgICAgaWYgKCRteWVsZW1lbnQuZmluZChcIi5mdWxsLWltYWdlXCIpLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICBpZiAoJChcIi5oZWFkZXJcIikuaGFzQ2xhc3MoJ2JsYWNrJykpXG4gICAgICAgICAgICAgICAgICAgICQoXCIuaGVhZGVyXCIpLnJlbW92ZUNsYXNzKCdibGFjaycpLmFkZENsYXNzKCd3aGl0ZScpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBpZiAoJChcIi5oZWFkZXJcIikuaGFzQ2xhc3MoJ3doaXRlJykpXG4gICAgICAgICAgICAgICAgICAgICQoXCIuaGVhZGVyXCIpLnJlbW92ZUNsYXNzKCd3aGl0ZScpLmFkZENsYXNzKCdibGFjaycpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoJChcIi5oZWFkZXJcIikuaGFzQ2xhc3MoJ2JsYWNrJykpXG4gICAgICAgICAgICAgICAgJChcIi5oZWFkZXJcIikuYWRkQ2xhc3MoJ3RyYW5zcGFyZW50Jyk7XG5cbiAgICAgICAgICAgICQoJy5oZWFkZXInKS5yZW1vdmVDbGFzcygnb3V0JykuYWRkQ2xhc3MoJ2luJyk7XG4gICAgICAgICAgICAvKmlmKCAkaXNNb2JpbGUgIT0gbnVsbCApe1xuICAgICAgICAgICAgICQoJ2JvZHknKS5hZGRDbGFzcygnbW9iaWxlLW5vLWhvdmVycy1kdWRlJyk7XG4gICAgICAgICAgICAgJCgnLmhlYWRlcicpLnJlbW92ZUNsYXNzKCdvdXQnKS5hZGRDbGFzcygnaW4nKTtcbiAgICAgICAgICAgICB9Ki9cbiAgICAgICAgfVxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiByZXNpemUgYWxsIGlmIHdpbmRvdyByZXNpemUgdXNlclxuICAgICAgICAgKi9cbiAgICAgICAgZnVuY3Rpb24gd2luZG93UmVzaXplKCkge1xuICAgICAgICAgICAgJCh3aW5kb3cpLnJlc2l6ZShmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgaWYgKCQod2luZG93KS53aWR0aCgpICE9IHdpbmRvd1dpZHRoIHx8ICQod2luZG93KS5oZWlnaHQgIT0gd2luZG93SGVpZ2h0KSB7XG4gICAgICAgICAgICAgICAgICAgIG15TWFpblJlc2l6ZXMoKTtcbiAgICAgICAgICAgICAgICAgICAgaW1hZ2VaZXNpcmUoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH07XG5cbn1dKTsiLCIvKipcbiAqIENyZWF0ZWQgYnkgaGFsbmluZyBvbiAyOS4wOC4xNi5cbiAqL1xuXCJ1c2Ugc3RyaWN0XCI7XG5hcHAuY29udHJvbGxlcignUHJvamVjdENvbnRyb2xsZXInLCBbJyRzY29wZScsIGZ1bmN0aW9uKCRzY29wZSkge1xuICAgICRzY29wZS52aWV3Q2xhc3MgPSAnYW5pbWF0ZS1wcm9qZWN0cyc7XG4gICAgJHNjb3BlLnByb2plY3RzID0gW1xuICAgICAgICAkc2NvcGUuZmlyc3RSb3cgPSBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgaHJlZjogJ2h0dHA6Ly9tYWtld2Vhci5jbHViJyxcbiAgICAgICAgICAgICAgICBzcmM6ICcuLi9wdWJsaWMvaW1nL213MS5wbmcnLFxuICAgICAgICAgICAgICAgIGRlc2M6ICfQmNC90YLQtdGA0L3QtdGCINC80LDQs9Cw0LfQuNC9INC+0LTQtdC20LTRiyDQtNC70Y8g0L7Qv9GC0L7QstGL0YUg0Lgg0YDQvtC30L3QuNGH0L3Ri9GFINC/0L7QutGD0L/QsNGC0LXQu9C10LkuJyArXG4gICAgICAgICAgICAgICAgJ9CS0YDQtdC80Y8g0YDQsNCx0L7RgtGLINC90LDQtCDQv9GA0L7QtdC60YLQvtC8IDkg0LzQtdGB0Y/RhtC10LIuINCS0YvQv9C+0LvQvdGP0Lsg0YDQsNC30L3QvtC+0LHRgNCw0LfQvdGL0LUg0LfQsNC00LDRh9C4INC+0YIg0LLQtdGA0YHRgtC60Lgg0LTQviDRgNCw0LfRgNCw0LHQvtGC0LrQuCDQv9Cw0YDRgdC10YDQsCDQvdCwIFBIUC4nK1xuICAgICAgICAgICAgICAgICfQn9GA0LjQvtCx0YDQtdC7INC+0L/Ri9GCINCyINCy0LXRgNGB0YLQutC1LCBqUXVlcnksIEJvb3RzdHJhcCwgUEhQLCBNeVNRTCwgR3VscCwgR2l0INC4INC00YAuJ1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBocmVmOiAnIycsXG4gICAgICAgICAgICAgICAgc3JjOiAnLi4vcHVibGljL2ltZy9lbXB0eS5wbmcnLFxuICAgICAgICAgICAgICAgIGRlc2M6ICdDb21pbmcgc29vbidcbiAgICAgICAgICAgIH1cbiAgICAgICAgXSxcbiAgICAgICAgJHNjb3BlLnNlY29uZFJvdyA9IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBocmVmOiAnIycsXG4gICAgICAgICAgICAgICAgc3JjOiAnLi4vcHVibGljL2ltZy9lbXB0eS5wbmcnLFxuICAgICAgICAgICAgICAgIGRlc2M6ICdDb21pbmcgc29vbidcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgaHJlZjogJyMnLFxuICAgICAgICAgICAgICAgIHNyYzogJy4uL3B1YmxpYy9pbWcvZW1wdHkucG5nJyxcbiAgICAgICAgICAgICAgICBkZXNjOiAnQ29taW5nIHNvb24nXG4gICAgICAgICAgICB9XG4gICAgICAgIF0sXG4gICAgICAgICRzY29wZS50cmVlUm93ID0gW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGhyZWY6ICcjJyxcbiAgICAgICAgICAgICAgICBzcmM6ICcuLi9wdWJsaWMvaW1nL2VtcHR5LnBuZycsXG4gICAgICAgICAgICAgICAgZGVzYzogJ0NvbWluZyBzb29uJ1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBocmVmOiAnIycsXG4gICAgICAgICAgICAgICAgc3JjOiAnLi4vcHVibGljL2ltZy9lbXB0eS5wbmcnLFxuICAgICAgICAgICAgICAgIGRlc2M6ICdDb21pbmcgc29vbidcbiAgICAgICAgICAgIH1cbiAgICAgICAgXSxcbiAgICBdXG59XSk7IiwiLyoqXG4gKiBDcmVhdGVkIGJ5IGhhbG5pbmcgb24gMjkuMDguMTYuXG4gKi9cblwidXNlIHN0cmljdFwiO1xuYXBwLmNvbnRyb2xsZXIoJ1NraWxsc0NvbnRyb2xsZXInLCBbJyRzY29wZScsIGZ1bmN0aW9uKCRzY29wZSkge1xuICAgICRzY29wZS52aWV3Q2xhc3MgPSAnYW5pbWF0ZS1za2lsbHMnO1xuICAgICRzY29wZS5mcm9udEVuZD0gW1xuICAgICAgICAkc2NvcGUuZmlyc3QgPSBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgbmFtZTogJ0hUTUwgJiBDU1MnLFxuICAgICAgICAgICAgICAgIGljb246ICdodG1sJ1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBuYW1lOiAnU0FTUyAmIExFU1MnLFxuICAgICAgICAgICAgICAgIGljb246ICdsZXNzJ1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBuYW1lOiAnQm9vdHN0cmFwIDMnLFxuICAgICAgICAgICAgICAgIGljb246ICdib290J1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBuYW1lOiAnSlMnLFxuICAgICAgICAgICAgICAgIGljb246ICdqcydcbiAgICAgICAgICAgIH1cblxuICAgICAgICBdLFxuICAgICAgICAkc2NvcGUuc2Vjb25kID0gW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIG5hbWU6ICdqUXVlcnknLFxuICAgICAgICAgICAgICAgIGljb246ICdqcXVlcnknXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIG5hbWU6ICdBbmd1bGFySlMnLFxuICAgICAgICAgICAgICAgIGljb246ICdhbmcnXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIG5hbWU6ICdHdWxwJyxcbiAgICAgICAgICAgICAgICBpY29uOiAnZ3VscCdcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgbmFtZTogJ2pRdWVyeS1VSScsXG4gICAgICAgICAgICAgICAgaWNvbjogJ2pxLXVpJ1xuICAgICAgICAgICAgfVxuICAgICAgICBdLFxuICAgIF1cblxuICAgICRzY29wZS5iYWNrRW5kID0gW1xuICAgICAgICAkc2NvcGUuZmlyc3QgPSBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgbmFtZTogJ1BIUCArIE9PUCcsXG4gICAgICAgICAgICAgICAgaWNvbjogJ3BocCdcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgbmFtZTogJ1NRTCcsXG4gICAgICAgICAgICAgICAgaWNvbjogJ3NxbCdcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgbmFtZTogJ01WQycsXG4gICAgICAgICAgICAgICAgaWNvbjogJ212YydcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgbmFtZTogJ0NvbXBvc2VyJyxcbiAgICAgICAgICAgICAgICBpY29uOiAnY29tcG9zZXInXG4gICAgICAgICAgICB9XG4gICAgICAgIF1cbiAgICBdXG5cbiAgICAkc2NvcGUub3RoZXIgPSBbXG4gICAgICAgICRzY29wZS5maXJzdCA9IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBuYW1lOiAnR2l0JyxcbiAgICAgICAgICAgICAgICBpY29uOiAnZ2l0J1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBuYW1lOiAnQXp1cmUnLFxuICAgICAgICAgICAgICAgIGljb246ICdhenVyZSdcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgbmFtZTogJ0Npc2NvJyxcbiAgICAgICAgICAgICAgICBpY29uOiAnY2lzY28nXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIG5hbWU6ICdFbmdsaXNoIHByZS1pbnRlcm1lZGlhdGUnLFxuICAgICAgICAgICAgICAgIGljb246ICdlbmdsaXNoJ1xuICAgICAgICAgICAgfVxuICAgICAgICBdXG4gICAgXVxufV0pOyIsIi8qKlxuICogQ3JlYXRlZCBieSBoYWxuaW5nIG9uIDAyLjA5LjE2LlxuICovXG5cInVzZSBzdHJpY3RcIjtcbmFwcC5jb250cm9sbGVyKCdUaW1lckNvbnRyb2xsZXInLCBmdW5jdGlvbiAoJHNjb3BlLCAkdGltZW91dCkge1xuICAgIHZhciB0aW1lciA9IG51bGw7XG4gICAgdmFyIGJlZ2luRGF0ZSA9IG51bGw7XG4gICAgdmFyIHN0b3BEYXRlID0gbnVsbDtcbiAgICB2YXIgc3RhcnREYXRlID0gbnVsbDtcbiAgICB2YXIgJHJlc3VsdCA9IGFuZ3VsYXIuZWxlbWVudChkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3Jlc3VsdFwiKSk7XG4gICAgdmFyICRzdGFydFN0b3BCdXR0b24gPSBhbmd1bGFyLmVsZW1lbnQoZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNzdG9wLXN0YXJ0X19idG5cIikpO1xuICAgIHZhciAkc3BsaXRCdXR0b24gPSBhbmd1bGFyLmVsZW1lbnQoZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNzcGxpdC1idG5cIikpO1xuXG4gICAgdmFyIHNwbGl0ID0ge1xuICAgICAgICBtaW51dGVzOiAwLFxuICAgICAgICBzZWNvbmRzOiAwLFxuICAgICAgICBtaWxsaXNlY29uZDogMCxcbiAgICAgICAgbWlsbGlzZWNvbmRTaG93OiAwXG4gICAgfTtcblxuICAgICRzY29wZS5jYWxjdWxhdGUgPSB7XG4gICAgICAgIG1pbnV0ZXM6IDAsXG4gICAgICAgIHNlY29uZHM6IDAsXG4gICAgICAgIG1pbGxpc2Vjb25kOiAwLFxuICAgICAgICBtaWxsaXNlY29uZFNob3c6IDBcbiAgICB9O1xuXG4gICAgJHNjb3BlLnN0b3BTdGFydE1hcmsgPSAwO1xuICAgICRzY29wZS5idXR0b25UZXh0T2JqID0ge1xuICAgICAgICBzdGFydDogJ1N0YXJ0JyxcbiAgICAgICAgc3RvcDogJ1N0b3AnLFxuICAgICAgICBzcGxpdDogJ1NwbGl0JyxcbiAgICAgICAgcmVzZXQ6ICdSZXNldCdcbiAgICB9O1xuICAgICRzY29wZS5idXR0b25UZXh0ID0gJHNjb3BlLmJ1dHRvblRleHRPYmouc3RhcnQ7XG4gICAgJHNjb3BlLmJvcmRlckNvbG9yID0ge1xuICAgICAgICByZWQ6ICcjYzkzMDJjJyxcbiAgICAgICAgYmx1ZTogJyMzMWIwZDUnXG4gICAgfTtcblxuICAgIHZhciB1cGRhdGVDb3VudGVyID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAkc2NvcGUuY2FsY3VsYXRlLm1pbGxpc2Vjb25kID0gKHN0b3BEYXRlID09PSBudWxsKSA/IERhdGUubm93KCkgLSBiZWdpbkRhdGUgOiBEYXRlLm5vdygpIC0gKChzdGFydERhdGUgLSBzdG9wRGF0ZSkgKyBiZWdpbkRhdGUpO1xuICAgICAgICAkc2NvcGUuY2FsY3VsYXRlLnNlY29uZHMgPSBNYXRoLmZsb29yKCgkc2NvcGUuY2FsY3VsYXRlLm1pbGxpc2Vjb25kIC8gMTAwMCkgJSA2MCk7XG4gICAgICAgICRzY29wZS5jYWxjdWxhdGUubWludXRlcyA9IE1hdGguZmxvb3IoKCRzY29wZS5jYWxjdWxhdGUubWlsbGlzZWNvbmQgLyAxMDAwIC8gNjApICUgNjApO1xuICAgICAgICAkc2NvcGUuY2FsY3VsYXRlLm1pbGxpc2Vjb25kU2hvdyA9ICRzY29wZS5jYWxjdWxhdGUubWlsbGlzZWNvbmQgLSAkc2NvcGUuY2FsY3VsYXRlLnNlY29uZHMgKiAxMDAwO1xuXG4gICAgICAgIHRpbWVyID0gJHRpbWVvdXQodXBkYXRlQ291bnRlciwgMSk7XG4gICAgfTtcblxuICAgIHZhciBhZGRFbGVtZW50ID0gZnVuY3Rpb24gKGJ1dHRvblRleHRPYmpJbmRleCwgc2hvd0RhdGUpIHtcbiAgICAgICAgdmFyIG5ld1AgPSBhbmd1bGFyLmVsZW1lbnQoXCI8cD5cIik7XG4gICAgICAgIHZhciBib3JkZXJDb2xvciA9IChidXR0b25UZXh0T2JqSW5kZXggPT09ICdTdG9wJykgPyAkc2NvcGUuYm9yZGVyQ29sb3IucmVkIDogJHNjb3BlLmJvcmRlckNvbG9yLmJsdWU7XG5cbiAgICAgICAgbmV3UC5jc3Moe2JvcmRlcjogXCIxcHggc29saWRcIiArIGJvcmRlckNvbG9yfSk7XG5cbiAgICAgICAgJHJlc3VsdC5hcHBlbmQobmV3UCk7XG4gICAgICAgIG5ld1AudGV4dChidXR0b25UZXh0T2JqSW5kZXggKyAnIC0gJyArIHNob3dEYXRlLm1pbnV0ZXMgKyAnIG0gOiAnICsgc2hvd0RhdGUuc2Vjb25kcyArICcgcyA6ICcgKyBzaG93RGF0ZS5taWxsaXNlY29uZFNob3cgKyAnIG1zJyk7XG4gICAgfVxuXG4gICAgdmFyIHN0b3BUaW1lciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgJHRpbWVvdXQuY2FuY2VsKHRpbWVyKTtcbiAgICAgICAgdGltZXIgPSBudWxsO1xuICAgICAgICBzdG9wRGF0ZSArPSBEYXRlLm5vdygpIC0gYmVnaW5EYXRlO1xuXG4gICAgICAgICRzdGFydFN0b3BCdXR0b25cbiAgICAgICAgICAgIC5yZW1vdmVDbGFzcygnYnRuLWRhbmdlcicpXG4gICAgICAgICAgICAuYWRkQ2xhc3MoJ2J0bi1zdWNjZXNzJyk7XG4gICAgICAgICRzY29wZS5zdG9wU3RhcnRNYXJrID0gMDtcbiAgICAgICAgJHNjb3BlLmJ1dHRvblRleHQgPSAkc2NvcGUuYnV0dG9uVGV4dE9iai5zdGFydDtcbiAgICAgICAgJHNwbGl0QnV0dG9uLmF0dHIoJ2Rpc2FibGVkJywgXCJkaXNhYmxlZFwiKTtcbiAgICB9XG5cbiAgICAkc2NvcGUudG9nZ2xlQ291bnRlciA9IGZ1bmN0aW9uIChzdG9wU3RhcnRNYXJrKSB7XG4gICAgICAgIGlmIChzdG9wU3RhcnRNYXJrKSB7XG4gICAgICAgICAgICBzdG9wVGltZXIoKTtcbiAgICAgICAgICAgIGFkZEVsZW1lbnQoJHNjb3BlLmJ1dHRvblRleHRPYmouc3RvcCwgJHNjb3BlLmNhbGN1bGF0ZSk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoYmVnaW5EYXRlID09PSBudWxsKSB7XG4gICAgICAgICAgICBiZWdpbkRhdGUgPSBEYXRlLm5vdygpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRpbWVyID09PSBudWxsKSB7XG4gICAgICAgICAgICBzdGFydERhdGUgKz0gRGF0ZS5ub3coKSAtIGJlZ2luRGF0ZTtcblxuICAgICAgICAgICAgJHN0YXJ0U3RvcEJ1dHRvblxuICAgICAgICAgICAgICAgIC5yZW1vdmVDbGFzcygnYnRuLXN1Y2Nlc3MnKVxuICAgICAgICAgICAgICAgIC5hZGRDbGFzcygnYnRuLWRhbmdlcicpO1xuXG4gICAgICAgICAgICB1cGRhdGVDb3VudGVyKCk7XG5cbiAgICAgICAgICAgICRzY29wZS5zdG9wU3RhcnRNYXJrID0gMTtcbiAgICAgICAgICAgICRzY29wZS5idXR0b25UZXh0ID0gJHNjb3BlLmJ1dHRvblRleHRPYmouc3RvcDtcbiAgICAgICAgICAgICRzcGxpdEJ1dHRvbi5hdHRyKCdkaXNhYmxlZCcsIFwiXCIpO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgICRzY29wZS5nZXRTcGxpdCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgc3BsaXQubWludXRlcyA9ICRzY29wZS5jYWxjdWxhdGUubWludXRlcyAtIHNwbGl0Lm1pbnV0ZXM7XG4gICAgICAgIHNwbGl0LnNlY29uZHMgPSAkc2NvcGUuY2FsY3VsYXRlLnNlY29uZHMgLSBzcGxpdC5zZWNvbmRzO1xuICAgICAgICBzcGxpdC5taWxsaXNlY29uZCA9ICRzY29wZS5jYWxjdWxhdGUubWlsbGlzZWNvbmQgLSBzcGxpdC5taWxsaXNlY29uZDtcblxuICAgICAgICBhZGRFbGVtZW50KCRzY29wZS5idXR0b25UZXh0T2JqLnNwbGl0LCBzcGxpdCk7XG5cbiAgICAgICAgc3BsaXQubWludXRlcyA9ICRzY29wZS5jYWxjdWxhdGUubWludXRlcztcbiAgICAgICAgc3BsaXQuc2Vjb25kcyA9ICRzY29wZS5jYWxjdWxhdGUuc2Vjb25kcztcbiAgICAgICAgc3BsaXQubWlsbGlzZWNvbmQgPSAkc2NvcGUuY2FsY3VsYXRlLm1pbGxpc2Vjb25kO1xuICAgICAgICBzcGxpdC5taWxsaXNlY29uZFNob3cgPSBzcGxpdC5taWxsaXNlY29uZCAtIHNwbGl0LnNlY29uZHMgKiAxMDAwO1xuICAgIH1cblxuICAgICRzY29wZS5yZXNldCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgc3RvcFRpbWVyKCk7XG5cbiAgICAgICAgYmVnaW5EYXRlID0gbnVsbDtcbiAgICAgICAgc3RhcnREYXRlID0gbnVsbDtcbiAgICAgICAgc3RvcERhdGUgPSBudWxsO1xuXG4gICAgICAgICRzY29wZS5jYWxjdWxhdGUubWlsbGlzZWNvbmQgPSAwO1xuICAgICAgICAkc2NvcGUuY2FsY3VsYXRlLnNlY29uZHMgPSAwO1xuICAgICAgICAkc2NvcGUuY2FsY3VsYXRlLm1pbnV0ZXMgPSAwO1xuICAgICAgICBzcGxpdC5taW51dGVzID0gMDtcbiAgICAgICAgc3BsaXQuc2Vjb25kcyA9IDA7XG4gICAgICAgIHNwbGl0Lm1pbGxpc2Vjb25kID0gMDtcblxuICAgICAgICAkcmVzdWx0LmZpbmQoJ3AnKS5yZW1vdmUoKTtcbiAgICB9XG59KTsiLCIvKipcbiAqIENyZWF0ZWQgYnkgaGFsbmluZyBvbiAyNS4wOC4xNi5cbiAqL1xuYXBwLmRpcmVjdGl2ZSgnbXlGb290ZXInLCBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgcmVzdHJpY3Q6ICdFJyxcbiAgICAgICAgc2NvcGU6IHt9LFxuICAgICAgICB0ZW1wbGF0ZVVybDogJ3B1YmxpYy9qcy9kaXJlY3RpdmVzL2Zvb3Rlci5odG1sJyxcbiAgICAgICAgbGluazogZnVuY3Rpb24gKHNjb3BlKSB7XG4gICAgICAgIH1cbiAgICB9O1xufSk7IiwiLyoqXG4gKiBDcmVhdGVkIGJ5IGhhbG5pbmcgb24gMjUuMDguMTYuXG4gKi9cbmFwcC5kaXJlY3RpdmUoJ25hdmlnYXRpb24nLCBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgcmVzdHJpY3Q6ICdFJyxcbiAgICAgICAgc2NvcGU6IHt9LFxuICAgICAgICB0ZW1wbGF0ZVVybDogJ3B1YmxpYy9qcy9kaXJlY3RpdmVzL25hdi5odG1sJyxcbiAgICAgICAgbGluazogZnVuY3Rpb24gKHNjb3BlKSB7XG4gICAgICAgIH1cbiAgICB9O1xufSk7IiwiLyoqXG4gKiBDcmVhdGVkIGJ5IGhhbG5pbmcgb24gMjMuMDguMTYuXG4gKi9cbmFwcC5kaXJlY3RpdmUoJ3JlYWRNb3JlJywgZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB7XG4gICAgICAgIHJlc3RyaWN0OiAnRScsXG4gICAgICAgIHNjb3BlOiB7fSxcbiAgICAgICAgdGVtcGxhdGVVcmw6ICdwdWJsaWMvanMvZGlyZWN0aXZlcy9yZWFkTW9yZS5odG1sJyxcbiAgICAgICAgbGluazogZnVuY3Rpb24gKHNjb3BlKSB7XG4gICAgICAgICAgICBzY29wZS5yZWFkID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIGRlc3RpbmF0aW9uID0gJCgnLnN0YXJ0X3JlYWRpbmcnKS5vZmZzZXQoKS50b3A7XG4gICAgICAgICAgICAgICAgJCgnLm1haW4nKS5hbmltYXRlKHtzY3JvbGxUb3A6IGRlc3RpbmF0aW9ufSwgNTAwKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG59KTtcblxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
