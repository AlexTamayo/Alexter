/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


// Alternate way of writing the same thing is:  `$( () => { } )`
$(document).ready(() => {
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
              <span>${tweet.created_at}</span>
            </div>
          </header>
          <div class="tweet-text">
            <span>
              ${tweet.content.text}
            </span>
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


  // Test / driver code (temporary). Eventually will get this from the server.
  const tweetsData = [
    {
      "user": {
        "name": "Alex Tamayo",
        "avatars": "/images/profile_at_hex.png",
        "handle": "@AlexTamayo"
      },
      "content": {
        "text": "This is my tweeter project for Lighthouse labs. I'm making it look more like actual Twitter than the samples I was given. Pretty please don't fail me. I can't help myself."
      },
      "created_at": "19 July 2023"
    }
  ]

  // renderTweets(tweetsData);

  const loadTweets = () => {

    $.ajax({
      method: 'GET',
      url: '/tweets',
      success: (tweetsData) => {
        renderTweets(tweetsData);
      }
    })

  };

  loadTweets();


  $('#tweet-form').submit(function(event) {
    event.preventDefault();
    const formData = $(this).serialize();
    $.ajax({
      method: 'POST',
      url: '/tweets',
      data: formData,
      success: () => {
        loadTweets();
      },
      error: () => {}
    })
  });

})