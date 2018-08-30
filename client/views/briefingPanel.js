var moment = require('moment');
var tz = require('moment-timezone');
var briefingFilterRoutes = require('../views/briefing_filter');

$(function () {
    /* close actions */

    $('#swoosh-briefingPanelGroups').on('tap', '.swoosh-briefingPanel .head-action-close', function () {
        localStorage.removeItem('swoosh_briefings_current');
        var tracePanel = $(this).parents('.swoosh-briefingPanel');
        $(tracePanel).find('.bfP-focus').find('.focusview-stories').attr('banana-status', '0');
        $(tracePanel).banana({set: ['inactivetrans', 'callback'],
            duration: 400,
            transform: {data: "0, 100%, 0"},
            callback: function () {
                $(tracePanel).remove();
            }
        });
    });

    $('#swoosh-briefingPanelGroups').on('tap', '.swoosh-briefingPanel .bfP-focus .view-title', function () {
        var tracePanel = $(this).parents('.swoosh-briefingPanel').find('.focusview-stories');
        $(tracePanel).animate({ scrollTop: 0 }, 100);
    });

    $('#swoosh-briefingPanelGroups').on('tap', '.swoosh-briefingPanel .bfP-focus .view-action-close', function () {
        var tracePanel = $(this).parents('.bfP-focus');
        if ($(this).parents('.swoosh-briefingPanel').attr('swoosh-object-type') == 'all' || $(this).parents('.swoosh-briefingPanel').attr('swoosh-object-type') == 'curation') {
            tracePanel = $(this).parents('.swoosh-briefingPanel');
            localStorage.removeItem('swoosh_briefings_current');
        }
        
        $(tracePanel).banana({set: ['inactivetrans', 'callback'],
            duration: 400,
            transform: {data: "0, 100%, 0"},
            callback: function () {
                $(tracePanel).remove();
            }
        });
    });

    $('#swoosh-briefingPanelGroups').on('tap', '.swoosh-briefingPanel .bfP-focus .focus-end', function () {
        var tracePanel = $(this).parents('.bfP-focus');
        if ($(this).parents('.swoosh-briefingPanel').attr('swoosh-object-type') == 'curation') {
            localStorage.removeItem('swoosh_briefings_current');
            tracePanel = $(this).parents('.swoosh-briefingPanel');
            $(tracePanel).banana({set: ['inactivetrans', 'callback'],
                duration: 400,
                transform: {data: "0, 100%, 0"},
                callback: function () {
                    $(tracePanel).remove();
                }
            });
        } else {
            $(tracePanel).banana({set: ['0', 'callback'],
                callback: function () {
                    $(tracePanel).find('.focus-cover').attr('banana-status', '1');
                    $(tracePanel).find('.view-title').attr('banana-status', '0');
                }
            });
        }
    });

    $('#swoosh-briefingPanelGroups').on('tap', '.swoosh-briefingPanel .bfP-focus .focus-all-end', function () {
        var tracePanel = $(this).parents('.swoosh-briefingPanel');
        $(tracePanel).banana({set: ['inactivetrans', 'callback'],
            duration: 400,
            transform: {data: "0, 100%, 0"},
            callback: function () {
                $(tracePanel).remove();
            }
        });
    });

    /* add tag button - focus mode */

    $('#swoosh-briefingPanelGroups').on('tap', '.swoosh-briefingPanel .bfP-focus .view-action-addtag', function () {
        var traceData = $(this).parents('.bfP-focus').find('.view-title').find('p').text();
        var tzConfig = localStorage.getItem("swoosh_briefing_tz");
        var timezoneParam = 'America/Los_Angeles';
        if (tzConfig != null) {
            switch (tzConfig) {
                case 'US_WEST':
                    timezoneParam = 'America/Los_Angeles';
                    break;
                case 'US_MOUNTAIN':
                    timezoneParam = 'America/Denver';
                    break;
                case 'US_CENTRAL':
                    timezoneParam = 'America/Chicago';
                    break;
                case 'US_EAST':
                    timezoneParam = 'America/New_York';
                    break;
            }
        }
        var subscriberHourConfig = parseInt(localStorage.getItem("swoosh_briefing_hour"));
        var thisHour = moment(moment(new Date)).tz(timezoneParam).format('HH:mm').split(':');
        if (thisHour[0] == subscriberHourConfig) {
            if ((parseInt(thisHour[1]) >= 46) && (parseInt(thisHour[1]) <= 48)) {
                errorHandler("Please wait for a few mins", "We're creating new daily briefings for you right now, hence you can't add or edit any briefing tags for the next two minutes.");
                return;
            }
        }

        $('#swoosh-addBriefingTag-view').find('#addNewBriefingTagField').val(traceData);
        $('#swoosh-addBriefingTag-view .addTag-suggestions').attr('banana-status', '0');
        $('#swoosh-addBriefingTag-view').banana({set: ['activetrans', 'callback'],
            duration: 400,
            transform: {data: "0, 0, 0"},
            callback: function () {
            }
        });
    });

    /* briefing story tap/more actions */

    $('#swoosh-briefingPanelGroups').on('tap', '.swoosh-briefingPanel div[swoosh-object-type="briefingstory"]', function (event) {
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
            var thisObjectId = $(this).attr('swoosh-object-array');
            var hstype = $('.main-briefingHome-view').find('.hs-type-selection').find('.type-selection').attr('swoosh-object-data');
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
                var tracePanel = $(this).parents('.swoosh-briefingPanel').attr('swoosh-object-id');
                if (traceLink != "" && traceLink != undefined && traceLink != "none") {
                    var data = {
                        "options": [
                            {
                                "key": "sharestory",
                                "text": "Share this story",
                                "info": traceLink
                            },
                            {
                                "key": "saveforlater",
                                "text": "Save this for later",
                                "info": thisObjectId
                            }
                        ]
                    };

                    $('#swoosh-actionsheet-view ul').empty();
                    $('#swoosh-actionsheet-view ul').append(actionsheet_tp(data));

                    if ($(this).parents('.swoosh-briefingPanel').attr('swoosh-object-type') == 'curation') {
                        $('#swoosh-actionsheet-view').attr('swoosh-object-data', 'deskbriefing-moreoptions');
                    } else {
                        $('#swoosh-actionsheet-view').attr('swoosh-object-data', 'briefingstory-moreoptions');
                    }
                    $('#swoosh-actionsheet-view').attr('swoosh-object-type', tracePanel);
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