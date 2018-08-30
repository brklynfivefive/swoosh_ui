var moment = require('moment');
var tz = require('moment-timezone');

$(function () {
    $('#swoosh-addComparePreset-view .head-action-close').on('tap', function () {
        $('input, textarea').blur();
        $('#swoosh-addComparePreset-view').banana({set: ['inactivetrans', 'callback'],
            duration: 400,
            transform: {data: "0, 100%, 0"},
            callback: function () {
                $('#swoosh-addComparePreset-view').find('li[swoosh-current="selected"]').attr('swoosh-current', '');
                $('#swoosh-addComparePreset-view').find('.head-action-confirm').attr('banana-status', '0');
                $('#swoosh-addComparePreset-view').find('.addComparePresetField').val('');
            }
        });
    });

    $('#swoosh-addComparePreset-view .sourcegroup-title').on('tap', function () {
        if ($(this).parent().attr('swoosh-current') == 'opened') {
            $(this).parent().attr('swoosh-current', 'closed');
        } else {
            $(this).parent().attr('swoosh-current', 'opened');
        }
    });

    $('#swoosh-addComparePreset-view .addComparePreset-viewArea li').on('tap', function () {
        if ($(this).attr('swoosh-current') != 'selected') {
            $(this).attr('swoosh-current', 'selected');
        } else {
            $(this).attr('swoosh-current', '');
        }

        if ($(this).parents('.addComparePreset-viewArea').find('li[swoosh-current="selected"]').length > 0) {
            $(this).parents('#swoosh-addComparePreset-view').find('.head-action-confirm').attr('banana-status', '1');
        } else {
            $(this).parents('#swoosh-addComparePreset-view').find('.head-action-confirm').attr('banana-status', '0');
        }
    });

    $('#swoosh-addComparePreset-view .head-action-confirm').on('tap', function () {
        var sourcesSelected = [];
        $('input, textarea').blur();
        $(this).parents('#swoosh-addComparePreset-view').find('.addComparePreset-viewArea li[swoosh-current="selected"]').each(function () {
            sourcesSelected.push($(this).attr('swoosh-object-data'));
        });

        var newpresetstr = $('#swoosh-addComparePreset-view').find('#addComparePresetField').val().replace(/[.,#!\^\*;:{}="_`()%$&~+\\|\]\[><\/]/gm, '').replace(/\s{2,}/g, ' ');
        if (newpresetstr == "" || newpresetstr == "-" || newpresetstr == "@" || !newpresetstr.replace(/\s/g, '').length) {
            $('#swoosh-addComparePreset-view .addComparePreset-form').banana({set: ['ani'], animation: "objShake"});
            return;
        }
        
        $('#swoosh-briefingload-indicator').attr('banana-status', '1');
        $('#swoosh-dimlayer-main').attr('banana-status', '1');
        var APIpostData = JSON.stringify({
            "title": newpresetstr,
            "sources": sourcesSelected
        });
        
        $.ajax({
            type: 'POST',
            url: 'https://swoosh.inthenewsrooms.com/subscribers/config/briefings/comparepreset/',
            headers: { 'x-access-token': swooshToken() },
            data: APIpostData,
            contentType: "application/json",
            dataType: 'json'
        })
        .done(function (data) {
            $('#swoosh-addComparePreset-view .head-action-close').trigger('tap');
            $('#swoosh-briefingload-indicator').attr('banana-status', '0');
            $('#swoosh-dimlayer-main').attr('banana-status', '0');

            if (data.presets != null && data.presets.length > 0) {
                var presetArray = data;

                $('body').find('.bfP-newBriefingSetRequestview').find('.sourcepresets').empty();
                $('body').find('.bfP-newBriefingSetRequestview').find('.sourcepresets').append(comparepresetItem_tp(presetArray));
                $('.main-manageTags-view').find('ul.sourcepresets').empty();
                $('.main-manageTags-view').find('ul.sourcepresets').append(comparepresetItem_tp(presetArray));
            } else {
                $('body').find('.bfP-newBriefingSetRequestview').find('.sourcepresets').empty();
                $('.main-manageTags-view').find('ul.sourcepresets').empty();
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
                } else if (errMsg == "INVALID_TITLE") {
                    errorHandler("Unable to save the compare preset", "The title text seems incorrect. Please check the title for your new preset and try again.");
                } else if (errMsg == "INVALID_SOURCES") {
                    errorHandler("Unable to save the compare preset", "You didn't select sources for your new preset. Please try again.");
                } else if (errMsg == "DUPLICATE_PRESET_TITLE_FOUND") {
                    errorHandler("Unable to save the compare preset", "There's another compare preset that has the same title text. Please try with a new title for your new preset.");
                } else {
                    errorHandler("Unable to save the compare preset", "It seems like there might be a network problem. Please check your wireless connection and try again.");
                }
            } else {
                errorHandler("Unable to save the compare preset", "It seems like there might be a network problem. Please check your wireless connection and try again.");
            }
        });
    });
});