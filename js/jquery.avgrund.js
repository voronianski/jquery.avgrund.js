/**
 *  jQuery Avgrund Popin Plugin
 *  http://github.com/voronianski/jquery.avgrund.js/
 * 
 *  MIT licensed, (c) 2012 http://pixelhunter.me/
 */

(function($) {
	$.fn.avgrund = function(options) {
		var defaults = {
			width: 380, // max = 640
			height: 280, // max = 350
			showClose: false,
			showCloseText: '',
			closeByEscape: true,
			closeByDocument: true,
			holderClass: '',
			overlayClass: '',
			enableStackAnimation: false,
			onBlurContainer: '',
			openOnEvent: true,
			setEvent: 'click',
			template: '<p>This is test popin content!</p>',
			onLoad: function() {}, //Callback to execute something before dialog is loaded.
			onUnload: function() {} //Callback to execute something after dialog is closed.
		};
		var options = $.extend(defaults, options);

		return this.each(function() {
			var self = $(this),
				body = $('body'),
				maxWidth = options.width > 640 ? 640 : options.width,
				maxHeight = options.height > 350 ? 350 : options.height,
				template = typeof options.template == 'function' ? options.template(self) : options.template;

			body.addClass('avgrund-ready');
			body.append('<div class="avgrund-overlay ' + options.overlayClass + '"></div>');				
			body.append('<div class="avgrund-popin ' + options.holderClass + '">' + template + '</div>');

			$('.avgrund-popin').css({
				'width': maxWidth + 'px',
				'height': maxHeight + 'px',
				'margin-left': '-' + (maxWidth / 2 + 10) + 'px',
				'margin-top': '-' + (maxHeight / 2 + 10) + 'px'
			});

			if (options.showClose) {
				$('.avgrund-popin').append('<a href="#" class="avgrund-close">' + options.showCloseText + '</a>');
			}

			if (options.enableStackAnimation) {
				$('.avgrund-popin').addClass('stack');
			}

			if (options.onBlurContainer != '') {
				$(options.onBlurContainer).addClass('avgrund-blur');
			}
			
			// close popup by clicking Esc button
			function onDocumentKeyup(e) {
				if (options.closeByEscape) {
					if (e.keyCode === 27) {
						deactivate();
					}
				}
			}
			
			// close popup by clicking outside it
			function onDocumentClick(e) {
				if (options.closeByDocument) {
					if ($(e.target).is('.avgrund-overlay, .avgrund-close')) {
						deactivate();
					}
				} else {
					if ($(e.target).is('.avgrund-close')) {
						deactivate();
					}	
				}
			}

			// show popup
			function activate() {
				if(typeof options.onLoad == 'function') //Check if callback is a function
					options.onLoad.call(this); //Call the function before dialog is loaded
				
				body.bind('keyup', onDocumentKeyup);
				body.bind('click', onDocumentClick);

				body.addClass('avgrund-active');
			}

			// hide popup
			function deactivate() {
				body.unbind('keyup', onDocumentKeyup);
				body.unbind('click', onDocumentClick);

				body.removeClass('avgrund-active');

				if(typeof options.onUnload == 'function')
					options.onUnload.call(this);
			}

			// init on click or custom event
			if (options.openOnEvent) {
				self.bind(options.setEvent, function(e) {
					e.stopPropagation();
					activate();
				});
			} else {
				activate();
			}
		});
	};
})(jQuery);