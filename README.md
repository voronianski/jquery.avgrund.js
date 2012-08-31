# Avgrund

Avgrund is a jQuery plugin for your modal boxes and popups. It uses new concept showing depth between popup and page.
It works in all modern browsers and gracefully degrade in those that do not support CSS transitions and transformations.

Tested with jQuery versions 1.4+

File size is ~1.9Kb

Documentation and examples are here: http://labs.voronianski.com/jquery.avgrund.js/

Inspired by Hakim's demo: https://github.com/hakimel/avgrund/

### Update (Aug 31, 2012)
New options added - disable closing popup by 'Esc' and 'Document click'. Blur css filter for browsers that support it (seems only webkit ones for now).

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
	template: 'Your content goes here..'
});
```

MIT Licensed

**enjoy!**