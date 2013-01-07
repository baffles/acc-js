document.write("<script type=\"text/javascript\" src=\"http://misc.baf.cc/accjs/lib/common.js\"></script>"); 

var quote_imageUnsel = "http://misc.baf.cc/accjs/img/icon-quote.png";
var quote_imageSel = "http://misc.baf.cc/accjs/img/icon-quote-selected.png";
var quotesChanged = false;

doc.add_onLoad(function()
{
	var cookies = new CookieJar({path: '/'});
	var quotedPosts = cookies.get("posts");
	var lastReadReg = /<a name="last_read">/

	$$('table.post').each(function(post)
	{
		var postHeader = $$('table.post#' + post.id + ' div.header')[0];

		var buttonCode;
		
		if(quotedPosts != null && quotedPosts.indexOf(post.id) != -1)
			buttonCode = "<a href=\"#\" onclick=\"quote_onClick('" + post.id + "'); return false;\" id=\"" + post.id + "-button\"><img src=\"" + quote_imageSel + "\" alt=\"Quote Post\" width=\"18\" height=\"15\" border=\"0\"></a>";
		else
			buttonCode = "<a href=\"#\" onclick=\"quote_onClick('" + post.id + "'); return false;\" id=\"" + post.id + "-button\"><img src=\"" + quote_imageUnsel + "\" alt=\"Quote Post\" width=\"18\" height=\"15\" border=\"0\"></a>";
		
		if(postHeader.innerHTML.search(lastReadReg) != -1)
			postHeader.innerHTML = postHeader.innerHTML.replace(lastReadReg, buttonCode + "<a name=\"last_read\">");
		else
			postHeader.innerHTML += buttonCode;
	});
	
	$$('textarea.mockup-box2').each(function(i)
	{
		i.onfocus = function() { editBox_onFocus(i.id); };
	});
	
	$$('form#post_form').each(function(i)
	{
		var oldsub = i.onsubmit;
		i.onsubmit = function() { (new CookieJar({path: '/'})).empty(); if(oldsub != null) return oldsub(); };
	});
	
	if(quotedPosts != null && quotedPosts.length > 0)
		quotesChanged = true;
});

function quote_onClick(post)
{
	var cookies = new CookieJar({path: '/'});
	var quotedPosts = cookies.get("posts");
	
	if(quotedPosts == null)
		quotedPosts = new Array();
	
	if(quotedPosts.indexOf(post) != -1)
	{
		// deselect post
		quotedPosts.splice(quotedPosts.indexOf(post), 1);
		cookies.remove(post);
		
		$$('a#' + post + '-button img')[0].src = quote_imageUnsel;
	}
	else
	{
		// select post
		quotedPosts.push(post);
		
		var selection = window.getSelection();
		
		var name = $$('table#' + post + ' div.originator')[0].innerHTML;
		var source = $$('table#' + post + ' div.header span.posted-on a')[0].href;
		var postContent = $$('table#' + post + ' td.content div.mockup')[0];
		
		if(postContent == null)
		{
			alert("Auto-quoting does not work with older pre-mockupv2 posts.");
			return;
		}
		
		if(selection.focusNode == null || selection.anchorNode == null)
			alert("lawl");
		else
			alert(selection.focusNode + " - " + selection.anchorNode);
		
		if($(selection.focusNode).up("div.mockup") == $(selection.anchorNode).up("div.mockup") && $(selection.anchorNode).up("div.mockup") == postContent)
			alert("yay");

		
		postContent = htmlToMockup(postContent.innerHTML);
		
		var quote = "<quote name=\"" + name + "\" src=\"" + source + "\">\n" + postContent + "\n</quote>";
		if(!cookies.put(post, quote) || cookies.get(post) == null)
		{
			cookies.remove(post);
			quote = "<quote name=\"" + name + "\" src=\"" + source + "\">\n[Post Truncated]\n</quote>";
			
			if(!cookies.put(post, quote) || cookies.get(post) == null)
			{
				alert("Error storing quote!");
				cookies.remove(post);
				return;
			}
			else
				alert("Post was too long to auto-quote, so it has been truncated.");
		}
		
		$$('a#' + post + '-button img')[0].src = quote_imageSel;
	}
	
	cookies.put("posts", quotedPosts);
	quotesChanged = true;
}

function editBox_onFocus(id)
{
	var editBox = $$('textarea#' + id)[0];
	var cookies = new CookieJar({path: '/'});
	var quotedPosts = cookies.get("posts");
	
	if(quotesChanged && quotedPosts != null && quotedPosts.length > 0)
	{
		if(editBox.value.length > 0)
		{
			if(!confirm("You have entered text in the box. Press OK to clear it and generate quotes, or cancel to keep your text."))
				return;
		}
		
		editBox.value = "";

		quotedPosts.each(function(i)
		{
			editBox.value += cookies.get(i) + "\n\n";
		});
	}
	
	quotesChanged = false;
}


