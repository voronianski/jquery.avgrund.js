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
			onLoad: function() {},
			onUnload: function() {},
			template: '<p>This is test popin content!</p>'
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
				// check if onLoad is a function and call it before popin is active
				if (typeof options.onLoad == 'function') {
					options.onLoad.call(self);
				}

				body.bind('keyup', onDocumentKeyup);
				body.bind('click', onDocumentClick);

				body.addClass('avgrund-active');
			}

			// hide popup
			function deactivate() {
				body.unbind('keyup', onDocumentKeyup);
				body.unbind('click', onDocumentClick);

				body.removeClass('avgrund-active');

				// check if onUnload is a function and call it after popin is closed
				if (typeof options.onUnload == 'function') {
					options.onUnload.call(self);
				}
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

	}
})(jQuery)