/**
 *  jQuery Avgrund Popin Plugin
 *  http://github.com/voronianski/jquery.avgrund.js/
 *
 *  (c) 2012-2013 http://pixelhunter.me/
 *  MIT licensed
 */

(function ($) {
	$.fn.avgrund = function (options) {
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
			onLoad: false,
			onUnload: false,
			template: '<p>This is test popin content!</p>'
		};

		options = $.extend(defaults, options);

		return this.each(function() {
			var self = $(this),
				body = $('body'),
				maxWidth = options.width > 640 ? 640 : options.width,
				maxHeight = options.height > 350 ? 350 : options.height,
				template = typeof options.template === 'function' ? options.template(self) : options.template;

			body.addClass('avgrund-ready')
				.append($('<div/>', {class: 'avgrund-overlay'}).addClass(options.overlayClass));

			if (options.onBlurContainer !== '') {
				$(options.onBlurContainer).addClass('avgrund-blur');
			}

			function onDocumentKeyup (e) {
				if (options.closeByEscape) {
					if (e.keyCode === 27) {
						deactivate();
					}
				}
			}

			function onDocumentClick (e) {
				if (options.closeByDocument) {
					if ($(e.target).is('.avgrund-overlay, .avgrund-close')) {
						e.preventDefault();
						deactivate();
					}
				} else if ($(e.target).is('.avgrund-close')) {
					e.preventDefault();
					deactivate();
				}
			}

			function activate () {
				if (typeof options.onLoad === 'function') {
					options.onLoad(self);
				}

				setTimeout(function() {
					body.addClass('avgrund-active');
				}, 100);

				body.append($('<div/>', {
						class: 'avgrund-popin',
						html: template
					}).addClass(options.holderClass)
				);

				$('.avgrund-popin').css({
					'width': maxWidth + 'px',
					'height': maxHeight + 'px',
					'margin-left': '-' + (maxWidth / 2 + 10) + 'px',
					'margin-top': '-' + (maxHeight / 2 + 10) + 'px'
				});

				options.showClose && $('.avgrund-popin').append('<a href="#" class="avgrund-close">' + options.showCloseText + '</a>');

				options.enableStackAnimation && $('.avgrund-popin').addClass('stack');

				body.bind('keyup', onDocumentKeyup).bind('click', onDocumentClick);
			}

			function deactivate () {
				body.unbind('keyup', onDocumentKeyup)
					.unbind('click', onDocumentClick)
					.removeClass('avgrund-active');

				setTimeout(function() {
					$('.avgrund-popin').remove();
				}, 500);

				if (typeof options.onUnload === 'function') {
					options.onUnload(self);
				}
			}

			if (options.openOnEvent) {
				self.bind(options.setEvent, function (e) {
					e.stopPropagation();

					if ($(e.target).is('a')) {
						e.preventDefault();
					}

					activate();
				});
			} else {
				activate();
			}
		});
	};
})(jQuery);
