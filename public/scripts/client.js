/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


// Alternate way of writing the same thing is:  `$( () => { } )`
$(document).ready(() => {

  // console.log(timeago.format(1689738894410));

  const tFormat = timeago.format;

  const escapeHtml = function (str) {
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
                ${escapeHtml(tweet.content.text)}
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
    const tweetText = formData.substring(5).trim();

    if (tweetText.length === 0) {
      alert('Form data is empty.');
      return;
    }
    
    if (tweetText.length > 140) {
      alert('Exceeded maximum message length.');
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