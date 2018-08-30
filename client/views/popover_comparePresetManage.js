$(function () {
    $('#swoosh-comparePresetManage-view .head-action-close').on('tap', function () {
        $('#swoosh-comparePresetManage-view').banana({set: ['inactivetrans', 'callback'],
            duration: 400,
            transform: {data: "0, 100%, 0"},
            callback: function () {
                $('#swoosh-comparePresetManage-view').find('.presetTitle').text('');
                $('#swoosh-comparePresetManage-view').find('.comparePresetManage-presetinfo').attr('swoosh-object-id', '');
                $('#swoosh-comparePresetManage-view').find('.comparePresetManage-includedsources ul').empty();
            }
        });
    });

    $('#swoosh-comparePresetManage-view .comparePresetManage-action-delete').on('tap', function () {
        var APIpostData = JSON.stringify({
            "presetId": $('#swoosh-comparePresetManage-view').find('.comparePresetManage-presetinfo').attr('swoosh-object-id')
        });

        $('#swoosh-briefingload-indicator').attr('banana-status', '1');
        $('#swoosh-dimlayer-main').attr('banana-status', '1');
        
        $.ajax({
            type: 'POST',
            url: 'https://swoosh.inthenewsrooms.com/subscribers/config/briefings/comparepreset/remove',
            headers: { 'x-access-token': swooshToken() },
            data: APIpostData,
            contentType: "application/json",
            dataType: 'json'
        })
        .done(function (data) {
            $('#swoosh-comparePresetManage-view .head-action-close').trigger('tap');
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
                } else if (errMsg == "NO_COMPAREPRESETS_EXIST") {
                    errorHandler("Unable to delete the compare preset", "Something went wrong while deleting the preset. Please reopen the app or contact support.");
                } else {
                    errorHandler("Unable to delete the compare preset", "It seems like there might be a network problem. Please check your wireless connection and try again.");
                }
            } else {
                errorHandler("Unable to delete the compare preset", "It seems like there might be a network problem. Please check your wireless connection and try again.");
            }
        });
    });
});