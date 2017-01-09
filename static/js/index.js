/**
 * Main JS file for Casper behaviours
 */

/*globals jQuery, document */
(function ($) {
  'use strict';

  $(document).ready(function () {

    //for changing intro header
    let wordCount = 1;
    setInterval(function () {
      const words = ['developer', 'creator', 'life-long learner', 'thinker', 'dreamer'];
      $('#description').text(words[wordCount]);
      wordCount++;
      if (wordCount === words.length) {
        wordCount = 0;
      }
    }, 1000);

    // for scroll to top button
    $(window).scroll(function () {
      if ($(this).scrollTop() >= 56) {
        $('#back-to-top').fadeIn(400);
      } else {
        $('#back-to-top').fadeOut(400);
      }
    });
    $('#back-to-top').click(function () {
      $('body,html').animate({
        scrollTop: 0
      }, 500);
    });

  });

}(jQuery));
