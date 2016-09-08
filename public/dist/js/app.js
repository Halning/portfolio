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

