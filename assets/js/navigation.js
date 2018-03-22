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

  // Window listeners
  $(window).resize(function() {
    flexFit();
  });

  $(burger).on('click', function() {
    $(this).toggleClass('active');
    $(dropdown_list).slideUp();
    $(nav_responder).slideToggle();
  });

  $(dropdown_link).on('click', function() {
    $(dropdown_list).slideToggle();

    // if inside responder
    if ($(this).parents(nav_list).length) {
      $(burger).removeClass('active');
      $(nav_list).addClass('flexi-open');
      $(nav_responder).slideUp();
    }

  });

  flexFit();
});
