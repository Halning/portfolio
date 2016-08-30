/**
 * Created by halning on 23.08.16.
 */
"use strict";
app.controller('MainController', ['$scope', function ($scope) {
    $scope.sayHello = function () {
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

            if (!~window.location.href.indexOf('skills') && !~window.location.href.indexOf('projects') && !~window.location.href.indexOf('contact')) {
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