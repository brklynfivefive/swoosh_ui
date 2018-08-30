$(function () {
    $('#swoosh-configBriefingTime-view').on('tap', 'li', function () {
        var currentGroup = $(this).parent().parent().attr('class');
        if (currentGroup == 'configBriefingTime-hourConfig') {
            $(this).attr('swoosh-current', 'selected');
            $('#swoosh-configBriefingTime-view .configBriefingTime-hourConfig li[swoosh-current="selected"]').not($(this)).each(function () {
                $(this).attr('swoosh-current', '');
            });
        } else if (currentGroup == 'configBriefingTime-timezoneConfig') {
            $(this).attr('swoosh-current', 'selected');
            $('#swoosh-configBriefingTime-view .configBriefingTime-timezoneConfig li[swoosh-current="selected"]').not($(this)).each(function () {
                $(this).attr('swoosh-current', '');
            });
        }

        if ($('#swoosh-configBriefingTime-view .configBriefingTime-timezoneConfig li[swoosh-current="selected"]').length == 1
        && $('#swoosh-configBriefingTime-view .configBriefingTime-hourConfig li[swoosh-current="selected"]').length == 1) {
            $('#swoosh-configBriefingTime-view .head-action-confirm').attr('banana-status', '1');
        } else {
            $('#swoosh-configBriefingTime-view .head-action-confirm').attr('banana-status', '0');
        }
    });

    $('#swoosh-configBriefingTime-view .head-action-close').on('tap', function () {
        $('#swoosh-configBriefingTime-view').banana({set: ['inactivetrans', 'callback'],
            duration: 400,
            transform: {data: "0, 100%, 0"},
            callback: function () {
                $('#swoosh-configBriefingTime-view li[swoosh-current="selected"]').attr('swoosh-current', '');
                $('#swoosh-configBriefingTime-view .head-action-confirm').attr('banana-status', '0');
            }
        });
    });

    $('#swoosh-configBriefingTime-view .head-action-confirm').on('tap', function () {
        var APIpostData = JSON.stringify({
            "hour": $('#swoosh-configBriefingTime-view .configBriefingTime-hourConfig li[swoosh-current="selected"]').attr('swoosh-object-data'),
            "timezone": $('#swoosh-configBriefingTime-view .configBriefingTime-timezoneConfig li[swoosh-current="selected"]').attr('swoosh-object-data')
        });
        $('#swoosh-configBriefingTime-view .configBriefingTimeTitleStatus').text('Customizing your');
        $('#swoosh-configBriefingTime-view .head-action-confirm').attr('banana-status', '0');
        $('#swoosh-network-indicator').attr('banana-status', '1');
        $('#swoosh-dimlayer-main').attr('banana-status', '1');

        $.ajax({
            type: 'POST',
            url: 'https://swoosh.inthenewsrooms.com/subscribers/config/briefings/',
            headers: { 'x-access-token': swooshToken() },
            data: APIpostData,
            contentType: "application/json",
            dataType: 'json',
            timeout: 20000
        })
        .done(function (data) {
            $('#swoosh-configBriefingTime-view .configBriefingTimeTitleStatus').text('Customize your');
            $('#swoosh-configBriefingTime-view .head-action-confirm').attr('banana-status', '1');
            $('#swoosh-network-indicator').attr('banana-status', '0');
            $('#swoosh-dimlayer-main').attr('banana-status', '0');

            localStorage.setItem("swoosh_briefing_hour", data.briefings.hour);
            localStorage.setItem("swoosh_briefing_tz", data.briefings.timezone);
            
            $('.main-updatenotice-bar .updateNoticeText').text('Successfully updated your briefing configuration');
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

            var briefingHour = '8AM';
            switch (data.briefings.hour) {
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
            $('.main-manageTags-view .manageTagsBriefingHourConfig').text(briefingHour);
            $('.main-manageTags-view .manageTags-action-hourconfig').attr('swoosh-object-data', data.briefings.hour);
            $('.main-settings-view .settingsBriefingHourConfig').text(briefingHour);
            $('.main-settings-view .account-action-hourconfig').attr('swoosh-object-data', data.briefings.hour);

            $('#swoosh-configBriefingTime-view').banana({set: ['inactivetrans', 'callback'],
                duration: 400,
                transform: {data: "0, 100%, 0"},
                callback: function () {
                    $('#swoosh-configBriefingTime-view li[swoosh-current="selected"]').attr('swoosh-current', '');
                }
            });
        })
        .fail(function (data, textStatus) {
            $('#swoosh-configBriefingTime-view .configBriefingTimeTitleStatus').text('Customize your');
            $('#swoosh-configBriefingTime-view .head-action-confirm').attr('banana-status', '1');

            $('#swoosh-network-indicator').attr('banana-status', '0');
            $('#swoosh-dimlayer-main').attr('banana-status', '0');
            if (data.responseText) {
                var res = $.parseJSON(data.responseText);
                var errMsg = res.error.message;

                if (errMsg == "NO_SUBSCRIBERS" || errMsg == "INVALID_SUBSCRIBER_CREDENTIAL" || errMsg.indexOf('FAILED_AUTH') != -1) {
                    sessionExpired();
                } else if (errMsg == "INVALID_BRIEFING_TIME_PARAMETERS") {
                    errorHandler("Unable to configure briefing time", "It seems like the configuration you made is incorrect. Please check again.");
                } else {
                    errorHandler("Unable to configure briefing time", "It seems like there might be a network problem. Please check your wireless connection and try again.");
                }
            } else {
                errorHandler("Unable to configure briefing time", "It seems like there might be a network problem. Please check your wireless connection and try again.");
            }
        });
    });
});