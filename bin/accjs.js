(function() {
  var $, QuoteExtension, quoteExtension;

  QuoteExtension = (function() {

    QuoteExtension.threadPageUrl = /\/forums\/(?:thread|reply)\/(\d+)(?:\/(\d+))?/;

    QuoteExtension.smileyImageUrl = /^\/forums\/smileys\/.*\.gif$/;

    QuoteExtension.quoteIcon = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABMAAAAQCAMAAADDGrRQAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAAwBQTFRFAAAAmZmZw8PDy8vLz8/P09PT29vb4+Pj5+fn6ebm6+np6+vr7Onp7+3t7+3u7+7t7+/v8O3u8O7u8/Pz9PLy9PLz9/f3+Pf3+Pf4+Pj3+fj4/Pv8/Pz8////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgEGuBQAAAQB0Uk5T////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////AFP3ByUAAAAYdEVYdFNvZnR3YXJlAFBhaW50Lk5FVCB2My4zNqnn4iUAAACVSURBVChTXZDhDsIgDAb55obChs4xZDh8/8fEtoyYeYT+uJBLg8IPXyoKnwb0IRVyzvtuCPRze5e292ZOBYU1rKs5FRSWu1tMLdDIVFCY7GQNuBBjikkcOC+FEGiy8xoGnRSezi0PdsUD3SAFOpMVVzAM41HglcT561hq4dIT2pMrL7pSuM2EL+wELrQ/aI4L/04KlS//Ulwh/quwTAAAAABJRU5ErkJggg==';

    QuoteExtension.quoteSelectedIcon = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABMAAAAQCAMAAADDGrRQAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAAwBQTFRFAAAA6hMT6Bwc9gAA9gEB9wQE9gUF9AYG8ggI8AkJ8A0N+QAA+gEB+QIC+QMDw8PDy8vLz8/P09PT29vb4+Pj5+fn6ebm6+np6+vr7Onp7+3t7+3u7+7t7+/v8O3u8O7u8/Pz9PLy9PLz9/f3+Pf3+Pf4+Pj3+fj4/Pv8/Pz8////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA34BpMQAAAQB0Uk5T////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////AFP3ByUAAAAYdEVYdFNvZnR3YXJlAFBhaW50Lk5FVCB2My4zNqnn4iUAAACrSURBVChTXZDZDoMgFETpvkytVVtcuohWrfT//48OIDHpIdyHCZwMCMwo4xH4Bg7ZFAporcdREiTPcG7oP70E1vvl1mkU7zZt08jZgEwJ1Peqlt7AoWkQKPMyl7CGrhu6IbIZrN4Z2pbzyExlkIid4VVV9WPFzCggTp2Bq8ytz5goTYvFzhnIyWXqWhhvuCSEXVj9za2ic5zenoSdp3ebDQ3hD0JmDf+ZM3h+Sp5mfXXRKz8AAAAASUVORK5CYII=';

    function QuoteExtension() {}

    QuoteExtension.prototype.loadQuotes = function(threadID) {
      var _ref;
      return (_ref = JSON.parse(sessionStorage.getItem("quotes[" + threadID + "]"))) != null ? _ref : {};
    };

    QuoteExtension.prototype.saveQuotes = function(threadID, quotes) {
      return sessionStorage.setItem("quotes[" + threadID + "]", JSON.stringify(quotes));
    };

    QuoteExtension.prototype.updateQuoteButton = function($button, selected) {
      return $('img', $button).attr('src', selected ? QuoteExtension.quoteSelectedIcon : QuoteExtension.quoteIcon);
    };

    QuoteExtension.prototype.processPage = function() {
      var $generateQuotesButton, $post, $postToolbar, $quoteButton, page, path, quotes, threadID, _i, _len, _ref, _ref1,
        _this = this;
      _ref = window.location.href.match(QuoteExtension.threadPageUrl), path = _ref[0], threadID = _ref[1], page = _ref[2];
      if (threadID != null) {
        quotes = this.loadQuotes(threadID);
        _ref1 = $('table.post');
        for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
          $post = _ref1[_i];
          $quoteButton = $('<a>').addClass('quote-button').attr('href', '#').css('float', 'right').append($('<img>'));
          this.updateQuoteButton($quoteButton, quotes[$post.id] != null);
          $quoteButton.click({
            $button: $quoteButton,
            postID: $post.id
          }, function(e) {
            var $button, postContent, postID, poster, url, _ref2;
            e.preventDefault();
            _ref2 = e.data, $button = _ref2.$button, postID = _ref2.postID;
            if (!(quotes[postID] != null)) {
              $post = $("#" + postID + ".post");
              poster = $('.info > .member > .originator', $post).text();
              url = $(".content > .header > .posted-on > a[name='" + postID + "']", $post).attr('href');
              postContent = $('.content > div > .mockup', $post).html();
              quotes[postID] = {
                postID: postID,
                poster: poster,
                url: url,
                postContent: postContent
              };
            } else {
              delete quotes[postID];
            }
            _this.updateQuoteButton($button, quotes[postID] != null);
            return _this.saveQuotes(threadID, quotes);
          });
          $('.header', $post).append($quoteButton);
        }
        $generateQuotesButton = $("<span class=\"button\"><img src=\"" + QuoteExtension.quoteSelectedIcon + "\" style=\"height: 18px\" /><span> Generate Quotes</span></span>");
        $generateQuotesButton.click(function(e) {
          e.preventDefault();
          return _this.generateQuotes(quotes);
        });
        $postToolbar = $('#post_form .toolbar');
        return $postToolbar.append($generateQuotesButton);
      }
    };

    QuoteExtension.prototype.generateQuotes = function(quotes) {
      var $editor, generatedQuotes, post, postID;
      $editor = $('textarea[name=body]');
      if ($editor.val().length > 0) {
        if (!confirm('You have already begun entering a post. This post-in-progress will be lost if you generate quotes. Would you like to continue?')) {
          return;
        }
      }
      generatedQuotes = [];
      for (postID in quotes) {
        post = quotes[postID];
        generatedQuotes.push(this.postToMarkup(post.postContent));
      }
      return $editor.val(generatedQuotes.join('\n\n'));
    };

    QuoteExtension.prototype.postToMarkup = function(postContent) {
      var $quote, line;
      $quote = $('<div>').html(postContent);
      $('p', $quote).replaceWith(function() {
        return "" + ($(this).html().trim()) + "\n\n";
      });
      $('br', $quote).replaceWith('\n');
      $('span.url', $quote).replaceWith('');
      $('div.quote_container', $quote).replaceWith('');
      $('div.source-code.snippet', $quote).replaceWith('');
      $('img', $quote).replaceWith(function() {
        var $img;
        $img = $(this);
        if ($img.hasClass('math')) {
          return $($img.attr('alt'));
        } else if (QuoteExtension.smileyImageUrl.test($img.attr('src'))) {
          return $img.attr('alt');
        } else {
          return "[" + ($img.attr('src')) + "]";
        }
      });
      $('.media-player', $quote).replaceWith(function() {
        var link;
        link = $('a', $(this)).attr('href');
        if (link.startsWith('//')) {
          link = "http:" + link;
        }
        return "[" + link + "]";
      });
      $('span.source-code', $quote).replaceWith(function() {
        return "<code>" + ($(this).text()) + "</code>";
      });
      return ((function() {
        var _i, _len, _ref, _results;
        _ref = $quote.html().trim().split('\n');
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          line = _ref[_i];
          _results.push("> " + line);
        }
        return _results;
      })()).join('\n');
    };

    return QuoteExtension;

  })();

  $ = jQuery.noConflict();

  quoteExtension = new QuoteExtension;

  $(function() {
    return quoteExtension.processPage();
  });

}).call(this);
