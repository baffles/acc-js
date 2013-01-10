class VersionFooter
	constructor: () ->
	
	processPage: () ->
		$('#footer > div').append "<br/><font color=\"#999999\"><a href=\"#{version.url}\">#{version.name}</a> version <b>#{version.version}</b> active.</font>"
