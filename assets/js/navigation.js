$(function() {

  var nav = '.flexi-navigation';
  var burger = '.flexi-burger';
  var nav_list = '.flexi-navigation__list';
  var nav_responder = '.flexi-responder';
  var dropdown_list = '.flexi-navigation__dropdown ul';
  var dropdown_link = '.flexi-navigation__dropdown a';

  var flexiItems = 0;
  var totalWidth = 0;
  var responder = [];

  // Get initial state
  $(nav_list).children().outerWidth(function(i, width) {
    totalWidth += width;
    flexiItems += 1;
    responder.push(totalWidth);
  });

  var flexiWidth, flexiVisible, flexiSpace;

  function flexFit() {

    // Get Flex State
    flexiWidth = $(nav_list).width() - 10;
    flexiVisible = $(nav_list).children().length;
    flexiSpace = responder[flexiVisible - 1];

    // Add Item to Flex-responder
    if (flexiSpace > flexiWidth) {
      $(nav_list).children().last().prependTo($(nav_responder));
      flexiVisible -= 1;
      flexFit();
      // Remove Item from Flex-responder
    } else if (flexiWidth > responder[flexiVisible]) {

      $(nav_responder).children().first().appendTo($(nav_list));
      flexiVisible += 1;
    }

    // Update Flexi count
    $(burger).attr("count", flexiItems - flexiVisible);

    if (flexiVisible === flexiItems) {
      $(burger).addClass('hidden');
    } else {
      $(burger).removeClass('hidden');
    }

    // Apend all Children to Mobile navigation
    if ($(window).outerWidth() < 500) {
      $(nav_list).children().prependTo($(nav_responder));
    }

    $(dropdown_list).hide();
    $(nav_list).removeClass('flexi-open');
  }

  function responderHeight() {

    setTimeout(function(){
      var nav_height = $(nav).outerHeight();
      var window_height = $(window).height() - nav_height;
      var responder_height = $(nav_responder).height();

      $(nav_responder).css('max-height', window_height);
    }, 500);
  }

  function StickyNav() {
  /*==================================
  Sticky Object on scroll up
  ==================================*/

  // Hide Element on scroll down
  var didScroll,
    lastScrollTop = 0,
    delta = 100, // how many pixels before the class is appended
    headerHeight = $(nav).outerHeight();

    // Allows data arg for diffrent engaugement

    if(typeof $(nav).data('stick-on') != 'undefined') {
      headerHeight = $(nav).data('stick-on');
    }

  $(window).scroll(function (event) {
    didScroll = true;
  });

  setInterval(function () {
    if (didScroll) {
      hasScrolled();
      didScroll = false;
    }
  }, 60);

  function hasScrolled() {
    var scrollTop = $(this).scrollTop();

    // Make sure they scroll more than delta
    if (Math.abs(lastScrollTop - scrollTop) <= delta)
      return;

    if (scrollTop > lastScrollTop && scrollTop > headerHeight) {
      // Scroll Down
      $(nav).addClass('header-sticky');
      var nav_offset = $(nav).outerHeight();

      $(nav).css('top', - nav_offset);

      if ($(window).outerWidth() > 500) {
        $(dropdown_list).slideUp();
      }

    } else {
      // Scroll Up
      if (scrollTop + $(window).height() < $(document).height()) {
        $(nav).removeClass('header-sticky');
        $(nav).css('top', '0');
      }
    }

    lastScrollTop = scrollTop;
  }
}

  // Window listeners
  $(window).resize(function() {
    flexFit();
    responderHeight();
  });

  $(burger).on('click', function() {
    $(this).toggleClass('active');
    $(dropdown_list).slideUp();
    $(nav_responder).slideToggle();
    // Apend all Children to Mobile navigation
    if ($(window).outerWidth() < 500) {
      if($('body').hasClass('flexi-freeze')) {
        $('body').removeClass('flexi-freeze');
      } else {
        $('body').addClass('flexi-freeze');
      }
    } else {
      $('body').removeClass('flexi-freeze');
    }

    responderHeight();
  });

  $(dropdown_link).on('click', function(e) {
    var element = $(e.target),
        area = element.attr('data-toggle'),
  			areaObj = $('#js-' + area),
  			activeClass = 'active';

  		$(this).not(element).removeClass(activeClass);
  		element.toggleClass(activeClass);

  		$(dropdown_list).not(areaObj).slideUp();
  		areaObj.slideToggle();

    // if inside responder
    if ($(this).parents(nav_list).length) {
      $(burger).removeClass('active');
      $(nav_list).addClass('flexi-open');
      $(nav_responder).slideUp();
    }
  });

  if($(nav).hasClass('sticky')) {
    StickyNav();
  }

  flexFit();
});
