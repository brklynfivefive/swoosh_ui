var indepthStoriesInfoRoutes = require('../subscriber/loadIndepthStories');

$(function () {
    $('.main-indepthStories-view').on('scroll', function () {
        if (deviceTypeAndroid() || deviceTypeiOS()) {
            var offset = $('.main-indepthStories-view').find('.today-info').offset();
            if (offset.top <= 10) {
                $('.main-indepthStories-view').find('.indepth-title').attr('banana-status', '1');
            } else {
                $('.main-indepthStories-view').find('.indepth-title').attr('banana-status', '0');
            }
        }
    });

    $('.main-indepthStories-view').on('tap', '.indepth-title', function () {
        $('.main-indepthStories-view').animate({ scrollTop: 0 }, 200);
    });

    $('.main-indepthStories-view').on('tap', '.today-info', function () {
        if ($('.main-indepthStories-view .indepthstoriesUpdatedTs').attr('swoosh-current') == 'failed') {
            indepthStoriesInfoRoutes.refreshIndepthStories();
        }
    });

    $('.main-indepthStories-view').on('tap', 'div[swoosh-object-type="indepthstory"]', function () {
        var traceLink = $(this).attr('swoosh-object-link');
        if (traceLink != "" && traceLink != undefined) {
            if (deviceTypeAndroid()) {
                window.androidsfo.openlink(traceLink);
            } else if (deviceTypeiOS()) {
                appbridge({"open_link": traceLink});
            }
            if (!deviceTypeAndroid() && !deviceTypeiOS()) window.open(traceLink,'_blank');
        }
    });

    $('.main-indepthStories-view').on('tap', 'li[swoosh-object-type="indepthstory"]', function () {
        var traceLink = $(this).attr('swoosh-object-link');
        if (traceLink != "" && traceLink != undefined) {
            if (deviceTypeAndroid()) {
                window.androidsfo.openlink(traceLink);
            } else if (deviceTypeiOS()) {
                appbridge({"open_link": traceLink});
            }
            if (!deviceTypeAndroid() && !deviceTypeiOS()) window.open(traceLink,'_blank');
        }
    });
});