/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


// Alternate way of writing the same thing is:  `$( () => { } )`
$(document).ready(() => {

  const tFormat = timeago.format;

  const escape = function(str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  const createTweetElement = (tweet) => {

    const $tweet = $(`
    <article class="tweet">
      <hr>
      <div class="tweet-container">
        <div class="tweet-container-logo">
          <img src=${tweet.user.avatars} alt="">
        </div>
        <div class="tweet-container-main">
          <header class="tweet-header">
            <div class="tweet-header display-name">
              <span>${tweet.user.name}</span>
            </div>
            <div class="tweet-header handle">
              <span>${tweet.user.handle}</span>
            </div>
            <div class="tweet-header dot">
              <span>·</span>
            </div>
            <div class="tweet-header date">
              <span">${tFormat(tweet.created_at)}</span>
            </div>
          </header>
          <div class="tweet-text">
            <div>
              <span>
                ${escape(tweet.content.text)}
              </span>
            </div>
          </div>
          <footer class="tweet-footer">
            <div class="tweet-footer-reply">
              <i class="fa-regular fa-comment"></i>
            </div>
            <div class="tweet-footer-retweet">
              <i class="fa-solid fa-retweet"></i>
            </div>
            <div class="tweet-footer-like">
              <i class="fa-regular fa-heart"></i>
            </div>
          </footer>
        </div>
      </div>
      </article>
    `);

    return $tweet;

  };

  const renderTweets = (tweets) => {
    const $container = $('#tweets-container');
    $container.empty();

    for(const tweet of tweets) {

      const $tweet = createTweetElement(tweet);

      $container.prepend($tweet)
    }
  };

  const loadTweets = () => {

    $.ajax({
      method: 'GET',
      url: '/tweets',
      success: (tweetsData) => {
        renderTweets(tweetsData);
      }
    })

  };

  const errorMessage = function(message){
    const $error = $('#error');

    $error.text(message);
    
    $error.removeClass('invisible-error');
    $error.addClass('visible-error');
    $error.slideDown(500);
    
    setTimeout(() => { 
      $error.slideUp(500, () => {
        $error.removeClass('visible-error');
        $error.addClass('invisible-error');
        $error.text('');
      });
    }, 3000);
    
  }

  loadTweets();

  $('#tweet-form').submit(function(event) {
    event.preventDefault();
    const formData = $(this).serialize();
    const tweetText = formData.substring(5).trim();

    if (tweetText.length === 0) {
      errorMessage('You typed nothing...');
      return;
    }
    
    if (tweetText.length > 140) {
      errorMessage('You exceeded maximum message length!');
      return;
    }

    console.log(formData);
    
    $.ajax({
      method: 'POST',
      url: '/tweets',
      data: formData,
      success: () => {
        loadTweets();
        $('#tweet-text').val('');
      },
      error: () => {}
    })
  });

})


/*

Can you modify the one I've got, please?

HTML:
<form id="tweet-form" action="/tweets" method="POST">
  <textarea name="text" id="tweet-text" placeholder="Whatchu talking bout, Willis?"></textarea>
  <div class="post-info">
    <button type="submit" class="button"><span>Tweet</span></button>
    <output name="counter" class="counter" for="tweet-text">140</output>
  </div>
</form>

CSS:
#tweet-text {
  resize: none;
  outline: none;
  align-content: center;
  color: white;
  font-size: x-large;
  background-color: transparent;
  overflow: hidden;
  height: 2em;
  border: none;
  border-bottom: 2px solid white;
}



*/