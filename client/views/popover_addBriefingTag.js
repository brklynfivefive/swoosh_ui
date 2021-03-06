var moment = require('moment');
var tz = require('moment-timezone');
var briefingInfoRoutes = require('../subscriber/loadBriefingConfig');

$(function () {
    $('#swoosh-addBriefingTag-view .head-action-close').on('tap', function () {
        $('input, textarea').blur();
        $('#swoosh-addBriefingTag-view').banana({set: ['inactivetrans', 'callback'],
            duration: 400,
            transform: {data: "0, 100%, 0"},
            callback: function () {
                $('#swoosh-addBriefingTag-view #addNewBriefingTagField').val('');
                $('#swoosh-addBriefingTag-view .addTag-groups').empty();
                $('#swoosh-addBriefingTag-view .addTag-suggestions').attr('banana-status', '1');
            }
        });
    });

    $('#swoosh-addBriefingTag-view .addTag-suggestions').on('tap', 'li', function () {
        var text = $(this).find('.tagContainer').text();
        $('#swoosh-addBriefingTag-view #addNewBriefingTagField').val(text);
        $('#swoosh-addBriefingTag-view .head-action-confirm').trigger('tap');
    });

    $('#swoosh-addBriefingTag-view .head-action-confirm').on('tap', function () {
        var newtagstr = $('#swoosh-addBriefingTag-view').find('#addNewBriefingTagField').val().replace(/[.,#!\^\*;:{}="_`()%$&~+\\|\]\[><\/]/gm, '').replace(/\s{2,}/g, ' ');
        if (newtagstr == "" || newtagstr == "-" || newtagstr == "@" || !newtagstr.replace(/\s/g, '').length) {
            $('#swoosh-addBriefingTag-view .addTag-guide').banana({set: ['ani'], animation: "objShake"});
            return;
        }

        var APIpostData = JSON.stringify({
            "keyword": newtagstr
        });

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
            
        $('#swoosh-addBriefingTag-view .addBriefingTagTitleStatus').text('Adding The Briefing Tag');
        $('#swoosh-addBriefingTag-view .head-action-confirm').attr('banana-status', '0');
        $('#swoosh-network-indicator').attr('banana-status', '1');
        $('#swoosh-dimlayer-main').attr('banana-status', '1');

        $.ajax({
            type: 'POST',
            url: 'https://swoosh.inthenewsrooms.com/subscribers/keywords/',
            headers: { 'x-access-token': swooshToken() },
            data: APIpostData,
            contentType: "application/json",
            dataType: 'json',
            timeout: 20000
        })
        .done(function (data) {
            $('#swoosh-addBriefingTag-view .addTag-groups').empty();
            $('.main-updatenotice-bar .updateNoticeText').text('Successfully added the briefing tag');
            $('.main-updatenotice-bar').banana({set: ['activetrans', 'callback'],
                duration: 400,
                transform: {data: "0, 0, 0"},
                callback: function () {
                    setTimeout(function () {
                        $('.main-updatenotice-bar').banana({set: ['inactivetrans', 'callback'],
                            duration: 600,
                            transform: {data: "0, -200px, 0"},
                            callback: function () {
                                $('.main-updatenotice-bar .updateNoticeText').text('');
                            }
                        });
                    }, 3000);
                }
            });

            $('#swoosh-addBriefingTag-view .addBriefingTagTitleStatus').text('Add a new briefing');
            $('#swoosh-addBriefingTag-view .head-action-confirm').attr('banana-status', '1');
            $('#swoosh-network-indicator').attr('banana-status', '0');
            $('#swoosh-dimlayer-main').attr('banana-status', '0');

            briefingInfoRoutes.briefingTagsArray();
            $('#swoosh-addBriefingTag-view .head-action-close').trigger('tap');

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

            if ($('.main-manageTags-view .manageTags-tagslist').find('li').length <= 0) {
                $('.main-manageTags-view .manageTags-tagslist').attr('banana-status', '0');
            } else {
                $('.main-manageTags-view .manageTags-tagslist').attr('banana-status', '1');
            }
        })
        .fail(function (data, textStatus) {
            $('#swoosh-addBriefingTag-view .addBriefingTagTitleStatus').text('Add a new briefing');
            $('#swoosh-addBriefingTag-view .head-action-confirm').attr('banana-status', '1');
            $('#swoosh-network-indicator').attr('banana-status', '0');
            $('#swoosh-dimlayer-main').attr('banana-status', '0');
            
            if (data.responseText) {
                var res = $.parseJSON(data.responseText);
                var errMsg = res.error.message;

                if (errMsg == "NO_SUBSCRIBERS" || errMsg == "INVALID_SUBSCRIBER_CREDENTIAL" || errMsg.indexOf('FAILED_AUTH') != -1) {
                    sessionExpired();
                } else if (errMsg == "DUPLICATE_TAGS_FOUND") {
                    errorHandler("Unable to create a new briefing tag", "It seems like there's another briefing tag that's exactly the same as this one. Try another keyword.");
                } else {
                    errorHandler("Unable to create a new briefing tag", "It seems like there might be a network problem. Please check your wireless connection and try again.");
                }
            } else {
                errorHandler("Unable to create a new briefing tag", "It seems like there might be a network problem. Please check your wireless connection and try again.");
            }
        });
    });
});