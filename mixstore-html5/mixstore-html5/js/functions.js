function resizeMainContent() {
    /* Site content section resizing depending on Left Bar or Right Bar is enabled. */
    var sw = jQuery('#mainContainer .wrapper').width();
    var mcElem = jQuery('#mainContent');
    var lbElem = jQuery('#leftBar');
    var rbElem = jQuery('#rightBar');
    var homeElem = jQuery('section#home');
    var listingElem = jQuery('section#listing0');
    var viewcartElem = jQuery('section#viewCart');
    var checkoutElem = jQuery('section#checkoutSinglePage');
    var blogElem = jQuery('section#blog');
    var lb = (lbElem.length > 0 && lbElem.css("display") != 'none' && lbElem.height() > 15) ? lbElem.outerWidth(true) : 0;
    var rb = (rbElem.length > 0 && rbElem.css("display") != 'none' && rbElem.height() > 15) ? rbElem.outerWidth(true) : 0;
    

    /* Creates mobile/tablet left Slide Menu. */
    var menuLeft = document.getElementById('showSlideMenu'),
        body = document.body;

    mobileMenu.onclick = function () {
        classie.toggle(this, 'active');
        classie.toggle(menuLeft, 'cbp-spmenu-open');
        disableOther('closeSlideMenu');
    };


    function disableOther(button) {
        if (button !== 'closeSlideMenu') {
            classie.toggle(menuLeft, 'disabled');
        }
    }

    var mainContent = $('#mainContent');
    var leftSidebar = $('#leftBar');
    var rightSidebar = $('#rightBar');

    if ( $(leftSidebar).length ) {
        var leftSidebarVisible = true;
    } else {
        var leftSidebarVisible = false;
    }

    if ( $(rightSidebar).length ) {
        var rightSidebarVisible = true;
    } else {
        var rightSidebarVisible = false;
    }

    if ( $(leftSidebar).height() < 15 || $(leftSidebar).css('display') == 'none' ) {
        var leftSidebarVisible = false;
    }

    if ( $(rightSidebar).height() < 15 || $(rightSidebar).css('display') == 'none' ) {
        var rightSidebarVisible = false;
    }

    if ( $(mainContent).length && leftSidebarVisible == true && rightSidebarVisible == true ) {
        $(mainContent).addClass('col-md-6').removeClass('col-md-12');
        $(leftSidebar).addClass('col-md-3').removeClass('col-md-12');
        $(rightSidebar).addClass('col-md-3').removeClass('col-md-12');
    } else if ( $(mainContent).length && leftSidebarVisible == true ) {
        $(mainContent).addClass('col-md-9').removeClass('col-md-12');
        $(leftSidebar).addClass('col-md-3').removeClass('col-md-12');
    } else if ( $(mainContent).length && rightSidebarVisible == true ) {
        $(mainContent).addClass('col-md-9').removeClass('col-md-12');
        $(rightSidebar).addClass('col-md-3').removeClass('col-md-12');
    }

    jQuery('#closeSlideMenu').on('click', function () {
        jQuery('#showSlideMenu').removeClass('cbp-spmenu-open');
    });

    jQuery('#mobileCatMenu').on('click', function () {
        jQuery('#cbp-tm-menu').slideToggle();
    });

    
}

// edit: hide submenu if no subs present
jQuery('ul.subMenu').each(function () {
    if (jQuery(this).has("li").length == 0) {
        jQuery(this).remove();
    }
});

/*!
 * classie - class helper functions
 * from bonzo https://github.com/ded/bonzo
 * 
 * classie.has( elem, 'my-class' ) -> true/false
 * classie.add( elem, 'my-new-class' )
 * classie.remove( elem, 'my-unwanted-class' )
 * classie.toggle( elem, 'my-class' )
 */

/*jshint browser: true, strict: true, undef: true */

(function (window) {

    'use strict';

    // class helper functions from bonzo https://github.com/ded/bonzo

    function classReg(className) {
        return new RegExp("(^|\\s+)" + className + "(\\s+|$)");
    }

    // classList support for class management
    // altho to be fair, the api sucks because it won't accept multiple classes at once
    var hasClass, addClass, removeClass;

    if ('classList' in document.documentElement) {
        hasClass = function (elem, c) {
            return elem.classList.contains(c);
        };
        addClass = function (elem, c) {
            elem.classList.add(c);
        };
        removeClass = function (elem, c) {
            elem.classList.remove(c);
        };
    }
    else {
        hasClass = function (elem, c) {
            return classReg(c).test(elem.className);
        };
        addClass = function (elem, c) {
            if (!hasClass(elem, c)) {
                elem.className = elem.className + ' ' + c;
            }
        };
        removeClass = function (elem, c) {
            elem.className = elem.className.replace(classReg(c), ' ');
        };
    }

    function toggleClass(elem, c) {
        var fn = hasClass(elem, c) ? removeClass : addClass;
        fn(elem, c);
    }

    window.classie = {
        // full names
        hasClass: hasClass,
        addClass: addClass,
        removeClass: removeClass,
        toggleClass: toggleClass,
        // short names
        has: hasClass,
        add: addClass,
        remove: removeClass,
        toggle: toggleClass
    };

})(window);

