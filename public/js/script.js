/*************************/
/*   GENERAL VARIABLES
 /*************************/
$isMobile = null;
$lastScrollTop = 0;

var $myelement = null;
var scrollCounter = 0;

var windowWidth = 0,
        windowHeight = 0;


var main = function () {

    windowWidth = $(window).width();
    windowHeight = $(window).height();

    $isMobile = navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry)/);

    $myelement = $('.main');

    mymainresizes();
    setheaders();
    windowresize();
    myresizes();

    document.addEventListener("scroll", myScroll, false);
    document.addEventListener("touchmove", myScroll, false);

    $(".main").scroll(function () {
        myScroll();
    });

    $('body').on("click", '.pjax', function (e) {
        e.preventDefault();
        var url = '';

        url = $(this).attr("href");
        if (url === "index.php") {
            $('#pjax-container').css({opacity: 0.1});
        } else {
            $('#pjax-container').css({paddingLeft: windowWidth / 1.5 + 'px', opacity: 0.1});
        }

        $.pjax({url: url, container: '#pjax-container', fragment: '#pjax-container'});
    });
};

$(document).ready(main);


//pjax
$('#pjax-container')
        .on('pjax:start', function () {
            $(this).animate({opacity: 1, paddingLeft: "0px"}, 1000);
        })
        .on('pjax:end', function () {


            $myelement = $('.main');

            mymainresizes();
            setheaders();
            windowresize();
            myresizes();

            document.addEventListener("scroll", myScroll, false);
            document.addEventListener("touchmove", myScroll, false);

            $(".main").scroll(function () {
                myScroll();
            });
        });



function setheaders() {
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
 *
 *
 * Scroll events
 *
 *
 **/
function myScroll( ) {



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

    if ($myelement.find(".jumbotrom").length > 0) {
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

    //paragraph show
}

/**
 * 
 * @returns {undefined}
 */
function myresizes() {

    if ($(".jumbotrom").length > 0) {
        $myelement.find(".jumbotrom").css({"height": windowHeight});
        fancyTitleIntro();
        setReadMore();
    } 
    if ($(".skils").length > 0) {
        window.setTimeout(function ()
        {
            $myelement.addClass("init_2");
        }, 500);
    }
}


/**
 * 
 * @returns {undefined}
 */
function windowresize() {

    $(window).resize(function () {
        if ($(window).width() != windowWidth || $(window).height != windowHeight) {
            mymainresizes();
            myresizes();
        }
    });
}


/**
 * 
 * @returns {undefined}
 */
function mymainresizes() {
    //main resizes
    windowWidth = $(window).width();
    windowHeight = $(window).height();

    $myelement.css('height', windowHeight + 1);
}

/**
 * 
 * @returns {undefined}
 */
function setReadMore() {
    $myelement.find('.read-more').click(function () {

        destination = $myelement.find('.start_reading').offset().top;
        $myelement.animate({scrollTop: 1000}, 500);

        return false;
    });
}

/**
 * 
 * @returns {undefined}
 */
function fancyTitleIntro() {
    $myelement.find(".jumbotrom").addClass("init_1");
    window.setTimeout(function ()
    {
        $myelement.find(".jumbotrom").addClass("init_2");
    }, 500);
}