$(function () {
    $('#swoosh-configBfPreferenceSocPol-view .head-action-close').on('tap', function () {
        $('#swoosh-configBfPreferenceSocPol-view').banana({set: ['inactivetrans', 'callback'],
            duration: 400,
            transform: {data: "0, 100%, 0"},
            callback: function () {
                $('#swoosh-configBfPreferenceSocPol-view .configBfPreference-first').attr('banana-status', '1');
                $('#swoosh-configBfPreferenceSocPol-view .configBfPreference-two').attr('banana-status', '0');
                $('#swoosh-configBfPreferenceSocPol-view .configBfPreference-three').attr('banana-status', '0');
                $('#swoosh-configBfPreferenceSocPol-view .configBfPreference-final').attr('banana-status', '0');
                $('#swoosh-configBfPreferenceSocPol-view .configBfPreference-viewArea').attr('swoosh-current', 'first');
                $('#swoosh-configBfPreferenceSocPol-view li[swoosh-current="selected"]').attr('swoosh-current', '');
            }
        });
    });

    $('#swoosh-configBfPreferenceSocPol-view').on('tap', 'li', function () {
        var currentGroup = $(this).parent().parent().attr('class');
        if (currentGroup == 'configBfPreference-first') {
            $(this).attr('swoosh-current', 'selected');
            $('#swoosh-configBfPreferenceSocPol-view .configBfPreference-first li[swoosh-current="selected"]').not($(this)).each(function () {
                $(this).attr('swoosh-current', '');
            });

            if ($('#swoosh-configBfPreferenceSocPol-view .configBfPreference-first li[swoosh-current="selected"]').length == 1) {
                $('#swoosh-configBfPreferenceSocPol-view .head-action-confirm').attr('banana-status', '1');
            } else {
                $('#swoosh-configBfPreferenceSocPol-view .head-action-confirm').attr('banana-status', '0');
            }
        } else if (currentGroup == 'configBfPreference-two') {
            $(this).attr('swoosh-current', 'selected');
            $('#swoosh-configBfPreferenceSocPol-view .configBfPreference-two li[swoosh-current="selected"]').not($(this)).each(function () {
                $(this).attr('swoosh-current', '');
            });

            if ($('#swoosh-configBfPreferenceSocPol-view .configBfPreference-two li[swoosh-current="selected"]').length == 1) {
                $('#swoosh-configBfPreferenceSocPol-view .head-action-confirm').attr('banana-status', '1');
            } else {
                $('#swoosh-configBfPreferenceSocPol-view .head-action-confirm').attr('banana-status', '0');
            }
        } else if (currentGroup == 'configBfPreference-three') {
            $(this).attr('swoosh-current', 'selected');
            $('#swoosh-configBfPreferenceSocPol-view .configBfPreference-three li[swoosh-current="selected"]').not($(this)).each(function () {
                $(this).attr('swoosh-current', '');
            });

            if ($('#swoosh-configBfPreferenceSocPol-view .configBfPreference-three li[swoosh-current="selected"]').length == 1) {
                $('#swoosh-configBfPreferenceSocPol-view .head-action-confirm').attr('banana-status', '1');
            } else {
                $('#swoosh-configBfPreferenceSocPol-view .head-action-confirm').attr('banana-status', '0');
            }
        }
    });

    $('#swoosh-configBfPreferenceSocPol-view').on('tap', '.head-action-confirm', function () {
        var currentState = $('#swoosh-configBfPreferenceSocPol-view .configBfPreference-viewArea').attr('swoosh-current');
        if (currentState == 'first') {
            if ($('.configBfPreference-first li[swoosh-current="selected"]').attr('swoosh-object-data') == 'neutral') {
                $('#swoosh-configBfPreferenceSocPol-view .configBfPreference-first').attr('banana-status', '0');
                $('#swoosh-configBfPreferenceSocPol-view .configBfPreference-final').attr('banana-status', '1');
                $('#swoosh-configBfPreferenceSocPol-view .configBfPreference-viewArea').attr('swoosh-current', 'final');
                $('#swoosh-configBfPreferenceSocPol-view .configBfPreferenceFinalText').text('Unbiased/Neutral');
                bfPreference_send();
            } else {
                $('#swoosh-configBfPreferenceSocPol-view .configBfPreference-first').attr('banana-status', '0');
                $('#swoosh-configBfPreferenceSocPol-view .configBfPreference-two').attr('banana-status', '1');
                $('#swoosh-configBfPreferenceSocPol-view .configBfPreference-viewArea').attr('swoosh-current', 'two');
            }
        } else if (currentState == 'two') {
            $('#swoosh-configBfPreferenceSocPol-view .configBfPreference-two').attr('banana-status', '0');
            $('#swoosh-configBfPreferenceSocPol-view .configBfPreference-three').attr('banana-status', '1');
            $('#swoosh-configBfPreferenceSocPol-view .configBfPreference-viewArea').attr('swoosh-current', 'three');
        } else if (currentState == 'three') {
            $('#swoosh-configBfPreferenceSocPol-view .configBfPreference-three').attr('banana-status', '0');
            $('#swoosh-configBfPreferenceSocPol-view .configBfPreference-final').attr('banana-status', '1');
            $('#swoosh-configBfPreferenceSocPol-view .configBfPreference-viewArea').attr('swoosh-current', 'final');
            var preftype = bfPreference_check();
            if (preftype == 'CONS-2') {
                $('#swoosh-configBfPreferenceSocPol-view .configBfPreferenceFinalText').text('Conservative +2');
            } else if (preftype == 'CONS-1') {
                $('#swoosh-configBfPreferenceSocPol-view .configBfPreferenceFinalText').text('Conservative +1');
            } else if (preftype == 'CONS-0') {
                $('#swoosh-configBfPreferenceSocPol-view .configBfPreferenceFinalText').text('Conservative +0');
            } else if (preftype == 'LIBERAL-0') {
                $('#swoosh-configBfPreferenceSocPol-view .configBfPreferenceFinalText').text('Liberal +0');
            } else if (preftype == 'LIBERAL-1') {
                $('#swoosh-configBfPreferenceSocPol-view .configBfPreferenceFinalText').text('Liberal +1');
            } else if (preftype == 'LIBERAL-2') {
                $('#swoosh-configBfPreferenceSocPol-view .configBfPreferenceFinalText').text('Liberal +2');
            }

            setTimeout(function () {
                bfPreference_send();
            }, 300);
        } else if (currentState == 'final') {
            bfPreference_send();
        }
    });

    function bfPreference_send() {
        var preftype = bfPreference_check();
        var APIpostData = JSON.stringify({
            "type": preftype
        });

        $('#swoosh-configBfPreferenceSocPol-view .configBriefingTimeTitleStatus').text('Setting up your');
        $('#swoosh-configBfPreferenceSocPol-view .head-action-confirm').attr('banana-status', '0');

        $('#swoosh-network-indicator').attr('banana-status', '1');
        $('#swoosh-dimlayer-main').attr('banana-status', '1');

        $.ajax({
            type: 'POST',
            url: 'https://swoosh.inthenewsrooms.com/subscribers/config/briefings/preference/socpol/',
            headers: { 'x-access-token': swooshToken() },
            data: APIpostData,
            contentType: "application/json",
            dataType: 'json',
            timeout: 20000
        })
        .done(function (data) {
            $('#swoosh-configBfPreferenceSocPol-view .configBriefingTimeTitleStatus').text('Setup your');
            $('#swoosh-configBfPreferenceSocPol-view .head-action-confirm').attr('banana-status', '1');
            $('#swoosh-network-indicator').attr('banana-status', '0');
            $('#swoosh-dimlayer-main').attr('banana-status', '0');

            $('.main-updatenotice-bar .updateNoticeText').text('Successfully updated your briefing preference');
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

            $('#swoosh-configBfPreferenceSocPol-view').banana({set: ['inactivetrans', 'callback'],
                duration: 400,
                transform: {data: "0, 100%, 0"},
                callback: function () {
                    $('#swoosh-configBfPreferenceSocPol-view .configBfPreference-first').attr('banana-status', '1');
                    $('#swoosh-configBfPreferenceSocPol-view .configBfPreference-two').attr('banana-status', '0');
                    $('#swoosh-configBfPreferenceSocPol-view .configBfPreference-three').attr('banana-status', '0');
                    $('#swoosh-configBfPreferenceSocPol-view .configBfPreference-final').attr('banana-status', '0');
                    $('#swoosh-configBfPreferenceSocPol-view .configBfPreference-viewArea').attr('swoosh-current', 'first');
                    $('#swoosh-configBfPreferenceSocPol-view li[swoosh-current="selected"]').attr('swoosh-current', '');
                }
            });
        })
        .fail(function (data, textStatus) {
            $('#swoosh-configBfPreferenceSocPol-view .configBriefingTimeTitleStatus').text('Setup your');
            $('#swoosh-configBfPreferenceSocPol-view .head-action-confirm').attr('banana-status', '1');
            $('#swoosh-network-indicator').attr('banana-status', '0');
            $('#swoosh-dimlayer-main').attr('banana-status', '0');

            if (data.responseText) {
                var res = $.parseJSON(data.responseText);
                var errMsg = res.error.message;

                if (errMsg == "NO_SUBSCRIBERS" || errMsg == "INVALID_SUBSCRIBER_CREDENTIAL" || errMsg.indexOf('FAILED_AUTH') != -1) {
                    sessionExpired();
                } else if (errMsg == "INVALID_BRIEFING_PREFERENCE_TYPE") {
                    errorHandler("Unable to configure briefing preference", "It seems like the preference you set is incorrect. Please check again.");
                } else {
                    errorHandler("Unable to configure briefing preference", "It seems like there might be a network problem. Please check your wireless connection and try again.");
                }
            } else {
                errorHandler("Unable to configure briefing preference", "It seems like there might be a network problem. Please check your wireless connection and try again.");
            }
        });
    }

    function bfPreference_check () {
        var type = 'UNBIASED';
        var bias = $('#swoosh-configBfPreferenceSocPol-view .configBfPreference-first li[swoosh-current="selected"]').attr('swoosh-object-data');
        var firstop = $('#swoosh-configBfPreferenceSocPol-view .configBfPreference-two li[swoosh-current="selected"]').attr('swoosh-object-data');
        var secondop = $('#swoosh-configBfPreferenceSocPol-view .configBfPreference-three li[swoosh-current="selected"]').attr('swoosh-object-data');

        if (bias == 'neutral') {
            type = 'UNBIASED';
        } else if (bias == 'right' && firstop == 'foxnews' && secondop == 'wsj') {
            type = 'CONS-2';
        } else if (bias == 'right' && firstop == 'foxnews' && secondop == 'nyt') {
            type = 'CONS-1';
        } else if (bias == 'right' && firstop == 'cnn') {
            type = 'CONS-0';
        } else if (bias == 'left' && firstop == 'foxnews') {
            type = 'LIBERAL-0';
        } else if (bias == 'left' && firstop == 'cnn' && secondop == 'wsj') {
            type = 'LIBERAL-1';
        } else if (bias == 'left' && firstop == 'cnn' && secondop == 'nyt') {
            type = 'LIBERAL-2';
        }
        
        return type;
    }
});