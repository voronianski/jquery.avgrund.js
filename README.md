# Avgrund++

Avgrund++ is a jQuery plugin for your modal boxes and popups. It uses new concept showing depth between popup and page.
It works in all modern browsers and gracefully degrade in those that do not support CSS transitions and transformations.

Tested with jQuery versions 1.4+

File size is ~1.9Kb

Inspired by Hakim's demo: https://github.com/hakimel/avgrund/

Further inspired from : https://github.com/voronianski/jquery.avgrund.js

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
	escapeClose: true, // switch to 'true' for enabling close using the Esc key
	documentClose: false, // switch to 'true' for enabling close when clicking outside of the modal
	showCloseText: '', // type your text for close button
	holderClass: '', // lets you name custom class for popin holder..
	overlayClass: '', // ..and overlay block
	enableStackAnimation: false, // another animation type
	template: 'Your content goes here..'
});
```

MIT Licensed

**enjoy!**