/* IE Fix for the use of attribute ='placeholder' */
if (!jQuery.support.placeholder) {
    var active = document.activeElement;

    jQuery(':text').focus(function () {
        if (jQuery(this).attr('placeholder') != '' && jQuery(this).val() == jQuery(this).attr('placeholder')) {
            jQuery(this).val('').removeClass('hasPlaceholder');
        }
    }).blur(function () {
        if (jQuery(this).attr('placeholder') != '' && (jQuery(this).val() == '' || jQuery(this).val() == jQuery(this).attr('placeholder'))) {
            jQuery(this).val(jQuery(this).attr('placeholder')).addClass('hasPlaceholder');
        }
    });
    jQuery(':text').blur();

    jQuery(active).focus();
}

resizeMainContent();


/* Mini-Cart grammar fix. */
var noItems = jQuery('#noItems').text();

if (noItems > 1 || noItems == 0) {
    jQuery('#noItemsText').text('Items');
}
else {
    jQuery('#noItemsText').text('Item');
}

/* On the window resize event. */
jQuery(window).resize(function () {

    resizeMainContent();
        
});

/* On the device orientation change event. */
jQuery(window).bind('orientationchange', function (event) {

    resizeMainContent();

});

/* Initiates <select> for Sub-Category & Blog menus at a specified width. */
if (jQuery(window).width() <= 767) {

    jQuery('#subcategoriesBlock .sub-categories-format').each(function () {
        var list = jQuery(this),
        select = jQuery(document.createElement('select')).insertBefore(jQuery(this).hide());

        jQuery('#subcategoriesBlock select').prepend('<option> --- Select Sub-Category ---</option>');

        jQuery('ul > li > div.sub-categories > a:first-child', this).each(function () {
            var target = jQuery(this).attr('target'),
            option = jQuery(document.createElement('option'))
             .appendTo(select)
             .val(this.href)
             .html(jQuery('.name', this).html())
             .click(function () {
             });
        });
        list.remove();
    });

    jQuery('#blog .blogNav ul, #modManufacturer ul').each(function () {
        var list = jQuery(this),
        select = jQuery(document.createElement('select')).insertBefore(jQuery(this).hide());

        jQuery('>li a', this).each(function () {
            var target = jQuery(this).attr('target'),
            option = jQuery(document.createElement('option'))
             .appendTo(select)
             .val(this.href)
             .html(jQuery(this).html())
             .click(function () {
             });
        });
        list.remove();
    });

    jQuery('#blog .blogNav select:eq(0)').prepend('<option value=""> --- Select Category ---</option>');
    jQuery('#blog .blogNav select:eq(1)').prepend('<option value=""> --- Select Recent Posts ---</option>');
    jQuery('#blog .blogNav select:eq(2)').prepend('<option value=""> --- Select Archives ---</option>');

    jQuery('#modManufacturer select:eq(0)').prepend('<option value=""> --- Select A Manufacturer ---</option>');

    jQuery('#blog .blogNav select, #subcategoriesBlock select, #modManufacturer select').change(function() {
        if(jQuery(this).val() != ""){
            window.location.href = jQuery(this).val();
        }
    });
}

if (jQuery(window).width() <= 991) {
    // Sidebar accordion
    $(document).find('.leftBar .block-sidebar,.rightBar .block-sidebar').each(function() {
        var blockSidebar = $(this);
        var contentSidebar = $(blockSidebar).find('.block_content');

        if ($(blockSidebar).hasClass('active')) {
            $(contentSidebar).css({'display': 'block'});
        } else {
            $(contentSidebar).css({'display': 'none'});
        }
    });
    $(document).find('.menu-headers').click(function() {
        var toggleButton = $(this);
        var toggleSection = $(this).parent();
        var toggleContent = $(toggleSection).find('.block_content');

        if ($(toggleSection).hasClass('active')) {
            $(toggleContent).stop(false, true).slideUp(300);
            $(toggleSection).removeClass('active');
        } else {
            $(toggleContent).stop(false, true).slideDown(300);
            $(toggleSection).addClass('active');
        }
    });
}

