# Avgrund

Avgrund is a jQuery plugin for your modal boxes and popups. It uses new concept showing depth between popup and page.

It works in all modern browsers and gracefully degrade in those that do not support CSS transitions and transformations.

Tested with jQuery versions 1.4+

File size is ~1.9Kb

## Usage

You can simply init Avgrund with one line:

```javascript
$('element').avgrund();
```

and linking 'avgrund.css' file to the project:

```html
<link rel="stylesheet" href="path/to/your/avgrund.css">
```

You're also able to use some of the options that let you customize it as you wish.

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
	onLoad: function () { ... }, // set custom call before popin is inited..
	onUnload: function () { ... }, // ..and after it was closed
	template: 'Your content goes here..' // or function (elem) { ... }
});
```

Check the example here: http://labs.voronianski.com/jquery.avgrund.js/

Inspired by Hakim's demo: https://github.com/hakimel/avgrund/

## Changelog

### Update (May 26, 2013)
Few fixes, and plugin is available as bower package now. So you can simply install it as:

```bash
bower install jquery.avgrund
```

### Update (Feb 25, 2013)
A bunch of small but very useful fixes and updates, including multiple avgrund popins on a page, removing popins from DOM after deactivation (also fixed an issue to make sure avgrund close effect works) and position:fixed/transform/overflow issue for scrolled pages in -webkit. Highly recommend to update your avgrund to current **1.1.2 version**.

### Update (Nov 18, 2012)
Get 2 new useful options for popin that were missed before. Now you can set your custom functions before Avgrund dialog is open and after it was closed.

```javascript
$(element).avgrund({
	onLoad: function() {
		console.log('this function will be called before dialog is initialized');
	},
	onUnload: function() {
		console.log('that will be shown after dialog is closed');
	}
});
```

### Update (Sep 30, 2012)
Some new updates include initializing popin without event:

```javascript
$(document).avgrund({
	openOnEvent: false // set to false to use avgrund on load
});
```

Also now you can set up your own event for an element:

```javascript
$(element).avgrund({
	setEvent: 'mouseover' // will open popin on element's mouseover
});
```

You can use a custom function inside avgrund's template option. Thanks to [juice49](https://github.com/juice49) for pull request.

```javascript
$(element).avgrund({
	template: function() {
		// return 'your content..' to use string
	}
});
```

### Update (Aug 31, 2012)
New options added - disable closing popup by 'Esc' and 'Document click'. Blur css filter for browsers that support it (seems only webkit ones for now).

## Contribution

We still have some issues to fix and make avgrund better, if you have any suggestions raise them in [issues](https://github.com/voronianski/jquery.avgrund.js/issues) please.

---

MIT Licensed

**enjoy!**
