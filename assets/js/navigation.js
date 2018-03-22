$(function() {

  var $nav = $('.flexi-navigation');
  var $btn = $('.flexi-burger');
  var $vlinks = $('.flexi-navigation__list');
  var $hlinks = $('.flexi-responder');
  var $dlinks = $('.flexi-navigation__dropdown ul');
  var $dlink = $('.flexi-navigation__dropdown a');

  var numOfItems = 0;
  var totalSpace = 0;
  var breakWidths = [];

  // Get initial state
  $vlinks.children().outerWidth(function(i, w) {
    totalSpace += w;
    numOfItems += 1;
    breakWidths.push(totalSpace);
  });

  var availableSpace, numOfVisibleItems, requiredSpace;

  function Fit() {

    // Get instant state
    availableSpace = $vlinks.width() - 10;
    numOfVisibleItems = $vlinks.children().length;
    requiredSpace = breakWidths[numOfVisibleItems - 1];

    // There is not enought space
    if (requiredSpace > availableSpace) {
      $vlinks.children().last().prependTo($hlinks);
      numOfVisibleItems -= 1;
      Fit();
      // There is more than enough space
    } else if (availableSpace > breakWidths[numOfVisibleItems]) {
      $hlinks.children().first().appendTo($vlinks);
      numOfVisibleItems += 1;
    }
    // Update the button accordingly
    $btn.attr("count", numOfItems - numOfVisibleItems);
    if (numOfVisibleItems === numOfItems) {
      $btn.addClass('hidden');
    } else $btn.removeClass('hidden');

    // Apend all Children to Mobile navigation
    if ($(window).outerWidth() < 500) {
      $vlinks.children().prependTo($hlinks);
    }

    $dlinks.hide();
    $vlinks.removeClass('flexi-open');
  }

  // Window listeners
  $(window).resize(function() {
    Fit();
  });

  $btn.on('click', function() {
    $btn.toggleClass('active');
    $dlinks.slideUp();
    $hlinks.slideToggle();
  });

  $dlink.on('click', function() {
    $dlinks.slideToggle();
    $hlinks.slideUp();
    $btn.removeClass('active');
    $vlinks.addClass('flexi-open');
  });

  Fit();
});
