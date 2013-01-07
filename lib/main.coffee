# we're in a coffee closure here, so we'll no-conflict jQuery and make it available
$ = jQuery.noConflict();

quoteExtension = new QuoteExtension

$ () ->
	quoteExtension.processPage()