function htmlToMockup(post)
{
	/*
Remove <p>
</p> ==> \n\n
&lt; ==> \<
&gt; ==> >
deal with <ul> <ol> etc, maybe they can stay
<s> - strikethrough
<span class="ref"><sup>[<a href="#">1</a>]</sup></span> ==> remove (reference)
<br /> ==> \n
<object..../object> ==> [Media Removed]
<div class="spoiler"><p>(...)</p></div> ==> spoiler
<pre class="terminal scroll"> ... </pre> ==> terminal
<span class="json">...</span> ==> remove for now
<div class="quote_container"><div class="title">Quote:</div><div class="quote"><p>
// Ignore Poster app Version 0.1
</p></div></div>

<pre class="snippet"><span class="k3"><</span>quote name<span class="k3">=</span><span class="s">"[originator]"</span> src<span class="k3">=</span><span class="s">"[post_link]"</span><span class="k3">></span><span class="k2">[</span>content<span class="k2">]</span><span class="k3"><</span><span class="k3">/</span>quote></pre>
^ code
	*/
	
	post = post.replace(/<p>/g, "");
	post = post.replace(/<\/p>/g, "\n\n");
	post = post.replace(/\r|\n/g, "<br />"); // because JS regexes are CRIPPLED!

	post = post.replace(/<s>(.*?)<\/s>/g, "<strike>$1</strike>");
	post = post.replace(/<span class="ref">.*<\/span>/g, "");
	post = post.replace(/<object.*\/object>/gm, "[Embedded Content Removed]");
	post = post.replace(/<span class="json">.*<\/span>/g, "");
	post = post.replace(/<pre class="terminal scroll">(.*?)<\/pre>/g, "<terminal>$1</terminal>");
	post = post.replace(/<div class="spoiler"><p>(.*?)<\/p><\/div>/g, "<spoiler>$1</spoiler>");
	
/* don't quote quotes!
	// anonymous quotes
	post = post.replace(/<div class="quote_container"><div class="title">Quote:<\/div><div class="quote">\s*(.*?)\s*<\/div><\/div>/gmi, "<quote>$1</quote>");
	// quotes with only source
	post = post.replace(/<div class="quote_container"><div class="title"><a href="(.*?)">Quote<\/a>:<\/div><div class="quote">\s*(.*?)\s*<\/div><\/div>/gmi, "<quote src=\"$1\">$2</quote>");
	// name only
	post = post.replace(/<div class="quote_container"><div class="title">(.*?) said:<\/div><div class="quote">\s*(.*?)\s*<\/div><\/div>/gmi, "<quote name=\"$1\">$2</quote>");	
	// name and link
	post = post.replace(/<div class="quote_container"><div class="title"><a href="(.*?)">(.*?) said<\/a>:<\/div><div class="quote">\s*(.*?)\s*<\/div><\/div>/gmi, "<quote src=\"$1\" name=\"$2\">$3</quote>");
*/
	post = post.replace(/<div class="quote_container"><div class="title">.*?<\/div><\/div>\s*/gi, "");

	var codematches = post.match(/<pre class="snippet">.*?<\/pre>/ig);
	if(codematches != null && codematches.length > 0)
		for(i = 0; i < codematches.length; i++)
		{
			var code = codematches[i].replace(/<\/?[pre|a|span].*?>/gi, "");
			
			post = post.replace(codematches[i], "<code>\n" + code + "\n</code>\n");
		}
	
	// do smileys (. isn't escaped in urls because it will match \. anyway and I'm lazy)
	post = post.replace(/<img src="http:\/\/www.allegro.cc\/forums\/smileys\/angry.gif">/gi, ">:(");
	post = post.replace(/<img src="http:\/\/www.allegro.cc\/forums\/smileys\/cheesy.gif">/gi, ":D");
	post = post.replace(/<img src="http:\/\/www.allegro.cc\/forums\/smileys\/cool.gif">/gi, "8-)");
	post = post.replace(/<img src="http:\/\/www.allegro.cc\/forums\/smileys\/cry.gif">/gi, ":'(");
	post = post.replace(/<img src="http:\/\/www.allegro.cc\/forums\/smileys\/embarassed.gif">/gi, ":-[");
	post = post.replace(/<img src="http:\/\/www.allegro.cc\/forums\/smileys\/grin.gif">/gi, ";D");
	post = post.replace(/<img src="http:\/\/www.allegro.cc\/forums\/smileys\/huh.gif">/gi, "???");
	post = post.replace(/<img src="http:\/\/www.allegro.cc\/forums\/smileys\/kiss.gif">/gi, ":-*");
	post = post.replace(/<img src="http:\/\/www.allegro.cc\/forums\/smileys\/lipsrsealed.gif">/gi, ":-X");
	post = post.replace(/<img src="http:\/\/www.allegro.cc\/forums\/smileys\/rolleyes.gif">/gi, "::)");
	post = post.replace(/<img src="http:\/\/www.allegro.cc\/forums\/smileys\/sad.gif">/gi, ":(");
	post = post.replace(/<img src="http:\/\/www.allegro.cc\/forums\/smileys\/shocked.gif">/gi, ":o");
	post = post.replace(/<img src="http:\/\/www.allegro.cc\/forums\/smileys\/smiley.gif">/gi, ":)");
	post = post.replace(/<img src="http:\/\/www.allegro.cc\/forums\/smileys\/tongue.gif">/gi, ":P");
	post = post.replace(/<img src="http:\/\/www.allegro.cc\/forums\/smileys\/undecided.gif">/gi, ":-/");
	post = post.replace(/<img src="http:\/\/www.allegro.cc\/forums\/smileys\/wink.gif">/gi, ";)");

	
	// misc stuff, and return line endings
	post = post.replace(/<\/div>/g, ""); // remove extra divs, mostly from quote filtering
	post = post.replace(/&lt;/g, "\<");
	post = post.replace(/&gt;/g, "\>");
	post = post.replace(/<br \/>/g, "\n");
	post = post.replace(/<br>/g, "\n");
	
	post = post.replace(/^\s*/, "");
	post = post.replace(/\s*$/, "");
	post = post.replace(/\s\s+/g, "\n\n"); // limit whitespace to two lines

	return post;
}