function processFloatHeader(headerAdd){
    if(headerAdd){
      var mb = 0;
      var intro=0;
      var hideheight =0;    
      hideheight =  $(".top-menu").height() + mb + mb + intro; 

      var hh =  $("header").height() + mb;  
      var updateTopbar = function(){          
          var pos = $(window).scrollTop();
          if( pos > hideheight + $("header").height()){
            $("#mainContainer").css( "padding-top", hh );            
            $(".top-menu").addClass('hidden');
            $("header").addClass( "navbar navbar-fixed-top");
          }else {
            $('#mainContainer').css( "padding-top", 0);
            $(".top-menu").removeClass('hidden');
            $('header').removeClass('navbar-fixed-top');
            $('header').removeClass('navbar');
          } 
       }
      updateTopbar();
    }else{      
      $('#mainContainer').css( "padding-top", 0);
      $(".top-menu").removeClass('hide-bar');
      $('header').removeClass('navbar-fixed-top');
      $('header').removeClass('navbar');
    }
}
function floatHeader(){
    // Float Header 

    $(window).resize(function() {
        if (!$("body").hasClass("keep-header") || $(window).width() <= 990) {
            return;
        }
        if ($(window).width() <= 990) {
            processFloatHeader(0);
        }
        else if ($(window).width() > 990) {
            if ($("body").hasClass("keep-header"))
                processFloatHeader(1);
        }
    })
    $(window).scroll(function(e) {
        if (!$("body").hasClass("keep-header")) return;
        if($(window).width() > 990){
          if ($("body").hasClass("keep-header")) {
                processFloatHeader(1);
          }
        }
    })
}
jQuery(document).ready(function($) { 
    "use strict";
    floatHeader();
    $(document).find('#desktopMenu ul li').each(function() {
        var navItem = $(this);
        var dropdownMenu = $(navItem).find('.subMenu');
        if ( $(dropdownMenu).length ) {
            $(navItem).addClass('has-subMenu');
        }
    });
    /* Carousel for block service*/
    $('.block-service .owl-carousel').each(function(){ 
        $(this).owlCarousel({
            singleItem: true,
            items : 1,
            navigation : false,
            lazyLoad : true,
            itemsDesktop: [1199, 1],
            itemsDesktopSmall: [979, 1],
            itemsTablet: [768, 1],
            itemsTabletSmall: [480, 1],
            itemsMobile: [360, 1],
            autoPlay: 8000 });        
    });
    /* Carousel for block manufacture*/
    $('.block-manufacture .owl-carousel').each(function(){
        $(this).owlCarousel({
            items : 6,
            lazyLoad : true,
            autoPlay: 8000,
            navigation : true,
            itemsDesktop: [1199, 5],
            itemsDesktopSmall: [979, 4],
            itemsTablet: [768, 3],
            itemsTabletSmall: [480, 2],
            itemsMobile: [360, 1],
        }); 
    });
    // Fix slideshow outsite wrapper
    function fullWidthFlexslider(elem) {
        $(elem).appendTo('.fluid-slider-container');
    }

    if ( $('.flexslider').length && $('.fluid-slider-container').length ) {
        var elem = $('.flexslider');
        fullWidthFlexslider(elem);
    }
    // Fix category outsite wrapper
    function fullWidthCategoryfooter(elem) {
        $(elem).appendTo('.fluid-categoryfooter-container');
    }

    if ( $('.category-footer').length && $('.fluid-categoryfooter-container').length ) {
        var elem = $('.category-footer');
        fullWidthCategoryfooter(elem);
    }
    // Fix breadcumbs outsite wrapper
    if ( $(document).find('.fluid-breadcrumbs-container').length ) {
        var displayPageTitleBar = false;
        var pageTitleBarContainer = $('.fluid-breadcrumbs-container');
        var breadcrumbs = $(document).find('.breadcrumbs');

        if ( $(document).find('#blog').length ) {
            // Blog Page
            if ( $('.blog-content-container').children('.blogPost').length > 1 && $(document).find('h3.page_headers').length ) {
                var pageTitle = $(document).find('h3.page_headers').first();
            } else {
                var pageTitle = $(document).find('h1:not(.main-header h1)').first();
            }
        } else {
            // Other pages
            var pageTitle = $(document).find('h1:not(.main-header h1)').first();
        }

        if ( $(pageTitle).length && $(pageTitle).text().length > 0 ) {
            $(pageTitleBarContainer).append('<div class="fluid-breadcrumbs-content"></div>');
            var pageTitleBarInnerContainer = $(pageTitleBarContainer).find('.fluid-breadcrumbs-content');
        }else if($(breadcrumbs).length){
            $(pageTitleBarContainer).append('<div class="fluid-breadcrumbs-content"></div>');
            var pageTitleBarInnerContainer = $(pageTitleBarContainer).find('.fluid-breadcrumbs-content');
        }

        if ( $(pageTitle).length && $(pageTitle).text().length > 0 ) {
            $(pageTitleBarInnerContainer).append('<h1 class="page-title">' + pageTitle.text() + '</h1>');
            if ( $(pageTitle).hasClass('page-header-duplicate') && $(pageTitle).hasClass('blog-title') ) {
                $(pageTitle).after('<h3 class="blog-title">' + pageTitle.text() + '</h3>');
                $(pageTitle).remove();
            } else if ( $(pageTitle).hasClass('page-header-duplicate') ) {
                $(pageTitle).after('<h3 class="page-title">' + pageTitle.text() + '</h3>');
                $(pageTitle).remove();
            } else {
                $(pageTitle).remove();
            }
            var displayPageTitleBar = true;
        }

        if ( $(breadcrumbs).length ) {
            $(pageTitleBarInnerContainer).append('<nav class="breadcrumbs" role="navigation" aria-label="breadcrumbs"><ul></ul></nav>');
            var breadcrumbContainer = $(pageTitleBarContainer).find('.breadcrumbs ul');

            $(breadcrumbs).find('a').each(function(index) {
                var breadcrumbLink = $(this).prop('outerHTML');

                if ( index == 0 ) {
                    $(breadcrumbContainer).append('<li class="breadcrumb">' + breadcrumbLink + ' </li>');
                } else {
                    $(breadcrumbContainer).append(' <li class="breadcrumb">' + breadcrumbLink + ' </li>');
                }
            });

            // Remove empty search breadcrumb on search pages
            if ( $(document).find('section#search').length ) {
                var searchBreadcrumbLink = $(pageTitleBarInnerContainer).find('.breadcrumb:eq(1) > a:empty');
                if ( $(searchBreadcrumbLink).length ) {
                    $(searchBreadcrumbLink).parent().remove();
                }
            }

            $(breadcrumbs).remove();

            var displayPageTitleBar = true;
        }

        if ( displayPageTitleBar == true ) {
            $(pageTitleBarContainer).show();
        }
    }
    
    // Newsletter    
    $(document).find('.select-mailist').each(function() {
        var mailistOptionsContainer = $(this);

        $(mailistOptionsContainer).find('.mailist-option-label').each(function() {
            var mailistOptionToggle = $(this);
            $(mailistOptionToggle).click(function(e) {
                var mailistOptionToggleData = $(this).data('mailist-option');
                if ( $(mailistOptionsContainer).hasClass('active') ) {
                    $(mailistOptionsContainer).removeClass('active');
                } else {
                    $(mailistOptionsContainer).addClass('active');
                }
            });
        });

        $(mailistOptionsContainer).find('.dropdown-menu .nav-link').click(function(e) {
            e.preventDefault();
            var mailistOptionToggleData = $(this).data('mailist-option');

            $(document).find('.mailist-option-label').each(function() {
                var currentData = $(this).data('mailist-option');

                if ( mailistOptionToggleData == currentData ) {
                    $(this).addClass('active');
                } else {
                    $(this).removeClass('active');
                }
            });

            if ( mailistOptionToggleData == 'subscribe' ) {
                $(document).find('.box-radio input[name=subscribe][value=1]').each(function() {
                    $(this).prop('checked', true);
                });
            } else if ( mailistOptionToggleData == 'unsubscribe' ) {
                $(document).find('.box-radio input[name=subscribe][value=0]').each(function() {
                    $(this).prop('checked', true);
                });
            }

            $(mailistOptionsContainer).removeClass('active');
        });
    });
    // Quick View    
    $(document).on('leotheme.toggleQuickviewPopup', function(e, quickviewUrl) {
        var popupContent = $('.popup-container[data-popupid="quickview"] .popup-content');
        var popupId = 'quickview';
        var popupAnimation = 'fade';

        $(popupContent).html('');
        $(popupContent).append('<iframe src="' + quickviewUrl + '" frameborder="0" scrolling="no" class="popup-iframe"></iframe>');

        var popupIframe = $(popupContent).find('iframe.popup-iframe');

        $(popupIframe).iFrameResize({
            resizedCallback: function (messageData) {
                var popupId = 'quickview';
                setTimeout(function() {
                    $(document).trigger('leotheme.popup.resize', [popupId]);
                }, 50);
                setTimeout(function() {
                    $(document).trigger('leotheme.popup.resize', [popupId]);
                }, 500);
            },
            messageCallback: function(messageData) {
                if ( messageData.message.name == 'toggle-quickview-popup' ) {
                    // Close the current popup
                    var closepopupId = $('.popup-container.active').data('popupid');
                    var closepopupAnimation = 'fade';
                    var closepopupContainer = true;
                    var closepopupBackdrop = true;
                    $(document).trigger('leotheme.popup.close', [closepopupId, closepopupAnimation, closepopupContainer, closepopupBackdrop]);

                    setTimeout(function() {
                        // Open the new popup
                        var popupUrl = messageData.message.value;
                        $(document).trigger('leotheme.toggleQuickviewPopup', [popupUrl]);
                    }, 650);
                }

                if ( messageData.message.name == 'scroll-popup' ) {
                    // Scroll popup
                    var popupScrollTop = messageData.message.value;

                    var popupOffsetTop = $('.popup-container[data-popupid="quickview"] .popup-wrapper').offset().top;
                    var popupScrollTop = popupScrollTop + popupOffsetTop;

                    $('html, body').animate({
                        scrollTop: popupScrollTop
                    }, 750);
                }

                if ( messageData.message.name == 'add-to-cart' ) {
                    var addtocartUrl = messageData.message.value;
                    window.location = addtocartUrl;
                }
            }
        });

        $(document).trigger('leotheme.popup.open', [popupId, popupAnimation]);
    });

    $(document).find('.product-container .btn-quickview').click(function(e) {
        if ( !$('.popup-container[data-popupid="quickview"]').length ) {
            return;
        }

        e.preventDefault();

        var quickviewUrl = $(this).data('quickview-url');
        $(document).trigger('leotheme.toggleQuickviewPopup', [quickviewUrl]);
    });

    // =============================================================================
    // Newsletter Popup
    // =============================================================================
    $(window).load(function() {        
        initNewsletterPopup();        
    });
    function initNewsletterPopup() {
        if ( $('.popup-container[data-popupid="newsletter"]').length ) {
            if ( $.cookie('popupNewsletterStatus') != 'closed' ) {
                var date = new Date();
                var minutes = 60;
                date.setTime(date.getTime() + (minutes * 60 * 1000));
                $.cookie('popupNewsletterStatus', 'open', { expires: date, path: '/' });
            }
        }

        setTimeout(function() {
            // Open newsletter popup if no other popups are open
            if ( !$('.popup-container.active').length ) {
                showNewsletterPopup();
            }
        }, 500);
    }
    function showNewsletterPopup() {
        if ( $('.popup-container[data-popupid="newsletter"]').length && $.cookie('popupNewsletterStatus') == 'open' ) {
            var popupId = 'newsletter';
            var popupAnimation = 'fade';
            $(document).trigger('leotheme.popup.open', [popupId, popupAnimation]);

            setTimeout(function() {
                var date = new Date();
                var minutes = 60;
                date.setTime(date.getTime() + (minutes * 60 * 1000));
                $.cookie('popupNewsletterStatus', 'closed', { expires: date, path: '/' });
            }, 1000);
        }
    }

    $(document).on('leotheme.initJsQtyButtons', function(e) {
        $(document).find('.apQty').each(function() {
            var qtyBtnWrapper = $(this);            
            $(document).find('.jsQtyBtn').each(function() {
                $(this).on('click.leotheme.initqtybtn', function () {
                    var qtyButton = $(this);
                    var qtybuttonAmount = $(qtyButton).data('action');
                    var qtyInput = $(qtyButton).closest('.apQty').find("input[type='text']");
                    var qtyinputValue = parseInt($(qtyInput).val()) || 1;

                    if (qtyinputValue < 1) {
                        var qtyinputValue = 1;
                    }

                    if ( qtybuttonAmount == 'inc' ) {
                        $(qtyInput).val((qtyinputValue + 1));
                    } else {
                        if (qtyinputValue > 1) {
                            $(qtyInput).val((qtyinputValue - 1));
                        } else {
                            $(qtyInput).val(1);
                        }
                    }
                });
            });
        });
    });

    $(document).trigger('leotheme.initJsQtyButtons', []);

    $(document).on('leotheme.popup.resize', function(e, popupId) {
        var popupContainer = $(document).find('.popup-container[data-popupid="'+popupId+'"]');
        var windowHeight = $(window).height();
        var popupcontainerHeight = popupContainer.outerHeight();

        if ( windowHeight > (popupcontainerHeight + 140) ) {
            $(popupContainer).css({'top': ((windowHeight - popupcontainerHeight) / 2) + 'px'});
        } else {
            $(popupContainer).css({'top': '70px'});
        }
    });

    $(document).on('leotheme.popup.open', function(e, popupId, popupAnimation) {
        $('html, body').animate({
            scrollTop: "0px"
        }, 500);

        var popupContainer = $(document).find('.popup-container[data-popupid="'+popupId+'"]');
        var popupBackdrop = $(document).find('.popup-backdrop');
        var animationDuration = 0;
        var timeoutDuration = 0;

        if ( !popupContainer.length || !popupBackdrop.length ) {
            return false;
        }

        if ( popupAnimation == 'fade' ) {
            var animationDuration = 650;
        }
        
        if ( $('.popup-container.active').length ) {
            var closepopupId = $('.popup-container.active').data('popupid');
            var closepopupAnimation = popupAnimation;
            var closeactivepopupContainer = true;
            var closeactivepopupBackdrop = true;

            if ( popupId != closepopupId ) {
                $(document).trigger('leotheme.popup.close', [closepopupId, closepopupAnimation, closeactivepopupContainer, closeactivepopupBackdrop]);
                var timeoutDuration = (timeoutDuration + animationDuration);
            }
        }

        setTimeout(function() {
            $(popupContainer).addClass('active').fadeIn(animationDuration);
            $(popupBackdrop).addClass('active').fadeIn(animationDuration);

            $(document).trigger('leotheme.popup.resize', [popupId]);
        }, timeoutDuration);
    });

    $(document).on('leotheme.popup.close', function(e, closepopupId, closepopupAnimation, closepopupContainer, closepopupBackdrop) {
        var popupContainer = $(document).find('.popup-container[data-popupid="'+closepopupId+'"]');
        var popupBackdrop = $(document).find('.popup-backdrop');

        if ( closepopupAnimation == 'fade' ) {
            var animationDuration = 650;
        } else {
            var animationDuration = 0;
        }

        if ( closepopupContainer == true ) {
            $(popupContainer).fadeOut(animationDuration).removeClass('active');
        }

        if ( closepopupBackdrop == true ) {
            $(popupBackdrop).fadeOut(animationDuration).removeClass('active');
        }
    });

    $(document).on('leotheme.popup.closeclick', function(e) {
        $(document).find('.popup-container .popup-close').each(function() {
            $(this).off('click.leotheme.popupcloseclick').on('click.leotheme.popupcloseclick', function(e) {
                e.preventDefault();
                var closepopupId = $('.popup-container.active').data('popupid');
                var closepopupAnimation = 'fade';
                var closepopupContainer = true;
                var closepopupBackdrop = true;
                $(document).trigger('leotheme.popup.close', [closepopupId, closepopupAnimation, closepopupContainer, closepopupBackdrop]);
            });
        });
    });

    $(document).trigger('leotheme.popup.closeclick', []);

    $(document).on('leotheme.popup.backdropclick', function(e) {
        $(document).find('.popup-backdrop').each(function() {
            $(this).off('click.leotheme.popupbackdropclick').on('click.leotheme.popupbackdropclick', function(e) {
                e.preventDefault();
                var closepopupId = $('.popup-container.active').data('popupid');
                var closepopupAnimation = 'fade';
                var closepopupContainer = true;
                var closepopupBackdrop = true;
                $(document).trigger('leotheme.popup.close', [closepopupId, closepopupAnimation, closepopupContainer, closepopupBackdrop]);
            });
        });
    });

    $(document).trigger('leotheme.popup.backdropclick', []);

    var leothemeSmartResize = false;
    $(window).resize(function() {
        leothemeSmartResize = true;
    });
    
    if ( $('.view-by').length && $('.view-by').is(':visible') && $.cookie('viewBy') == 'list' ) {
        $('.view-by-grid').removeClass('active');
        $('.view-by-list').addClass('active');
        $('#itemsBlock .productBlockContainer').addClass('display-list-view');
    }

    $(document).find('.view-by .view-by-item').click(function(e){
        if ( $(this).hasClass('active') ) {
            return;
        }

        if ( $(this).hasClass('view-by-list') && !$(this).hasClass('active') ) {
            $(document).find('.view-by-item').removeClass('active');
            $(this).addClass('active');
            $('#itemsBlock .productBlockContainer').addClass('display-list-view');
            $.cookie('viewBy', 'list', { expires: 30, path: '/' });
        } else {
            $(document).find('.view-by-item').removeClass('active');
            $(this).addClass('active');
            $('#itemsBlock .productBlockContainer').removeClass('display-list-view');
            $.cookie('viewBy', 'grid', { expires: 30, path: '/' });
        }
    });

    $(document).find('.productBlockContainer > div:empty').each(function() {
        $(this).remove();
    });
    
    $(document).find('.productBlockContainer').each(function() {
        var productBlockContainer = $(this);
        var containerElement = $(this).parent();
        $(containerElement).find('.productBlockContainer').each(function(index) {
            if ( index >= 1 ) {
                $(this).find('.product-container').each(function() {
                    var productContainer = $(this);
                    $(containerElement).find('.productBlockContainer:eq(0)').append(productContainer);
                });
            }
        });
    });
    $(document).find('.productBlockContainer').each(function() {
        if ( !$(this).children().length > 0 ) {
            $(this).remove();
        }
    });

    setInterval(function() {
        if ( leothemeSmartResize ) {
            leothemeSmartResize = false;

            // Resize Popup
            if ( $('.popup-container.active').length ) {
                var popupId = $('.popup-container.active').data('popupid');
                $(document).trigger('leotheme.popup.resize', [popupId]);
            }

        }
    }, 250);
});
/*!
    SlickNav Responsive Mobile Menu v1.0.1
    (c) 2014 Josh Cope
    licensed under MIT
*/
(function ($, document, window) {
    var
    // default settings object.
    defaults = {
        label: 'MENU',
        duplicate: true,
        duration: 200,
        easingOpen: 'swing',
        easingClose: 'swing',
        closedSymbol: '&#9658;',
        openedSymbol: '&#9660;',
        prependTo: 'body',
        parentTag: 'a',
        closeOnClick: false,
        allowParentLinks: false,
        nestedParentLinks: true,
        showChildren: false,
        init: function () { },
        open: function () { },
        close: function () { }
    },
    mobileMenu = 'slicknav',
    prefix = 'slicknav';

    function Plugin(element, options) {
        this.element = element;

        // jQuery has an extend method which merges the contents of two or
        // more objects, storing the result in the first object. The first object
        // is generally empty as we don't want to alter the default options for
        // future instances of the plugin
        this.settings = $.extend({}, defaults, options);

        this._defaults = defaults;
        this._name = mobileMenu;

        this.init();
    }

    Plugin.prototype.init = function () {
        var $this = this;
        var menu = $(this.element);
        var settings = this.settings;

        // clone menu if needed
        if (settings.duplicate) {
            $this.mobileNav = menu.clone();
            //remove ids from clone to prevent css issues
            $this.mobileNav.removeAttr('id');
            $this.mobileNav.find('*').each(function (i, e) {
                $(e).removeAttr('id');
            });
        }
        else
            $this.mobileNav = menu;

        // styling class for the button
        var iconClass = prefix + '_icon';

        if (settings.label === '') {
            iconClass += ' ' + prefix + '_no-text';
        }

        if (settings.parentTag == 'a') {
            settings.parentTag = 'a href="#"';
        }

        // create menu bar
        $this.mobileNav.attr('class', prefix + '_nav');
        var menuBar = $('<div class="' + prefix + '_menu"></div>');
        $this.btn = $(
            ['<' + settings.parentTag + ' aria-haspopup="true" tabindex="0" class="' + prefix + '_btn ' + prefix + '_collapsed">',
                '<span class="' + prefix + '_menutxt">' + settings.label + '</span>',
                '<span class="' + iconClass + '">',
                    '<i class="icon-m icon-menu">',
                '</span>',
            '</' + settings.parentTag + '>'
            ].join('')
        );
        $(menuBar).append($this.btn);
        $(settings.prependTo).prepend(menuBar);
        menuBar.append($this.mobileNav);

        // iterate over structure adding additional structure
        var items = $this.mobileNav.find('li');
        $(items).each(function () {
            var item = $(this);
            var data = {};
            data.children = item.children('ul').attr('role', 'menu');
            item.data("menu", data);

            // if a list item has a nested menu
            if (data.children.length > 0) {

                // select all text before the child menu
                // check for anchors

                var a = item.contents();
                var containsAnchor = false;

                var nodes = [];
                $(a).each(function () {
                    if (!$(this).is("ul")) {
                        nodes.push(this);
                    }
                    else {
                        return false;
                    }

                    if ($(this).is("a")) {
                        containsAnchor = true;
                    }
                });

                var wrapElement = $('<' + settings.parentTag + ' role="menuitem" aria-haspopup="true" tabindex="-1" class="' + prefix + '_item"/>');

                // wrap item text with tag and add classes unless we are separating parent links
                if ((!settings.allowParentLinks || settings.nestedParentLinks) || !containsAnchor) {
                    var $wrap = $(nodes).wrapAll(wrapElement).parent();
                    $wrap.addClass(prefix + '_row');
                } else
                    $(nodes).wrapAll('<span class="' + prefix + '_parent-link ' + prefix + '_row"/>').parent();

                item.addClass(prefix + '_collapsed');
                item.addClass(prefix + '_parent');

                // create parent arrow. wrap with link if parent links and separating
                /*var arrowElement = $('<span class="' + prefix + '_arrow">' + settings.closedSymbol + '</span>');

                if (settings.allowParentLinks && !settings.nestedParentLinks && containsAnchor)
                    arrowElement = arrowElement.wrap(wrapElement).parent();

                //append arrow
                $(nodes).last().after(arrowElement);*/


            } else if (item.children().length === 0) {
                item.addClass(prefix + '_txtnode');
            }

            // accessibility for links
            item.children('a').attr('role', 'menuitem').click(function (event) {
                //Emulate menu close if set
                //Ensure that it's not a parent
                if (settings.closeOnClick && !$(event.target).parent().closest('li').hasClass(prefix + '_parent'))
                    $($this.btn).click();
            });

            //also close on click if parent links are set
            if (settings.closeOnClick && settings.allowParentLinks) {
                item.children('a').children('a').click(function (event) {
                    //Emulate menu close
                    $($this.btn).click();
                });

                item.find('.' + prefix + '_parent-link a:not(.' + prefix + '_item)').click(function (event) {
                    //Emulate menu close
                    $($this.btn).click();
                });
            }
        });

        // structure is in place, now hide appropriate items
        $(items).each(function () {
            var data = $(this).data("menu");
            if (!settings.showChildren) {
                $this._visibilityToggle(data.children, null, false, null, true);
            }
        });

        // finally toggle entire menu
        $this._visibilityToggle($this.mobileNav, null, false, 'init', true);

        // accessibility for menu button
        $this.mobileNav.attr('role', 'menu');

        // outline prevention when using mouse
        $(document).mousedown(function () {
            $this._outlines(false);
        });

        $(document).keyup(function () {
            $this._outlines(true);
        });

        // menu button click
        $($this.btn).click(function (e) {
            e.preventDefault();
            $this._menuToggle();
        });

        // click on menu parent
        $this.mobileNav.on('click', '.' + prefix + '_item', function (e) {
            e.preventDefault();
            $this._itemClick($(this));
        });

        // check for enter key on menu button and menu parents
        $($this.btn).keydown(function (e) {
            var ev = e || event;
            if (ev.keyCode == 13) {
                e.preventDefault();
                $this._menuToggle();
            }
        });

        $this.mobileNav.on('keydown', '.' + prefix + '_item', function (e) {
            var ev = e || event;
            if (ev.keyCode == 13) {
                e.preventDefault();
                $this._itemClick($(e.target));
            }
        });

        // allow links clickable within parent tags if set
        if (settings.allowParentLinks && settings.nestedParentLinks) {
            $('.' + prefix + '_item a').click(function (e) {
                e.stopImmediatePropagation();
            });
        }
    };

    //toggle menu
    Plugin.prototype._menuToggle = function (el) {
        var $this = this;
        var btn = $this.btn;
        var mobileNav = $this.mobileNav;

        if (btn.hasClass(prefix + '_collapsed')) {
            btn.removeClass(prefix + '_collapsed');
            btn.addClass(prefix + '_open');
        } else {
            btn.removeClass(prefix + '_open');
            btn.addClass(prefix + '_collapsed');
        }
        btn.addClass(prefix + '_animating');
        $this._visibilityToggle(mobileNav, btn.parent(), true, btn);
    };

    // toggle clicked items
    Plugin.prototype._itemClick = function (el) {
        var $this = this;
        var settings = $this.settings;
        var data = el.data("menu");
        if (!data) {
            data = {};
            data.arrow = el.children('.' + prefix + '_arrow');
            data.ul = el.next('ul');
            data.parent = el.parent();
            //Separated parent link structure
            if (data.parent.hasClass(prefix + '_parent-link')) {
                data.parent = el.parent().parent();
                data.ul = el.parent().next('ul');
            }
            el.data("menu", data);
        }
        if (data.parent.hasClass(prefix + '_collapsed')) {
            data.arrow.html(settings.openedSymbol);
            data.parent.removeClass(prefix + '_collapsed');
            data.parent.addClass(prefix + '_open');
            data.parent.addClass(prefix + '_animating');
            $this._visibilityToggle(data.ul, data.parent, true, el);
        } else {
            data.arrow.html(settings.closedSymbol);
            data.parent.addClass(prefix + '_collapsed');
            data.parent.removeClass(prefix + '_open');
            data.parent.addClass(prefix + '_animating');
            $this._visibilityToggle(data.ul, data.parent, true, el);
        }
    };

    // toggle actual visibility and accessibility tags
    Plugin.prototype._visibilityToggle = function (el, parent, animate, trigger, init) {
        var $this = this;
        var settings = $this.settings;
        var items = $this._getActionItems(el);
        var duration = 0;
        if (animate)
            duration = settings.duration;

        if (el.hasClass(prefix + '_hidden')) {
            el.removeClass(prefix + '_hidden');
            el.slideDown(duration, settings.easingOpen, function () {

                $(trigger).removeClass(prefix + '_animating');
                $(parent).removeClass(prefix + '_animating');

                //Fire open callback
                if (!init) {
                    settings.open(trigger);
                }
            });
            el.attr('aria-hidden', 'false');
            items.attr('tabindex', '0');
            $this._setVisAttr(el, false);
        } else {
            el.addClass(prefix + '_hidden');
            el.slideUp(duration, this.settings.easingClose, function () {
                el.attr('aria-hidden', 'true');
                items.attr('tabindex', '-1');
                $this._setVisAttr(el, true);
                el.hide(); //jQuery 1.7 bug fix

                $(trigger).removeClass(prefix + '_animating');
                $(parent).removeClass(prefix + '_animating');

                //Fire init or close callback
                if (!init)
                    settings.close(trigger);
                else if (trigger == 'init')
                    settings.init();
            });
        }
    };

    // set attributes of element and children based on visibility
    Plugin.prototype._setVisAttr = function (el, hidden) {
        var $this = this;

        // select all parents that aren't hidden
        var nonHidden = el.children('li').children('ul').not('.' + prefix + '_hidden');

        // iterate over all items setting appropriate tags
        if (!hidden) {
            nonHidden.each(function () {
                var ul = $(this);
                ul.attr('aria-hidden', 'false');
                var items = $this._getActionItems(ul);
                items.attr('tabindex', '0');
                $this._setVisAttr(ul, hidden);
            });
        } else {
            nonHidden.each(function () {
                var ul = $(this);
                ul.attr('aria-hidden', 'true');
                var items = $this._getActionItems(ul);
                items.attr('tabindex', '-1');
                $this._setVisAttr(ul, hidden);
            });
        }
    };

    // get all 1st level items that are clickable
    Plugin.prototype._getActionItems = function (el) {
        var data = el.data("menu");
        if (!data) {
            data = {};
            var items = el.children('li');
            var anchors = items.find('a');
            data.links = anchors.add(items.find('.' + prefix + '_item'));
            el.data("menu", data);
        }
        return data.links;
    };

    Plugin.prototype._outlines = function (state) {
        if (!state) {
            $('.' + prefix + '_item, .' + prefix + '_btn').css('outline', 'none');
        } else {
            $('.' + prefix + '_item, .' + prefix + '_btn').css('outline', '');
        }
    };

    Plugin.prototype.toggle = function () {
        var $this = this;
        $this._menuToggle();
    };

    Plugin.prototype.open = function () {
        var $this = this;
        if ($this.btn.hasClass(prefix + '_collapsed')) {
            $this._menuToggle();
        }
    };

    Plugin.prototype.close = function () {
        var $this = this;
        if ($this.btn.hasClass(prefix + '_open')) {
            $this._menuToggle();
        }
    };

    $.fn[mobileMenu] = function (options) {
        var args = arguments;

        // Is the first parameter an object (options), or was omitted, instantiate a new instance
        if (options === undefined || typeof options === 'object') {
            return this.each(function () {

                // Only allow the plugin to be instantiated once due to methods
                if (!$.data(this, 'plugin_' + mobileMenu)) {

                    // if it has no instance, create a new one, pass options to our plugin constructor,
                    // and store the plugin instance in the elements jQuery data object.
                    $.data(this, 'plugin_' + mobileMenu, new Plugin(this, options));
                }
            });

            // If is a string and doesn't start with an underscore or 'init' function, treat this as a call to a public method.
        } else if (typeof options === 'string' && options[0] !== '_' && options !== 'init') {

            // Cache the method call to make it possible to return a value
            var returns;

            this.each(function () {
                var instance = $.data(this, 'plugin_' + mobileMenu);

                // Tests that there's already a plugin-instance and checks that the requested public method exists
                if (instance instanceof Plugin && typeof instance[options] === 'function') {

                    // Call the method of our plugin instance, and pass it the supplied arguments.
                    returns = instance[options].apply(instance, Array.prototype.slice.call(args, 1));
                }
            });

            // If the earlier cached method gives a value back return the value, otherwise return this to preserve chainability.
            return returns !== undefined ? returns : this;
        }
    };
}(jQuery, document, window));

/****NEW******/
$(document).ready(function() {
 
  $("#owl-demo").owlCarousel({
 
      navigation : false, // Show next and prev buttons
 
      slideSpeed : 300,
      paginationSpeed : 400,
 
      items : 1, 
      itemsDesktop : false,
      itemsDesktopSmall : false,
      itemsTablet: false,
      itemsMobile : false
 
  });
  });
$(document).ready(function(){
    footerCollapse();
    $("iframe").hide();
    $(".click-viewmap").show();
    $('.click-viewmap').click(function(e){
        e.preventDefault();
        $("iframe").slideToggle(500);
    });
});

// Mobile footer collapse
function footerCollapse() {
    $('.footer-link').on('click', function(e) {
        e.preventDefault;
        $(this).parent('.modLinks').toggleClass('open');
    })
};
