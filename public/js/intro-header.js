(function ($) {
  'use strict';
  $(document).ready(function () {
    //for changing intro header
    let wordCount = 1;
    setInterval(function () {
      const words = ['developer', 'creator', 'life-long learner', 'thinker', 'tinkerer', 'dreamer'];
      $('#description').text(words[wordCount]);
      wordCount++;
      if (wordCount === words.length) {
        wordCount = 0;
      }
    }, 1000);

    //smooth scroll
    const $body = $('html, body');
    // const $arrow = document.getElementById('arrow-thing');
    $('#arrow-thing').click(function () {
      $body.animate({
          scrollTop: $($.attr(this, 'href')).offset().top - 50
      }, 750);
      return false;
    });
  });
}(jQuery));
