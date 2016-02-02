/**
 *  jQuery Avgrund Popin Plugin
 *  http://github.com/voronianski/jquery.avgrund.js/
 *
 *  (c) http://pixelhunter.me/
 *  MIT licensed
 */

(function (factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD
        define(['jquery'], factory);
    } else if (typeof exports === 'object') {
        // CommonJS
        module.exports = factory;
    } else {
        // Browser globals
        factory(jQuery);
    }
}(function ($) {
    $.fn.avgrund = function (options) {
        var defaults = {
            width: 380, // max = 640
            height: 280, // max = 350
            showClose: false,
            showCloseText: '',
            closeByEscape: true,
            closeByDocument: true,
            windowScrollable: false,
            holderClass: '',
            overlayClass: '',
            enableStackAnimation: false,
            onBlurContainer: '',
            openOnEvent: true,
            setEvent: 'click',
            onLoad: false,
            onUnload: false,
            onClosing: false,
            template: '<p>This is test popin content!</p>'
        };

        options = $.extend(defaults, options);

        return this.each(function () {
            var self = $(this),
                body = $('body'),
                maxWidth = options.width > 640 ? 640 : options.width,
                maxHeight = options.height > 350 ? 350 : options.height,
                template = typeof options.template === 'function' ? options.template(self) : options.template;

            body.addClass('avgrund-ready');

            if ($('.avgrund-overlay').length === 0) {
                body.append('<div class="avgrund-overlay ' + options.overlayClass + '"></div>');
            }

            if (options.windowScrollable) {
                $(".avgrund-overlay").addClass('absolute-overlay');
            }else{
                $("html").addClass('avgrund-html-base');
                $("body").addClass('avgrund-html-base');
            }

            if(options.useTemplateTag){
                $(options.templateTag).css({display: 'none'});
            }

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
                var $popin = {};
                if (typeof options.onLoad === 'function') {
                    options.onLoad(self);
                }

                setTimeout(function () {
                    body.addClass('avgrund-active');
                }, 100);
                if(options.useTemplateTag){
                    $popin =$(options.templateTag);
                    $popin
                        .css({display: 'block'})
                        .addClass("avgrund-popin");
                }else{
                    $popin = $('<div class="avgrund-popin ' + options.holderClass + '"></div>');
                    $popin.append(template);
                    body.append($popin);
                }

                if (options.windowScrollable) {
                    var w = $(window);
                    var window_top = w.scrollTop();
                    var window_height = w.height();
                    var window_width = w.width();

                    var regex = new RegExp("([0-9]*)(%)");
                    var mutch_w = regex.exec(options.width);
                    var mutch_h= regex.exec(options.height);

                    maxWidth  = mutch_w? mutch_w[1] * window_width / 100 : options.height;
                    maxHeight  = mutch_h? mutch_h[1] * window_height / 100 : options.height;

                    $popin.css({
                        'top' : window_top +  window_height/2,
                        'width': maxWidth + 'px',
                        'height': maxHeight + 'px',
                        'margin-left': '-' + (maxWidth / 2 + 10) + 'px',
                        'margin-top': '-' + (maxHeight / 2 + 10) + 'px'
                    });
                    $(".avgrund-overlay").css({
                        'height': window_height * 2 + 'px',
                        'width': window_width * 2 + 'px',
                        'top': window_top - window_height/2  + 'px',
                        'left': - window_width/2  + 'px'
                    });
                }else{
                    $popin.css({
                        'width': maxWidth + 'px',
                        'height': maxHeight + 'px',
                        'margin-left': '-' + (maxWidth / 2 + 10) + 'px',
                        'margin-top': '-' + (maxHeight / 2 + 10) + 'px'
                    });
                }

                if (options.showClose) {
                    $popin.append('<a href="#" class="avgrund-close">' + options.showCloseText + '</a>');
                }

                if (options.enableStackAnimation) {
                    $popin.addClass('stack');
                }

                body.bind('keyup', onDocumentKeyup)
                    .bind('click', onDocumentClick);
            }

            function deactivate () {
                if (typeof options.onClosing === 'function') {
                    if (!options.onClosing(self)) {
                        return false;
                    }
                }

                body.unbind('keyup', onDocumentKeyup)
                    .unbind('click', onDocumentClick)
                    .removeClass('avgrund-active');

                $(".avgrund-overlay.absolute-overlay").css({
                    'height': '0px',
                    'top': "0px"
                });
                if(options.useTemplateTag){
                    $(options.templateTag).css({display: 'none'});
                }else{
                    setTimeout(function () {
                        $('.avgrund-popin').remove();
                    }, 500);
                }

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
}));
