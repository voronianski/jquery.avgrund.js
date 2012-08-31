/**
 *  jQuery Avgrund++ Plugin
 *  Inspired by concept in vanilla js - https://github.com/hakimel/Avgrund/
 *  Further Inspired by concept in  js - http://labs.voronianski.com/jquery.avgrund.js/
 
 *  MIT licensed, (c) 2012 http://ryanmcdonough.co.uk
 */

(function($) {
	$.fn.avgrund = function(options) {
		var defaults = {
			width: 380, // max = 640
			height: '280', // max = 350
			showClose: false,
			escapeClose: true,
			documentClose: true,
			showCloseText: '',
			holderClass: '',
			overlayClass: '',
			enableStackAnimation: false,
			template: '<p>This is test popin content!</p>'
		};
		var options = $.extend(defaults, options);

		return this.each(function() {
			var body = $('body'),
				maxWidth = options.width > 640 ? 640 : options.width,
				maxHeight = options.height > 350 ? 350 : options.height;

			body.addClass('avgrund-ready');
			body.append('<div class="avgrund-overlay ' + options.overlayClass + '"></div>');				
			body.append('<div class="avgrund-popin ' + options.holderClass + '">' + options.template + '</div>');

			$('.avgrund-popin').css({
				'width': maxWidth + 'px',
				'height': maxHeight + 'px',
				'margin-left': '-' + (maxWidth / 2 + 10) + 'px',
				'margin-top': '-' + (maxHeight / 2 + 10) + 'px'
			});
			
			if (options.escapeClose == true) {
				function onDocumentKeyup(e) {
				if (e.keyCode === 27) {
					deactivate();
				}
			}
			}
			
			if (options.documentClose == true) {
				function onDocumentClick(e) {
				if ($(e.target).is('.avgrund-overlay')) {
					deactivate();
				}
			}
			}

			if (options.showClose == true) {
				$('.avgrund-popin').append('<a href="#" class="avgrund-close">' + options.showCloseText + '</a>');
			}

			if (options.enableStackAnimation == true) {
				$('.avgrund-popin').addClass('stack');
			}

			function onDocumentClick(e) {
				if ($(e.target).is('.avgrund-close')) {
					deactivate();
				}
			}

			// show popup
			function activate() {
				body.bind('keyup', onDocumentKeyup);
				body.bind('click', onDocumentClick);

				body.addClass('avgrund-active');
			}

			// hide popup
			function deactivate() {
				body.unbind('keyup', onDocumentKeyup);
				body.unbind('click', onDocumentClick);

				body.removeClass('avgrund-active');
			}

			// init on click
			$(this).click(function(e) {
				e.stopPropagation();

				activate();
			});
		});

	}
})(jQuery)