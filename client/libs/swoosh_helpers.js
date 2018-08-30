$(function () {
/*!
 * (c) Todd Oh. All rights reserved.
 *
 * built by Todd
 */

var escapeHTML = (function () {
    'use strict';
    var chr = {
        '<': '&lt;',  '>': '&gt;'
    };
    return function (text) {
        return text.replace(/[\"&<>]/g, function (a) { return chr[a]; });
    };
}());

window.escapeHTML = escapeHTML;

function resizeInput() {
    var max_width = 70;
    if ($(this).val().length < max_width) $(this).attr('size', $(this).val().length);
}

window.resizeInput = resizeInput;

$.expr[":"].containsNoCase = function(el, i, m) {
    var search = m[3];
    if (!search) return false;
    return new RegExp(search, "i").test($(el).text());
};

$.fn.searchFilter = function(options) {
    var opt = $.extend({
        targetSelector: "",
        charCount: 1,
        after: function() {}
    }, options);

    return this.each(function() {
        var $el = $(this);
        $el.keyup(function() {
            var search = $(this).val();
            var $target = $(opt.targetSelector);
            $target.show();

            if (search && search.length >= opt.charCount)
                $target.not(":containsNoCase(" + search + ")").hide();

            opt.after();
        });
    });
};

function getObjects (obj, key, val) {
    var objects = [];
    for (var i in obj) {
        if (!obj.hasOwnProperty(i)) continue;
        if (typeof obj[i] == 'object') {
            objects = objects.concat(getObjects(obj[i], key, val));
        } else if (i == key && obj[key] == val) {
            objects.push(obj);
        }
    }
    return objects;
}

window.getObjects = getObjects;

});
