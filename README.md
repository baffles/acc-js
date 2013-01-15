# BAF's Allegro.cc JS Extensions

## Summary

This is a work in progress suite of JavaScript extensions for Allegro.cc. These
extensions are written in CoffeeScript (which compiles down to JavaScript).

This is a reincarnation of a similar extension I wrote quite a while ago, back
before I knew as much about web development, JavaScript, and jQuery. A thread
discussing the original version can be found
[here](https://www.allegro.cc/forums/thread/599644/0).

## Compatibility

At the moment, these extensions have only been tested in Google Chrome. Pull
requests to improve compatibility are welcome.

## Editing and Uploading

You'll need CoffeeScript and uglify-js installed to compile the source to JS.
`cake`, `coffee`, and `uglifyjs` will need to be in your PATH to perform build
tasks.

You'll also need knox if you're going to use the cakefile task to upload to
Amazon S3. You can install this locally by running `npm install knox`.

Run `cake build` to rebuild the `accjs.js` and `accjs.min.js` files after
editing.

Run `cake upload` to upload the JavaScript output to Amazon S3. Create a
`config.json` using `config.json.sample` or pass your S3 credentials to the
upload command.

## Installation

jQuery is required by these extensions. The easiest thing to do is to add
`//ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js` to the remote JS
URLs textbox on your Custom CSS/JS page on Allegro.cc.

To use the latest tested, hosted by me on Amazon CloudFront, add
`//d2kjp5wpflq1en.cloudfront.net/stable/accjs.min.js` to the remote JS URLs
textbox.

Alternatively, you can host this file someplace on your own and add the URL to
it to the remote JS URLs textbox, or you can even copying the contents of the
file directly to the Code box on the Custom CSS/JS page. If you're linking the
file in from a non-HTTPS host, you may get warnings.

## Use

### Quote Extension

The Quote Extension provides automatic quote generation for posts. After
installation, a quote button will be added to the upper-right corner of each
post. Clicking this button will toggle quoting of the post on and off.

A 'Generate Quotes' button is also added to the toolbar of the post editor.
Clicking this button will generate quote automatically for all selected posts
from the current thread.

Tweaking may be needed from time to time to properly handle new post features
or to fix bugs in handling of existing features. Pull requests welcome.

Quote selections are stored in session storage. Persistence of these selections
is in line with session storage persistence.

## Future

This is an ongoing work-in-progress. I'll add new features as I desire them.
I'm always open to suggestions as well!
