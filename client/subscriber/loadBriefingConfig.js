var todaybriefingRoutes = require('../subscriber/loadTodayBriefings');

exports.briefingTimeConfig = function () {
    $.ajax({
        type: 'GET',
        url: 'https://swoosh.inthenewsrooms.com/subscribers/config/briefings',
        headers: { 'x-access-token': swooshToken() },
        contentType: "application/json",
        dataType: 'json'
    })
    .done(function (data) {
        localStorage.setItem("swoosh_briefing_hour", data.hour);
        localStorage.setItem("swoosh_briefing_tz", data.timezone);
        
        var briefingHour = '8AM';
        switch (data.hour) {
            case '07':
                briefingHour = '7AM';
                break;
            case '08':
                briefingHour = '8AM';
                break;
            case '09':
                briefingHour = '9AM';
                break;
            case '10':
                briefingHour = '10AM';
                break;
            case '18':
                briefingHour = '6PM';
                break;
            case '19':
                briefingHour = '7PM';
                break;
            case '20':
                briefingHour = '8PM';
                break;
            case '21':
                briefingHour = '9PM';
                break;
        }
        $('.main-navigation-bar .manageTagsBriefingHourConfig').text(briefingHour);
        $('.main-navigation-bar .manageTags-action-hourconfig').attr('swoosh-object-data', data.hour);
        $('.main-settings-view .settingsBriefingHourConfig').text(briefingHour);
        $('.main-settings-view .account-action-hourconfig').attr('swoosh-object-data', data.hour);
    })
    .fail(function (data, textStatus) {
        if (data.responseText) {
            var res = $.parseJSON(data.responseText);
            var errMsg = res.error.message;
            
            if (errMsg == "NO_SUBSCRIBERS" || errMsg == "INVALID_SUBSCRIBER_CREDENTIAL" || errMsg.indexOf('FAILED_AUTH') != -1) {
                sessionExpired();
            }
        }
    });

    $.ajax({
        type: 'GET',
        url: 'https://swoosh.inthenewsrooms.com/subscribers/config/briefings/preference/socpol',
        headers: { 'x-access-token': swooshToken() },
        contentType: "application/json",
        dataType: 'json'
    })
    .done(function (data) {
        localStorage.setItem("swoosh_briefingpref_socpol", data);
    })
    .fail(function (data, textStatus) {
        
    });

    $('.main-manageTags-view').find('.comparePresetsStatText').text('Refreshing compare presets');
    $.ajax({
        type: 'GET',
        url: 'https://swoosh.inthenewsrooms.com/subscribers/config/briefings/comparepreset/',
        headers: { 'x-access-token': swooshToken() },
        contentType: "application/json",
        dataType: 'json'
    })
    .done(function (data) {
        $('.main-manageTags-view').find('.comparePresetsStatText').text('my compare presets');
        if (data.presets != null && data.presets.length > 0) {
            var presetArray = data;
            $('.main-manageTags-view').find('ul.sourcepresets').empty();
            $('.main-manageTags-view').find('ul.sourcepresets').append(comparepresetItem_tp(presetArray));
        }
        
    })
    .fail(function (data, textStatus) {
        $('.main-manageTags-view').find('.comparePresets-notice').attr('swoosh-current', 'error');
        $('.main-manageTags-view').find('.comparePresetsStatText').text('Tap to refresh compare presets');
    });
}

exports.briefingTagsArray = function (callback) {
    $('.main-manageTags-view .briefingActiveTagsStatText').text('Refreshing briefings');
    $('.main-briefingHome-view .todaybriefingsStatusText').text('refreshing briefings');

    $.ajax({
        type: 'GET',
        url: 'https://swoosh.inthenewsrooms.com/subscribers/keywords',
        headers: { 'x-access-token': swooshToken() },
        contentType: "application/json",
        dataType: 'json'
    })
    .done(function (data) {
        localStorage.setItem("swoosh_briefing_tags", JSON.stringify(data));
        todaybriefingRoutes.refreshTodayBriefings(callback);
    })
    .fail(function (data, textStatus) {
        $('.main-briefingHome-view .todaybriefingsStatusText').text('tap to refresh');
        $('.main-manageTags-view .briefingActiveTagsStatText').text('Tap to refresh briefings');
        $('.main-manageTags-view .manageTags-notice').attr('swoosh-current', 'failed');
        $('.main-briefingHome-view .todaybriefings-notice').attr('swoosh-current', 'failed');
        
        if (data.responseText) {
            var res = $.parseJSON(data.responseText);
            var errMsg = res.error.message;
            
            if (errMsg == "NO_SUBSCRIBERS" || errMsg == "INVALID_SUBSCRIBER_CREDENTIAL" || errMsg.indexOf('FAILED_AUTH') != -1) {
                sessionExpired();
            } else {
                errorHandler("Unable to refresh contents", "It seems like there might be a network problem. Please check your wireless connection and try again.");
            }
        } else {
            errorHandler("Unable to refresh contents", "It seems like there might be a network problem. Please check your wireless connection and try again.");
        }
    });
}