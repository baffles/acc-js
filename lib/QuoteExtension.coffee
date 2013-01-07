class QuoteExtension
	@threadPageUrl = /\/forums\/(?:thread|reply)\/(\d+)(?:\/(\d+))?$/
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
		if threadID?
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
			$generateQuotesButton.click (e) ->
				alert 'generate quotes!'
			
			$postToolbar = $ '#post_form .toolbar'
			$postToolbar.append $generateQuotesButton
