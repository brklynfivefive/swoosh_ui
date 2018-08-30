var briefingInfoRoutes = require('../subscriber/loadBriefingConfig');
var savedStoriesRoutes = require('../subscriber/loadSavedStories');
var actionsheetRoutes_stories = require('../views/actionsheet_func_stories');
var actionsheetRoutes_signup = require('../views/actionsheet_func_signup');

$(function () {
    $('#swoosh-popupsheet-view').on('tap', '.popupsheet-options > div', function () {
        if ($(this).hasClass('popupsheet-action-okay')) {
            popupsheet_okayfunctions($('#swoosh-popupsheet-view').attr('swoosh-object-data'));
        } else if ($(this).hasClass('popupsheet-action-decline')) {
            var dataset = JSON.parse($('#swoosh-popupsheet-view').attr('swoosh-object-data'));
            $('body').find('li[swoosh-temp-await-id=' + dataset.ref_object1 + ']').removeAttr('swoosh-temp-await-id');
            $('#swoosh-dimlayer-main').banana({set: ['0']});
        }

        $('#swoosh-popupsheet-view').banana({set: ['inactivetrans', 'callback'],
            duration: 400,
            transform: {data: "0, 400px, 0"},
            callback: function () {
                $('#swoosh-popupsheet-view').find('.popupsheet-info-text').text('');
                $('#swoosh-popupsheet-view').attr('swoosh-object-data', '');
            }
        });
    });

    function popupsheet_okayfunctions(data) {
        var dataset = JSON.parse(data);
        switch (dataset.type) {
        case 'deletetag':
            var APIpostData = JSON.stringify({
                "tagid": dataset.id
            });

            $('#swoosh-network-indicator').attr('banana-status', '1');
            $('#swoosh-dimlayer-main').attr('banana-status', '1');
            
            $.ajax({
                type: 'POST',
                url: 'https://swoosh.inthenewsrooms.com/subscribers/keywords/remove/',
                headers: { 'x-access-token': swooshToken() },
                data: APIpostData,
                contentType: "application/json",
                dataType: 'json',
                timeout: 20000
            })
            .done(function (data) {
                $('#swoosh-network-indicator').attr('banana-status', '0');
                $('#swoosh-dimlayer-main').attr('banana-status', '0');

                $('body').find('li[swoosh-temp-await-id=' + dataset.ref_object1 + ']').remove();
                $('.main-updatenotice-bar .updateNoticeText').text('Successfully deleted the briefing tag');
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
                briefingInfoRoutes.briefingTagsArray();
            })
            .fail(function (data, textStatus) {
                $('#swoosh-network-indicator').attr('banana-status', '0');
                $('#swoosh-dimlayer-main').attr('banana-status', '0');
                
                if (data.responseText) {
                    var res = $.parseJSON(data.responseText);
                    var errMsg = res.error.message;

                    if (errMsg == "NO_SUBSCRIBERS" || errMsg == "INVALID_SUBSCRIBER_CREDENTIAL" || errMsg.indexOf('FAILED_AUTH') != -1) {
                        sessionExpired();
                    } else if (errMsg == "NO_BRIEFINGTAGS_EXIST") {
                        errorHandler("Unable to delete the tag", "It seems like your briefing tag doesn't exist. Please relaunch the app or sign in again.");
                    } else {
                        errorHandler("Unable to delete the tag", "It seems like there might be a network problem. Please check your wireless connection and try again.");
                    }
                } else {
                    errorHandler("Unable to delete the tag", "It seems like there might be a network problem. Please check your wireless connection and try again.");
                }
            });
            break;
        }
    }
});