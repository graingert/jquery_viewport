/*
 * Viewport - jQuery selectors for finding elements in viewport
 *
 * Copyright (c) 2008-2009 Mika Tuupola
 *
 * Licensed under the MIT license:
 *   http://www.opensource.org/licenses/mit-license.php
 *
 * Project home:
 *  http://www.appelsiini.net/projects/viewport
 *
 */
(function($) {

    $.belowthefold = function(element, settings) {
        var fold = $(window).height() + $(window).scrollTop();
        return fold <= Math.round($(element).offset().top) - settings.threshold;
    };

    $.abovethetop = function(element, settings) {
        var top = $(window).scrollTop();
        return top >= Math.round($(element).offset().top) + $(element).height() - settings.threshold;
    };

    $.rightofscreen = function(element, settings) {
        var fold = $(window).width() + $(window).scrollLeft();
        return fold <= Math.round($(element).offset().left) - settings.threshold;
    };

    $.leftofscreen = function(element, settings) {
        var left = $(window).scrollLeft();
        return left >= Math.round($(element).offset().left) + $(element).width() - settings.threshold;
    };

    $.inviewport = function(element, settings) {
        var $element = $(element);
        var offset = $element.offset();

        // Return false if element is hidden.
        if (!$element.is(':visible')) {
            return false;
        }

        var $window = $(window);
        var windowTop = $window.scrollTop();
        var threshold = settings.threshold;

        if (offset.top - threshold < windowTop) {
            if (offset.top + $element.height() + threshold >= windowTop) {
                // top edge below the window's top
            } else {
                return false;
            }
        } else {
            if (offset.top - threshold <= windowTop + $window.height()) {
                // bottom edge above the window's bottom
            } else {
                return false;
            }
        }

        var windowLeft = $window.scrollLeft();

        if (offset.left - threshold < windowLeft) {
            if (offset.left + $element.width() + threshold >= windowLeft) {
                // left edge be on the left side of the window's left edge
            } else {
                return false;
            }
        } else {
            if (offset.left - threshold <= windowLeft + $window.width()) {
                // right edge be on the right side of the window's right edge
            } else {
                return false;
            }
        }

        return true;
    };

    $.extend($.expr[':'], {
        "below-the-fold": function(a, i, m) {
            // m[3] is supposedly the threshold (@theluk)
            return $.belowthefold(a, {threshold : parseInt(m[3]) || 0});
        },
        "above-the-top": function(a, i, m) {
            // m[3] is supposedly the threshold (@theluk)
            return $.abovethetop(a, {threshold : parseInt(m[3]) || 0});
        },
        "left-of-screen": function(a, i, m) {
            // m[3] is supposedly the threshold (@theluk)
            return $.leftofscreen(a, {threshold : parseInt(m[3]) || 0});
        },
        "right-of-screen": function(a, i, m) {
            // m[3] is supposedly the threshold (@theluk)
            return $.rightofscreen(a, {threshold : parseInt(m[3]) || 0});
        },
        "in-viewport": function(a, i, m) {
            // m[3] is supposedly the threshold (@theluk)
            return $.inviewport(a, {threshold : parseInt(m[3]) || 0});
        }
    });
})(jQuery);
