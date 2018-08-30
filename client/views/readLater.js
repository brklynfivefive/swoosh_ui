var savedStoriesRoutes = require('../subscriber/loadSavedStories');

$(function () {
    $('.main-readLater-view').on('tap', '.readLater-none', function () {
        savedStoriesRoutes.refreshSavedStories();
    });

    $('.main-readLater-view').on('tap', 'li', function (event) {
        if (!$(event.target).hasClass('story-action-share') && !$(event.target).parent().hasClass('story-action-share') && !$(event.target).parent().parent().hasClass('story-action-share')) {
            var traceLink = $(this).attr('swoosh-object-link');
            if (traceLink != "" && traceLink != undefined && traceLink != "none") {
                if (deviceTypeAndroid()) {
                    window.androidsfo.openlink(traceLink);
                } else if (deviceTypeiOS()) {
                    appbridge({"open_link": traceLink});
                }
                if (!deviceTypeAndroid() && !deviceTypeiOS()) window.open(traceLink,'_blank');
            }
        } else {
            var thisObjectId = $(this).attr('swoosh-object-id');
            if (!$(event.target).hasClass('story-action-share') && !$(event.target).parent().hasClass('story-action-share') && !$(event.target).parent().parent().hasClass('story-action-share')) {
                var traceLink = $(this).attr('swoosh-object-link');
                if (traceLink != "" && traceLink != undefined && traceLink != "none") {
                    if (deviceTypeAndroid()) {
                        window.androidsfo.openlink(traceLink);
                    } else if (deviceTypeiOS()) {
                        appbridge({"open_link": traceLink});
                    }
                    if (!deviceTypeAndroid() && !deviceTypeiOS()) window.open(traceLink,'_blank');
                }
            } else {
                var traceLink = $(this).attr('swoosh-object-link');
                if (traceLink != "" && traceLink != undefined && traceLink != "none") {
                    var data = {
                        "options": [
                            {
                                "key": "sharestory",
                                "text": "Share this story",
                                "info": traceLink
                            },
                            {
                                "key": "removefromsavedstories",
                                "text": "Remove from the list",
                                "info": thisObjectId
                            }
                        ]
                    };

                    $('#swoosh-actionsheet-view ul').empty();
                    $('#swoosh-actionsheet-view ul').append(actionsheet_tp(data));
                    $('#swoosh-actionsheet-view').attr('swoosh-object-data', 'savedstories-moreoptions');
                    $('#swoosh-dimlayer-main').banana({set: ['1']});
                    $('#swoosh-actionsheet-view').banana({set: ['activetrans', 'callback'],
                        duration: 400,
                        transform: {data: "0, 0, 0"},
                        callback: function () {
                        }
                    });
                }
            }
        }
    });
});