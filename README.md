# Avgrund

[![Libscore Badge](http://img.shields.io/badge/libscore-34-brightgreen.svg?style=flat-square)](http://libscore.com/#$.fn.avgrund)

Avgrund is a jQuery plugin for your modal boxes and popups. It uses new concept showing depth between popup and page.

It works in all modern browsers and gracefully degrade in those that do not support CSS transitions and transformations.

Tested with jQuery versions 1.4+

File size of minified version is ``~1Kb``.

## Usage

You can simply include javascript file and init Avgrund with one line:

```javascript
$('element').avgrund();
```

and linking ``avgrund.css`` file to the project:

```html
<link rel="stylesheet" href="path/to/your/avgrund.css">
```

If you use [bower](https://github.com/bower/bower) then you can simply install it as:

```bash
bower install jquery.avgrund
```

### Using plugin with [Browserify](http://browserify.org/)

At first install plugin via NPM:

```bash
npm install jquery.avgrund
npm install jquery-browserify
```

In your server-side node.js (e.g. [express](http://expressjs.com/) app):

```javascript
app.use(require('browserify')({
    require : ['jquery-browserify', 'jquery.avgrund']
}));
```

And in your browser-side you can init plugin now:

```javascript
var $ = require('jquery-browserify');
require('jquery.avgrund')($);
```

### Options

You're also able to use some of the options that let you customize it as you wish:

```javascript
$('element').avgrund({
    width: 380, // max is 640px
    height: 280, // max is 350px
    showClose: false, // switch to 'true' for enabling close button
    showCloseText: '', // type your text for close button
    closeByEscape: true, // enables closing popup by 'Esc'..
    closeByDocument: true, // ..and by clicking document itself
    holderClass: '', // lets you name custom class for popin holder..
    overlayClass: '', // ..and overlay block
    enableStackAnimation: false, // enables different type of popin's animation
    onBlurContainer: '', // enables blur filter for specified block
    openOnEvent: true, // set to 'false' to init on load
    setEvent: 'click', // use your event like 'mouseover', 'touchmove', etc.
    onLoad: function (elem) { ... }, // set custom call before popin is inited..
    onUnload: function (elem) { ... }, // ..and after it was closed
    template: 'Your string content goes here..' // or function (elem) { ... }, or selector $('.content')
});
```

More detailed information on every option you can find [here](https://github.com/voronianski/jquery.avgrund.js#Documentation).

## Documentation

Here is the list of available avgrund options:

##### width - string | number, default: '380px'

Set popup width (currently stict to max ``640px``).

##### height - string | number, default: '280px'

Set popup height (currently strict to max ``350px``).

##### showClose - boolean, default: false

Show/hide close button.

##### showCloseText - string

If you decided to show close button then you probably want to add close text to it.

##### closeByEscape - boolean, default: true

Allow users to close popup by clicking ``Esc`` button.

##### closeByDocument -  boolean, default: true

Allow users to close popup by clicking everywhere on ``document`` (except popup of course).

##### holderClass - string

Adds custom css classes to avgrund popup, example:

```javascript
$(element).avgrund({
    holderClass: 'my-custom-class'
});
```

results in adding this class to avgrund container:
```html
<div class="avgrund-popin my-custom-class">...</div>
```

##### overlayClass - string

Adds custom css classes to avgrund overlay container.

##### enableStackAnimation - boolean, default: false

Possibility to add a bit different popup hiding animation type.

##### onBlurContainer - string

Class name for container element that will be blurred when popup appears, example:

```javascript
$(element).avgrund({
    onBlurContainer: '#my-container'
});
```

Please note that currently css ``blur`` is not supported in all modern browsers.

##### openOnEvent - boolean, default: true

If you want to show avgrund on page load set this option value to ``false``, example:

```javascript
$(document).avgrund({
    openOnEvent: false
});
```

##### setEvent - string, default: 'click'

With this option you can manage events that will open popup on certain element:

```javascript
$(element).avgrund({
    setEvent: 'mouseover' // will open popin on element's mouseover
});
```

##### onLoad - function

If you need to make some preparations or whatever before avgrund popup will be shown, example:

```javascript
$(element).avgrund({
    onLoad: function (element) {
        console.log('This function will be called before dialog is initialized');
    }
});
```

##### onUnload - function

This function will be executed after popup was closed, example:

```javascript
$(element).avgrund({
    onUnload: function (element) {
        console.log('This message will be shown after dialog is closed');
    }
});
```

##### template - string | function | jQuery object

Specify your content for popin here, it can be ``string`` value:

```javascript
$(element).avgrund({
    template: '<p>This is popin content!</p>'
});
```

or ``function`` that returns content itself:

```javascript
$(element).avgrund({
    template: function (element) {
        // return 'your content..'
    }
});
```

Also it accepts jQuery objects (dynamic as well), so you can create element with content inside your app:

```html
<div class="content" style="display: none;">
    My content for popin!
</div>
```

and use it in ``template`` of popin:

```javascript
$('element').avgrund({
    template: $('.content')
});
```

## Demo

Check the example here: http://labs.voronianski.com/jquery.avgrund.js/

Inspired by Hakim's demo: https://github.com/hakimel/avgrund/

## Changelog

### Update (Sep 28, 2013)
Added AMD and CommonJS styles support.

### Update (Sep 22, 2013)
Added support jQuery selectors in template option.

### Update (June 15, 2013)
Better fix for overlay and long content pages, minor add-ons.

### Update (May 26, 2013)
Few fixes, and plugin is available as bower package now. So you can simply install it as:

### Update (Feb 25, 2013)
A bunch of small but very useful fixes and updates, including multiple avgrund popins on a page, removing popins from DOM after deactivation (also fixed an issue to make sure avgrund close effect works) and position:fixed/transform/overflow issue for scrolled pages in -webkit.

### Update (Nov 18, 2012)
Get 2 new useful options for popin that were missed before. Now you can set your custom functions before Avgrund dialog is open and after it was closed.

### Update (Sep 30, 2012)
Some new updates include initializing popin without event. Also now you can set up your own event for an element. Added ability to use a custom function inside avgrund's template option. Thanks to [juice49](https://github.com/juice49) for pull request.

### Update (Aug 31, 2012)
New options added - disable closing popup by 'Esc' and 'Document click'. Blur css filter for browsers that support it (seems only webkit ones for now).

## Contribution

We still have some issues to fix and make avgrund better, if you have any suggestions raise them in [issues](https://github.com/voronianski/jquery.avgrund.js/issues) please.

---

MIT Licensed

**enjoy!**

[![Bitdeli Badge](https://d2weczhvl823v0.cloudfront.net/voronianski/jquery.avgrund.js/trend.png)](https://bitdeli.com/free "Bitdeli Badge")
