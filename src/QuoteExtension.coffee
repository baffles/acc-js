class QuoteExtension
	@threadPageUrl = /\/forums\/(?:thread|reply)\/(\d+)(?:\/(\d+))?/
	@smileyImageUrl = /^\/forums\/smileys\/.*\.gif$/
	@quoteIcon = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABMAAAAQCAMAAADDGrRQAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAAwBQTFRFAAAAmZmZw8PDy8vLz8/P09PT29vb4+Pj5+fn6ebm6+np6+vr7Onp7+3t7+3u7+7t7+/v8O3u8O7u8/Pz9PLy9PLz9/f3+Pf3+Pf4+Pj3+fj4/Pv8/Pz8////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgEGuBQAAAQB0Uk5T////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////AFP3ByUAAAAYdEVYdFNvZnR3YXJlAFBhaW50Lk5FVCB2My4zNqnn4iUAAACVSURBVChTXZDhDsIgDAb55obChs4xZDh8/8fEtoyYeYT+uJBLg8IPXyoKnwb0IRVyzvtuCPRze5e292ZOBYU1rKs5FRSWu1tMLdDIVFCY7GQNuBBjikkcOC+FEGiy8xoGnRSezi0PdsUD3SAFOpMVVzAM41HglcT561hq4dIT2pMrL7pSuM2EL+wELrQ/aI4L/04KlS//Ulwh/quwTAAAAABJRU5ErkJggg=='
	@quoteSelectedIcon = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABMAAAAQCAMAAADDGrRQAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAAwBQTFRFAAAA6hMT6Bwc9gAA9gEB9wQE9gUF9AYG8ggI8AkJ8A0N+QAA+gEB+QIC+QMDw8PDy8vLz8/P09PT29vb4+Pj5+fn6ebm6+np6+vr7Onp7+3t7+3u7+7t7+/v8O3u8O7u8/Pz9PLy9PLz9/f3+Pf3+Pf4+Pj3+fj4/Pv8/Pz8////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA34BpMQAAAQB0Uk5T////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////AFP3ByUAAAAYdEVYdFNvZnR3YXJlAFBhaW50Lk5FVCB2My4zNqnn4iUAAACrSURBVChTXZDZDoMgFETpvkytVVtcuohWrfT//48OIDHpIdyHCZwMCMwo4xH4Bg7ZFAporcdREiTPcG7oP70E1vvl1mkU7zZt08jZgEwJ1Peqlt7AoWkQKPMyl7CGrhu6IbIZrN4Z2pbzyExlkIid4VVV9WPFzCggTp2Bq8ytz5goTYvFzhnIyWXqWhhvuCSEXVj9za2ic5zenoSdp3ebDQ3hD0JmDf+ZM3h+Sp5mfXXRKz8AAAAASUVORK5CYII='
	
	constructor: () ->
	
	loadQuotes: (threadID) ->
		JSON.parse(sessionStorage.getItem "quotes[#{threadID}]") ? {}
	
	saveQuotes: (threadID, quotes) ->
		sessionStorage.setItem "quotes[#{threadID}]", JSON.stringify quotes
	
	updateQuoteButton: ($button, selected) ->
		$('img', $button).attr 'src', if selected then QuoteExtension.quoteSelectedIcon else QuoteExtension.quoteIcon
	
	processPage: () ->
		[ path, threadID, page ] = window.location.href.match QuoteExtension.threadPageUrl
		threadLocked = $('span:contains("This thread is locked; no one can reply to it.")').length > 0
		if threadID? and not threadLocked
			quotes = @loadQuotes threadID
			
			for $post in $ 'table.post'
				$quoteButton = $('<a>').addClass('quote-button').attr('href', '#').css('float', 'right').append $('<img>')
				@updateQuoteButton $quoteButton, quotes[$post.id]?
				#$quoteButton.attr 'data-post-id', $post.id
				
				$quoteButton.click { $button: $quoteButton, postID: $post.id }, (e) =>
					e.preventDefault();
					{ $button, postID } = e.data
				
					if not quotes[postID]?
						$post = $ "##{postID}.post"
						poster = $('.info > .member > .originator', $post).text()
						url = $(".content > .header > .posted-on > a[name='#{postID}']", $post).attr 'href'
						postContent = $('.content > div > .mockup', $post).html()
				
						quotes[postID] =
							postID: postID
							poster: poster
							url: url
							postContent: postContent
					else
						delete quotes[postID]
					
					@updateQuoteButton $button, quotes[postID]?
					@saveQuotes threadID, quotes
				
				$('.header', $post).append $quoteButton
			
			
			$generateQuotesButton = $ "<span class=\"button\"><img src=\"#{QuoteExtension.quoteSelectedIcon}\" style=\"height: 18px\" /><span> Generate Quotes</span></span>"
			$generateQuotesButton.click (e) =>
				e.preventDefault()
				@generateQuotes quotes
			
			$postToolbar = $ '#post_form .toolbar'
			$postToolbar.append $generateQuotesButton
	
	generateQuotes: (quotes) ->
		$editor = $('textarea[name=body]')
		
		if $editor.val().length > 0
			if not confirm 'You have already begun entering a post. This post-in-progress will be lost if you generate quotes. Would you like to continue?'
				return
		
		generatedQuotes = []
		
		for postID, post of quotes
			generatedQuotes.push @postToMarkup post.postContent
		
		$editor.val generatedQuotes.join '\n\n'
	
	postToMarkup: (postContent) ->
		$quote = $('<div>').html postContent
		
		# clean up paragraphs
		$('p', $quote).replaceWith () -> "#{$(this).html().trim()}\n\n"
		$('br', $quote).replaceWith '\n'
		$('span.url', $quote).replaceWith '' # remove the [domain] tags after links
		$('div.quote_container', $quote).replaceWith '' # don't quote quotes
		$('div.source-code.snippet', $quote).replaceWith '' # don't quote large sections of source
		$('img', $quote).replaceWith () ->
			# figure out if we're cloning a smiley or a regular image
			$img = $ this
			if $img.hasClass 'math'
				$($img.attr 'alt')
			else if QuoteExtension.smileyImageUrl.test $img.attr 'src'
				$img.attr 'alt'
			else
				"[#{$img.attr 'src'}]"
		$('.media-player', $quote).replaceWith () ->
			link = $('a', $ this).attr 'href'
			link = "http:#{link}" if link.startsWith '//'
			"[#{link}]"
		$('span.source-code', $quote).replaceWith () -> "<code>#{$(this).text()}</code>"
		#jQuery('div > input.spoiler').parent()
		$('div > input.spoiler').parent().replaceWith '' # remove spoiler buttons
		$('.spoiler').replaceWith () -> "<spoiler>#{$(this).html().trim()}</spoiler>" # handle spoilers
		$('span.cuss').replaceWith () -> $('span', $ this).text() # handle cuss words
		# most tags can be kept as-is. we can re-write them to be more text friendly but that may introduce ambiguity
		#$('b', $quote).replaceWith () -> "*#{$(this).html()}*"
		#$('i', $quote).replaceWith () -> "/#{$(this).html()}/"
		#$('u', $quote).replaceWith () -> "_#{$(this).html()}_"
		
		("> #{line}" for line in $quote.html().trim().split '\n').join('\n')
