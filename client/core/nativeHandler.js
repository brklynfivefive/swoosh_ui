var deviceTypeAndroid = require('../core/deviceDetect').deviceTypeAndroid;
var briefingInfoRoutes = require('../subscriber/loadBriefingConfig');
var todaybriefingRoutes = require('../subscriber/loadTodayBriefings');
var lateststoriesRoutes = require('../subscriber/loadLatestStories');
var savedStoriesRoutes = require('../subscriber/loadSavedStories');
var curationRoutes = require('../subscriber/loadCuration');
var loadnoticeRoutes = require('../core/notice');

var appbridge = exports.appbridge = function (ios) {
	if (window.webkit) {
        window.webkit.messageHandlers.sfo.postMessage(ios);
    } else {
        console.log(ios);
    }
}

exports.nativeViewDismissAndroid = function () {
    if ($('#swoosh-actionsheet-view').attr('banana-status') == '1') {
        $('#swoosh-actionsheet-view').find('.actionsheet-action-close').trigger('tap');
    } else if ($('#swoosh-popupsheet-view').attr('banana-status') == '1') {
        $('#swoosh-popupsheet-view').banana({set: ['inactivetrans', 'callback'],
            duration: 400,
            transform: {data: "0, 400px, 0"},
            callback: function () {
                $('#swoosh-popupsheet-view').find('.popupsheet-info-text').text('');
                $('#swoosh-popupsheet-view').attr('swoosh-object-data', '');
            }
        });
    } else if ($('#swoosh-interactiveTutorial-view').attr('banana-status') == '1') {
        window.androidsfo.finishapp();
    } else if ($('#swoosh-configBfPreferenceSocPol-view').attr('banana-status') == '1') {
        $('#swoosh-configBfPreferenceSocPol-view').find('.head-action-close').trigger('tap');

    } else if ($('#swoosh-marketingpromotion-view').attr('banana-status') == '1') {
        $('#swoosh-marketingpromotion-view').find('.head-action-close').trigger('tap');

    } else if ($('#swoosh-addComparePreset-view').attr('banana-status') == '1') {
        $('#swoosh-addComparePreset-view').find('.head-action-close').trigger('tap');

    } else if ($('#swoosh-comparePresetManage-view').attr('banana-status') == '1') {
        $('#swoosh-comparePresetManage-view').find('.head-action-close').trigger('tap');

    } else if ($('#swoosh-notice-view').attr('banana-status') == '1') {
        $('#swoosh-notice-view').find('.head-action-close').trigger('tap');
        
    } else if ($('#swoosh-inviteFriends-view').attr('banana-status') == '1') {
        $('#swoosh-inviteFriends-view').find('.head-action-close').trigger('tap');
    } else if ($('#swoosh-hsTagsSuggestion-view').attr('banana-status') == '1') {
        $('#swoosh-hsTagsSuggestion-view').find('.head-action-close').trigger('tap');
    } else if ($('#swoosh-addBriefingTag-view').attr('banana-status') == '1') {
        $('#swoosh-addBriefingTag-view').find('.head-action-close').trigger('tap');
    } else if ($('#swoosh-sendFeedback-view').attr('banana-status') == '1') {
        $('#swoosh-sendFeedback-view').find('.head-action-close').trigger('tap');
    } else if ($('#swoosh-configBriefingTime-view').attr('banana-status') == '1') {
        $('#swoosh-configBriefingTime-view').find('.head-action-close').trigger('tap');
    } else if ($('#swoosh-signinAccount-view').attr('banana-status') == '1') {
        $('#swoosh-signinAccount-view').find('.head-action-close').trigger('tap');
    } else if ($('#swoosh-createAccount-view').attr('banana-status') == '1') {
        $('#swoosh-createAccount-view').find('.head-action-close').trigger('tap');
    } else if ($('.swoosh-briefingPanel').length > 0) {
        $('.swoosh-briefingPanel').find('.view-action-close').trigger('tap');
    } else if ($('.swoosh-dailybriefingView').length > 0) {
        if ($('.bfP-sectionFilterview').length > 0 && $('.bfP-sectionFilterview').attr('banana-status') == '1') {
            $('.bfP-sectionFilterview').find('.view-action-confirm').trigger('tap');
        } else if ($('.bfP-newBriefingSetRequestview').length > 0 && $('.bfP-newBriefingSetRequestview').attr('banana-status') == '1') {
            $('.bfP-newBriefingSetRequestview').find('.subview-action-close').trigger('tap');
        } else {
            $('.swoosh-dailybriefingView').find('.head-action-close').trigger('tap');
        }
    } else {
        window.androidsfo.finishapp();
    }
}

exports.errorHandler = function (title, message, status) {
    if (swooshToken() == undefined && status !== "important") return;
    if (deviceTypeAndroid()) {
        window.androidsfo.alerterror(title, message);
    } else if (deviceTypeiOS()) {
        appbridge({"alert_error": 
            {
                "title": title,
                "message": message
            }
        });
    } else {
        var alertstr = title + ' - ' + message;
        alert(alertstr);
    }
}

exports.nativeDidReceiveDeviceUserId = function (id) {
    var thisid = id;

    var arr = [];
    arr.push(thisid);
    var APIpostData = JSON.stringify({
        "deviceid": arr
    });

    if (swooshToken() != undefined) {
        $.ajax({
            type: 'POST',
            url: 'https://swoosh.inthenewsrooms.com/subscribers/devices/',
            headers: { 'x-access-token': swooshToken() },
            data: APIpostData,
            contentType: "application/json",
            dataType: 'json',
            timeout: 20000
        })
        .done(function (data) {
            //localStorage.setItem('swoosh_thisdeviceid', thisid);
        })
        .fail(function (data, textStatus) {
            if (deviceTypeAndroid()) {
                window.androidsfo.alertpushtoken();
            } else if (deviceTypeiOS()) {
                appbridge({"alert_pushtoken": 
                    {
                        "title": "Unable to connect your device", 
                        "message": "There's a problem while connecting your device to send daily briefings. Please check your wireless connection."
                    }
                });
            }
        });
    }
}

exports.nativeRefreshContents = function () {
    if (swooshToken() != null) {
        briefingInfoRoutes.briefingTimeConfig();
        briefingInfoRoutes.briefingTagsArray();
        lateststoriesRoutes.refreshHotStories();
        curationRoutes.refreshCurationTags();
        loadnoticeRoutes.loadNotice();
        savedStoriesRoutes.refreshSavedStories();
        swooshUserInfoUpdate();
        mixpanel.track("app opened", {"version": getBuildVersion()});
        clearInterval(tabletAutoRefreshStat);
    }
}

exports.tabletAutoRefresh = function () {
    tabletAutoRefreshStat = setInterval(function() {
        nativeRefreshContents();
        tabletAutoRefresh();
    }, 60000);
}