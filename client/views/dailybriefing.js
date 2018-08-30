var moment = require('moment');
var tz = require('moment-timezone');
var briefingFilterRoutes = require('../views/briefing_filter');

$(function () {
    /* close actions */

    $('#swoosh-briefingPanelGroups').on('tap', '.swoosh-dailybriefingView .head-action-close', function () {
        localStorage.removeItem('swoosh_briefings_current');
        var tracePanel = $(this).parents('.swoosh-dailybriefingView');
        $(tracePanel).find('.briefingContainer-view').attr('banana-status', '0');
        $(tracePanel).banana({set: ['inactivetrans', 'callback'],
            duration: 400,
            transform: {data: "0, 100%, 0"},
            callback: function () {
                $(tracePanel).remove();
            }
        });
    });

    $('#swoosh-briefingPanelGroups').on('tap', '.swoosh-dailybriefingView .head-info', function () {
        var tracePanel = $(this).parents('.swoosh-dailybriefingView');
        $(tracePanel).find('.briefingContainer-view').animate({ scrollTop: 0 }, 100);
    });

    $('#swoosh-briefingPanelGroups').on('tap', '.swoosh-dailybriefingView .head-action-addtag', function () {
        var traceData = $(this).parents('.swoosh-dailybriefingView').find('.dailybriefingTag').text();
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

    $('#swoosh-briefingPanelGroups').on('tap', '.swoosh-dailybriefingView .stories-foldarea', function () {
        if (deviceWide()) return;
        var tracePanel = $(this).parent();
        if ($(tracePanel).attr('swoosh-current') == 'folded') {
            $(tracePanel).attr('swoosh-current', 'opened');
        } else {
            $(tracePanel).attr('swoosh-current', 'folded');
        }
    });

    $('#swoosh-briefingPanelGroups').on('tap', '.swoosh-dailybriefingView .briefingContainer-tabs li', function () {
        var thisobj = $(this);
        if ($(thisobj).attr('swoosh-object-status') == 'inactive') {
            var currentTab = $(thisobj).parents('.swoosh-dailybriefingView').find('.briefingContainer-tabs').find('li[swoosh-object-status="active"]');
            var currentView = $(thisobj).parents('.swoosh-dailybriefingView').find('.briefingContainer-view').find('.bfP-view[banana-status="1"]');
            $(currentTab).attr('swoosh-object-status', 'inactive');
            $(currentView).attr('banana-status', '0');

            $(thisobj).attr('swoosh-object-status', 'active');
            var id = $(thisobj).attr('swoosh-object-id');
            $(thisobj).parents('.swoosh-dailybriefingView').find('.briefingContainer-view').find('.bfP-view[swoosh-object-id="' + id + '"]').attr('banana-status', '1');
        }
    });

    $('#swoosh-briefingPanelGroups').on('tap', '.swoosh-dailybriefingView .briefingContainer-tabs li .tabitem-action-close', function () {
        var thisobj = $(this).parent('li');
        if ($(thisobj).attr('swoosh-object-status') == 'active') {
            var pendingTab = $(thisobj).parents('.swoosh-dailybriefingView').find('.briefingContainer-tabs').find('li[swoosh-object-status="inactive"]')[0];
            var pendingView = $(thisobj).parents('.swoosh-dailybriefingView').find('.briefingContainer-view').find('.bfP-view[banana-status="0"]')[0];
            $(pendingTab).attr('swoosh-object-status', 'active');
            $(pendingView).attr('banana-status', '1');

            var id = $(thisobj).attr('swoosh-object-id');
            $(thisobj).parents('.swoosh-dailybriefingView').find('.briefingContainer-view').find('.bfP-view[swoosh-object-id="' + id + '"]').remove();
            $(thisobj).remove();
        } else {
            var id = $(thisobj).attr('swoosh-object-id');
            $(thisobj).parents('.swoosh-dailybriefingView').find('.briefingContainer-view').find('.bfP-view[swoosh-object-id="' + id + '"]').remove();
            $(thisobj).remove();
        }
    });


    $('#swoosh-briefingPanelGroups').on('tap', '.swoosh-dailybriefingView .briefing-newtab', function () {
        var targetview = $(this).parents('.swoosh-dailybriefingView').find('.bfP-newBriefingSetRequestview');
        $('#swoosh-briefingload-indicator').attr('banana-status', '1');
        $('#swoosh-dimlayer-main').attr('banana-status', '1');

        $.ajax({
            type: 'GET',
            url: 'https://swoosh.inthenewsrooms.com/subscribers/config/briefings/comparepreset/',
            headers: { 'x-access-token': swooshToken() },
            contentType: "application/json",
            dataType: 'json'
        })
        .done(function (data) {
            $(targetview).banana({set: ['activetrans', 'callback'],
                duration: 400,
                transform: {data: "0, 0, 0"},
                callback: function () {
                }
            });

            $('#swoosh-briefingload-indicator').attr('banana-status', '0');
            $('#swoosh-dimlayer-main').attr('banana-status', '0');

            if (data.presets != null && data.presets.length > 0) {
                var presetArray = data;
                $(targetview).find('ul.sourcepresets').empty();
                $(targetview).find('ul.sourcepresets').append(comparepresetItem_tp(presetArray));
            }
            
        })
        .fail(function (data, textStatus) {
            $('#swoosh-briefingload-indicator').attr('banana-status', '0');
            $('#swoosh-dimlayer-main').attr('banana-status', '0');
            if (data.responseText) {
                var res = $.parseJSON(data.responseText);
                var errMsg = res.error.message;

                if (errMsg == "NO_SUBSCRIBERS" || errMsg == "INVALID_SUBSCRIBER_CREDENTIAL" || errMsg.indexOf('FAILED_AUTH') != -1) {
                    sessionExpired();
                } else {
                    errorHandler("Unable to load the compare preset", "It seems like there might be a network problem. Please check your wireless connection and try again.");
                }
            } else {
                errorHandler("Unable to load the compare preset", "It seems like there might be a network problem. Please check your wireless connection and try again.");
            }
        });
    });

    /* filter view */

    $('#swoosh-briefingPanelGroups').on('tap', '.swoosh-dailybriefingView .bfP-sectionFilterview .view-action-confirm', function () {
        var excludeSections = [];
        $(this).parent().find('li[swoosh-current="selected"]').each(function () {
            var group = "";
            switch ($(this).attr('swoosh-object-data')) {
                case 'usasociety':
                    group = 'usasociety';
                    break;
                case 'usapolitics':
                    group = 'usapolitics';
                    break;
                case 'usaopnions':
                    group = 'usaopnions';
                    break;
                case 'usatechindustry':
                    group = 'usatechindustry';
                    break;
                case 'usabusiness':
                    group = 'usabusiness';
                    break;
                case 'usasports':
                    group = 'usasports';
                    break;
                case 'usafinance':
                    group = 'usafinance';
                    break;
                case 'western-en-gaming':
                    group = 'gaming';
                    break;
                case 'western-en-world':
                    group = 'world';
                    break;
            }

            excludeSections.push(group);
        });

        briefingFilterRoutes.filterArticlesBySection($(this).parents('.swoosh-dailybriefingView'), excludeSections);
        $(this).parents('.bfP-sectionFilterview').banana({set: ['0']});
    });

    $('#swoosh-briefingPanelGroups').on('tap', '.swoosh-dailybriefingView .bfP-sectionFilterview li', function () {
        if ($(this).attr('swoosh-current') != 'selected') {
            $(this).attr('swoosh-current', 'selected');
        } else {
            $(this).attr('swoosh-current', '');
        }
    });

    $('#swoosh-briefingPanelGroups').on('tap', '.swoosh-dailybriefingView .head-action-sectionfilter', function () {
        $(this).parents('.swoosh-dailybriefingView').find('.bfP-sectionFilterview').banana({set: ['1']});
    });
    
    /* listview story toggle */

    $('#swoosh-briefingPanelGroups').on('tap', '.swoosh-dailybriefingView .story-action-toggle', function () {
        var tracePanel = $(this).parents('li').find('.story-others');
        if ($(tracePanel).attr('banana-status') == '0') {
            $(this).attr('swoosh-current', 'opened');
            $(tracePanel).attr('banana-status', '1');
        } else {
            $(this).attr('swoosh-current', 'closed');
            $(tracePanel).attr('banana-status', '0');
        }
    });

    /* listmode - sentiment highlight */

    $('#swoosh-briefingPanelGroups').on('tap', '.swoosh-dailybriefingView .sentiment-data > div', function () {
        var type = $(this).attr('swoosh-object-data');
        $(this).parents('.swoosh-dailybriefingView').find('.bfP-storieslist').find('div[swoosh-object-type="briefingstory"]').each(function () {
            var thisObj = $(this);
            if (type == 'highpos' && $(thisObj).attr('swoosh-object-sentiment') >= 6) {
                $(thisObj).attr('swoosh-current', 'focuspoint');
                if ($(thisObj).hasClass('storyObj')) {
                    if ($(thisObj).parents('li').find('.story-action-toggle').attr('swoosh-current') == 'closed') {
                        $(thisObj).parents('li').find('.story-action-toggle').trigger('tap');
                    }
                }
            } else if (type == 'normalpos' && $(thisObj).attr('swoosh-object-sentiment') >= 4 && $(thisObj).attr('swoosh-object-sentiment') < 6) {
                $(thisObj).attr('swoosh-current', 'focuspoint');
                if ($(thisObj).hasClass('storyObj')) {
                    if ($(thisObj).parents('li').find('.story-action-toggle').attr('swoosh-current') == 'closed') {
                        $(thisObj).parents('li').find('.story-action-toggle').trigger('tap');
                    }
                }
            } else if (type == 'normalneg' && $(thisObj).attr('swoosh-object-sentiment') <= -4 && $(thisObj).attr('swoosh-object-sentiment') > -6) {
                $(thisObj).attr('swoosh-current', 'focuspoint');
                if ($(thisObj).hasClass('storyObj')) {
                    if ($(thisObj).parents('li').find('.story-action-toggle').attr('swoosh-current') == 'closed') {
                        $(thisObj).parents('li').find('.story-action-toggle').trigger('tap');
                    }
                }
            } else if (type == 'highneg' && $(thisObj).attr('swoosh-object-sentiment') <= -6) {
                $(thisObj).attr('swoosh-current', 'focuspoint');
                if ($(thisObj).hasClass('storyObj')) {
                    if ($(thisObj).parents('li').find('.story-action-toggle').attr('swoosh-current') == 'closed') {
                        $(thisObj).parents('li').find('.story-action-toggle').trigger('tap');
                    }
                }
            }
        });

        if ($(this).parents('.swoosh-dailybriefingView').find('.bfP-storieslist').find('div[swoosh-current="focuspoint"]').length > 0) {
            if (deviceWide()) {
                var firstobj = $(this).parents('.swoosh-dailybriefingView').find('.allstories-group').find('div[swoosh-current="focuspoint"]')[0];
                $(this).parents('.swoosh-dailybriefingView').find('.allstories-group').scrollTo(firstobj, 200, {offset: -50});
                $(this).parents('.swoosh-dailybriefingView').attr('swoosh-current', 'focuspointmode');
            } else {
                var firstobj = $(this).parents('.swoosh-dailybriefingView').find('.bfP-storieslist').find('div[swoosh-current="focuspoint"]')[0];
                $(this).parents('.swoosh-dailybriefingView').find('.allstories-group').attr('swoosh-current', 'opened');
                $(this).parents('.swoosh-dailybriefingView').find('.briefingContainer-view').scrollTo(firstobj, 200, {offset: -50});
                $(this).parents('.swoosh-dailybriefingView').attr('swoosh-current', 'focuspointmode');
            }
            
        }
    });

    /* listmode - focuspoint jump */

    $('#swoosh-briefingPanelGroups').on('tap', '.swoosh-dailybriefingView .bfP-focuspoints li', function () {
        var traceContent = $(this).children('span').text().split(' ');
        $(this).parents('.swoosh-dailybriefingView').find('.bfP-storieslist').find('.storyHeadTitle').each(function () {
            var thisObj = $(this);
            var e = traceContent.filter(function (key) {
                if ($(thisObj).text().toLowerCase().indexOf(key.toLowerCase()) != -1) {
                    return key;
                }
            });

            if (e.length >= traceContent.length) {
                $(thisObj).parents('div[swoosh-object-type="briefingstory"]').attr('swoosh-current', 'focuspoint');
                if ($(thisObj).parents('div[swoosh-object-type="briefingstory"]').hasClass('storyObj')) {
                    if ($(thisObj).parents('li').find('.story-action-toggle').attr('swoosh-current') == 'closed') {
                        $(thisObj).parents('li').find('.story-action-toggle').trigger('tap');
                    }
                }
            }
        });

        if ($(this).parents('.swoosh-dailybriefingView').find('.bfP-storieslist').find('div[swoosh-current="focuspoint"]').length > 0) {
            if (deviceWide()) {
                var firstobj = $(this).parents('.swoosh-dailybriefingView').find('.allstories-group').find('div[swoosh-current="focuspoint"]')[0];
                $(this).parents('.swoosh-dailybriefingView').find('.allstories-group').scrollTo(firstobj, 200, {offset: -50});
                $(this).parents('.swoosh-dailybriefingView').attr('swoosh-current', 'focuspointmode');
            } else {
                var firstobj = $(this).parents('.swoosh-dailybriefingView').find('.bfP-storieslist').find('div[swoosh-current="focuspoint"]')[0];
                $(this).parents('.swoosh-dailybriefingView').find('.allstories-group').attr('swoosh-current', 'opened');
                $(this).parents('.swoosh-dailybriefingView').find('.briefingContainer-view').scrollTo(firstobj, 200, {offset: -50});
                $(this).parents('.swoosh-dailybriefingView').attr('swoosh-current', 'focuspointmode');
            }
        }
    });

    /* listview - exit focuspoint jump mode */

    $('#swoosh-briefingPanelGroups').on('tap', '.swoosh-dailybriefingView .bfP-modebar', function () {
        $(this).parents('.swoosh-dailybriefingView').find('div[swoosh-current="focuspoint"]').each(function () {
            $(this).attr('swoosh-current', '');
        });

        $(this).parents('.swoosh-dailybriefingView').find('.story-action-toggle[swoosh-current="opened"]').each(function () {
            $(this).trigger('tap');
        });

        if (deviceWide()) {
            $(this).parents('.swoosh-dailybriefingView').find('.allstories-group').animate({ scrollTop: 0 }, 100);
        } else {
            var target = $(this).parents('.swoosh-dailybriefingView').find('.head-info-group');
            $(this).parents('.swoosh-dailybriefingView').find('.briefingContainer-view').scrollTo(target, 100);
        }

        $(this).parents('.swoosh-dailybriefingView').attr('swoosh-current', '');
    });


    /* briefing story tap/more actions */

    $('#swoosh-briefingPanelGroups').on('tap', '.swoosh-dailybriefingView div[swoosh-object-type="briefingstory"]', function (event) {
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
                var tracePanel = $(this).parents('.swoosh-dailybriefingView').attr('swoosh-object-id');
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

                    if ($(this).parents('.swoosh-dailybriefingView').attr('swoosh-object-type') == 'curation') {
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