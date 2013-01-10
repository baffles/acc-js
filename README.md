# BAF's Allegro.cc JS Extensions

## Summary

This is a work in progress suite of JavaScript extensions for Allegro.cc. These
extensions are written in CoffeeScript (which compiles down to JavaScript).

## Compatibility

At the moment, these extensions have only been tested in Google Chrome. Pull
requests to improve compatibility are welcome.

## Editing

You'll need CoffeeScript and uglify-js installed to optimally edit the source.
Run `cake build` to rebuild the `accjs.js` and `accjs.min.js` files after
editing.

## Installation

jQuery is required by these extensions. The easiest thing to do is to add
`//ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js` to the remote JS
URLs textbox on your Custom CSS/JS page on Allegro.cc.

You can probably hotlink to the latest git version of this script from the
remote JS URLs textbox. Strictly speaking, this isn't a recommended practice on
GitHub, but due to Allegro.cc using HTTPS, it's the easiest option.

To hotlink, add `https://raw.github.com/baffles/acc-js/master/bin/accjs.min.js`
to the remote JS URLs textbox.

Alternatively, you can host this file someplace and add the URL to it to the
remote JS URLs textbox, or you can even copying the contents of the file
directly to the Code box on the Custom CSS/JS page. If you're linking the file
in from a non-HTTPS host, you may get warnings.

The files in the bin folder in this repository are updated automatically when
I commit. You'll probably want to use accjs.min.js.

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
