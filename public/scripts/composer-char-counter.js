$(document).ready(function() {
  // --- our code goes here ---
  $("textarea").on("keyup", function () {
    const txt = $(this).val();
    const counter = $(this).siblings('.post-info').find('.counter')
    const remainingChars = 140 - txt.length;
    counter.val(remainingChars);

    if (remainingChars <= 10 && remainingChars >= 0) {
      counter.removeClass('excess-counter');
      counter.addClass('warning-counter');
    } else if (remainingChars < 0) {
      counter.removeClass('warning-counter');
      counter.addClass('excess-counter');
    } else {
      counter.removeClass('warning-counter excess-counter');
    }
    
  });

});
