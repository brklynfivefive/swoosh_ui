var briefingInfoRoutes = require('../subscriber/loadBriefingConfig');
var todaybriefingRoutes = require('../subscriber/loadTodayBriefings');
var lateststoriesRoutes = require('../subscriber/loadLatestStories');
var curationRoutes = require('../subscriber/loadCuration');
var savedStoriesRoutes = require('../subscriber/loadSavedStories');
var loadnoticeRoutes = require('../core/notice');

$(function () {
    $('#swoosh-createAccount-view').on('focus', 'input', function () {
        var obj = $('#swoosh-createAccount-view .createAccount-form');
        if (deviceTypeAndroid()) {
            if (!$(obj).hasClass('androidScroll')) {
                $(obj).addClass('androidScroll');
            }
        }
    });

    $('#swoosh-createAccount-view').on('blur', 'input', function () {
        var obj = $('#swoosh-createAccount-view .createAccount-form');
        if (deviceTypeAndroid()) {
            if ($(obj).hasClass('androidScroll')) {
                $(obj).removeClass('androidScroll');
            }
        }
    });

    $('#swoosh-createAccount-view .gender-selection .selection-options p').on('tap', function () {
        $(this).parents('.gender-selection').attr('swoosh-object-data', $(this).attr('swoosh-object-data'));
    });

    $('#swoosh-createAccount-view .head-action-close').on('tap', function () {
        if ($(this).attr('swoosh-current') == 'blocked') return;
        $('input, textarea').blur();
        $('#swoosh-createAccount-view').banana({set: ['inactivetrans', 'callback'],
            duration: 400,
            transform: {data: "0, 100%, 0"},
            callback: function () {
                $('#swoosh-createAccount-view #createAccountEmailField').val('');
                $('#swoosh-createAccount-view #createAccountPassField').val('');
                $('#swoosh-createAccount-view .head-action-close').attr('banana-status', '1');
                $('#swoosh-createAccount-view .createAccount-form').attr('banana-status', '1');
                $('#swoosh-createAccount-view .createAccount-briefingtime').attr('banana-status', '0');
                $('#swoosh-createAccount-view .createAccount-viewArea').attr('swoosh-current', 'intro');
                $('#swoosh-createAccount-view .configBfPreference-first').attr('banana-status', '1');
                $('#swoosh-createAccount-view .configBfPreference-two').attr('banana-status', '0');
                $('#swoosh-createAccount-view .configBfPreference-three').attr('banana-status', '0');
                $('#swoosh-createAccount-view .configBfPreference-final').attr('banana-status', '0');
                $('#swoosh-createAccount-view .createAccount-configBfPreference').attr('swoosh-current', 'first');
                $('#swoosh-createAccount-view li[swoosh-current="selected"]').attr('swoosh-current', '');
            }
        });
    });

    $('#swoosh-createAccount-view .head-action-confirm').on('tap', function () {
        var currentState = $('#swoosh-createAccount-view .createAccount-viewArea').attr('swoosh-current');
        if (currentState == 'intro') {
            $('#swoosh-createAccount-view .createAccount-viewArea').attr('swoosh-current', 'signupform');
            $('#swoosh-createAccount-view .createAccount-intro').attr('banana-status', '0');
            $('#swoosh-createAccount-view .createAccount-form').attr('banana-status', '1');
        } else if (currentState == 'signupform') {
            $('input, textarea').blur();
            var signupEmailVal = $('#swoosh-createAccount-view #createAccountEmailField').val();
            var signupPassVal = $('#swoosh-createAccount-view #createAccountPassField').val();
            var signupUsernameVal = $('#swoosh-createAccount-view #createAccountUsernameField').val();
            var signupAgeVal = $('#swoosh-createAccount-view #createAccountAgeField').val();
            var signupGenderVal = $('#swoosh-createAccount-view .gender-selection').attr('swoosh-object-data');
            var signupReferralVal = $('#swoosh-createAccount-view #createAccountReferralField').val();

            if (!signupEmailVal || /^[a-zA-Z0-9.!#$%&’*+\/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/i.test(signupEmailVal) === false) {
                $('.main-settings-view .settings-account').banana({set: ['ani'], animation: "objShake"});
                return;
            }

            if (signupUsernameVal != null) {
                signupUsernameVal = signupUsernameVal.replace(/[.,#!\^\*;:{}="'_`()%@,$&~+\\|\]\[><\/]/gm, '').replace(/\s{2,}/g, ' ');
            }

            if (signupAgeVal != null && signupAgeVal != "") {
                if (/^[0-9]+$/.test(signupAgeVal) == false) {
                    errorHandler("Unable to create a new account", "Please check your age information and try again. Only numbers are allowed.");
                    return;
                }
            }

            if (signupEmailVal != "" && signupEmailVal != null && signupPassVal != "" && signupPassVal != null) {
                var APIpostData;
                
                signupEmailVal = $.trim(signupEmailVal);
                signupAgeVal = $.trim(signupAgeVal);
                if (signupUsernameVal != "" && signupUsernameVal != null) {
                    APIpostData = JSON.stringify({
                        "email": signupEmailVal,
                        "password": signupPassVal,
                        "username": signupUsernameVal,
                        "age": signupAgeVal,
                        "gender": signupGenderVal
                    });
                } else {
                    APIpostData = JSON.stringify({
                        "email": signupEmailVal,
                        "password": signupPassVal,
                        "username": null,
                        "age": signupAgeVal,
                        "gender": signupGenderVal
                    });
                }

                $('#swoosh-network-indicator').attr('banana-status', '1');
                $('#swoosh-dimlayer-main').attr('banana-status', '1');
                $('#swoosh-createAccount-view .head-action-confirm').attr('banana-status', '0');

                $.ajax({
                    type: 'POST',
                    url: 'https://swoosh.inthenewsrooms.com/subscribers/',
                    data: APIpostData,
                    contentType: "application/json",
                    dataType: 'json',
                    timeout: 20000
                })
                .done(function (data) {
                    localStorage.setItem('swoosh_sid', data.userId);
                    localStorage.setItem('swoosh_token', data.token);
                    localStorage.setItem('swoosh_semail', data.email);
                    localStorage.setItem('swoosh_age', data.age);
                    localStorage.setItem('swoosh_gender', data.gender);
                    if (data.username) {
                        localStorage.setItem('swoosh_sname', data.username);
                        $('.main-briefingHome-view').find('.homeSubscriberUsername').text(data.username + ',');
                    } else {
                        localStorage.setItem('swoosh_sname', '');
                        $('.main-briefingHome-view').find('.homeSubscriberUsername').text('Hi,');
                    }

                    if (deviceTypeAndroid()) {
                        window.androidsfo.swooshtoken(data.token);
                        window.androidsfo.pushtokenrequest();
                    } else if (deviceTypeiOS()) {
                        appbridge({"swoosh_token": data.token});
                        appbridge({"pushtoken_request": ''});
                    }

                    $('#swoosh-intro-view').banana({set: ['inactivetrans', 'callback'],
                        duration: 400,
                        transform: {data: "0, 100%, 0"},
                        callback: function () {
                        }
                    });

                    $('.main-briefingHome-view').attr('banana-status', '1');
                    $('.main-navigation-bar').attr('swoosh-object', '');

                    $('#swoosh-createAccount-view .head-action-confirm').attr('banana-status', '0');
                    $('#swoosh-network-indicator').attr('banana-status', '0');
                    $('#swoosh-dimlayer-main').attr('banana-status', '0');
                    $('input, textarea').blur();
                    briefingInfoRoutes.briefingTagsArray();
                    lateststoriesRoutes.refreshHotStories();
                    curationRoutes.refreshCurationTags();
                    savedStoriesRoutes.refreshSavedStories();
                    loadnoticeRoutes.loadNotice();
                    $('#swoosh-createAccount-view .head-action-close').attr('swoosh-current', 'blocked');
                    $('#swoosh-createAccount-view .createAccount-viewArea').attr('swoosh-current', 'briefingtime');
                    $('#swoosh-createAccount-view .createAccount-form').attr('banana-status', '0');
                    $('#swoosh-createAccount-view .createAccount-briefingtime').attr('banana-status', '1');

                    try {
                        mixpanel.alias(swooshSid(), mixpanel.get_distinct_id());
                        mixpanel.people.set({
                            "$email": data.email,
                            "$last_login": new Date(),
                            "userId": data.userId,
                            "frameworkVersion": getBuildVersion()
                        });
                        mixpanel.track("Finish signup");
                    } catch (err) {
                        console.log(err);
                    }

                    if (signupReferralVal != "" && signupReferralVal != null) {
                        referral_accept(signupReferralVal);
                    }
                })
                .fail(function (data, textStatus) {
                    $('#swoosh-createAccount-view .head-action-confirm').attr('banana-status', '1');
                    $('#swoosh-network-indicator').attr('banana-status', '0');
                    $('#swoosh-dimlayer-main').attr('banana-status', '0');
                    if (data.responseText) {
                        var res = $.parseJSON(data.responseText);
                        var errMsg = res.error.message;
                        
                        if (errMsg == "INVALID_EMAIL") {
                            errorHandler("Unable to create a new account", "It seems like your email address is incorrect.");
                        } else if (errMsg == "EMAIL_TAKEN") {
                            errorHandler("Unable to create a new account", "It seems like your email address is already in use on #Newsrooms.");
                        } else if (errMsg == "TOOSHORT_PASSWORD") {
                            errorHandler("Unable to create a new account", "It seems like your new password is too short.");
                        } else {
                            errorHandler("Unable to create a new account", "It seems like there might be a network problem. Please check your wireless connection and try again.");
                        }
                    } else {
                        errorHandler("Unable to create a new account", "It seems like there might be a network problem. Please check your wireless connection and try again.");
                    }
                });

                function referral_accept(signupReferralVal) {
                    $('#swoosh-network-indicator').attr('banana-status', '1');
                    $('#swoosh-dimlayer-main').attr('banana-status', '1');

                    var APIpostData = JSON.stringify({
                        "referral": signupReferralVal
                    });

                    $.ajax({
                        type: 'POST',
                        url: 'https://swoosh.inthenewsrooms.com/referral/accept/',
                        headers: { 'x-access-token': swooshToken() },
                        contentType: "application/json",
                        data: APIpostData,
                        dataType: 'json',
                        timeout: 20000
                    })
                    .done(function (data) {
                        $('#swoosh-network-indicator').attr('banana-status', '0');
                        $('#swoosh-dimlayer-main').attr('banana-status', '0');

                        $('.main-updatenotice-bar .updateNoticeText').text('Successfully accepted the referral code!');
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
                    })
                    .fail(function (data, textStatus) {
                        $('#swoosh-network-indicator').attr('banana-status', '0');
                        $('#swoosh-dimlayer-main').attr('banana-status', '0');

                        if (data.responseText) {
                            var res = $.parseJSON(data.responseText);
                            var errMsg = res.error.message;

                            if (errMsg == "NO_SUBSCRIBERS" || errMsg == "INVALID_SUBSCRIBER_CREDENTIAL" || errMsg.indexOf('FAILED_AUTH') != -1) {
                                sessionExpired();
                            } else if (errMsg == "ALREADY_USED_REFERRAL_CODE") {
                                errorHandler("Unable to accept the referral code", "It seems like this referral code has already been used.");
                            } else if (errMsg == "INVALID_REFERRAL_CODE") {
                                errorHandler("Unable to accept the referral code", "It seems like this referral code is invalid. Please check the code again.");
                            } else {
                                var data = {
                                    "options": [
                                        {
                                            "key": "referraltryagain",
                                            "text": "Try send the referral code again",
                                            "info": signupReferralVal
                                        }
                                    ]
                                };

                                $('#swoosh-actionsheet-view ul').empty();
                                $('#swoosh-actionsheet-view ul').append(actionsheet_tp(data));
                                $('#swoosh-actionsheet-view').attr('swoosh-object-data', 'signup-failureretryoptions');
                                $('#swoosh-actionsheet-view').attr('swoosh-object-type', hstype);
                                $('#swoosh-dimlayer-main').banana({set: ['1']});
                                $('#swoosh-actionsheet-view').banana({set: ['activetrans', 'callback'],
                                    duration: 400,
                                    transform: {data: "0, 0, 0"},
                                    callback: function () {
                                    }
                                });
                                errorHandler("Unable to accept the referral code", "It seems like there might be a network problem. Please check your wireless connection and try again.");
                            }
                        } else {
                            var data = {
                                "options": [
                                    {
                                        "key": "referraltryagain",
                                        "text": "Try send the referral code again",
                                        "info": signupReferralVal
                                    }
                                ]
                            };

                            $('#swoosh-actionsheet-view ul').empty();
                            $('#swoosh-actionsheet-view ul').append(actionsheet_tp(data));
                            $('#swoosh-actionsheet-view').attr('swoosh-object-data', 'signup-failureretryoptions');
                            $('#swoosh-actionsheet-view').attr('swoosh-object-type', hstype);
                            $('#swoosh-dimlayer-main').banana({set: ['1']});
                            $('#swoosh-actionsheet-view').banana({set: ['activetrans', 'callback'],
                                duration: 400,
                                transform: {data: "0, 0, 0"},
                                callback: function () {
                                }
                            });
                            errorHandler("Unable to accept the referral code", "It seems like there might be a network problem. Please check your wireless connection and try again.");
                        }
                    });
                }
            } else {
                errorHandler("Unable to create a new account", "It seems like your signup information is incorrect. Please check and try again.");
                $('#swoosh-createAccount-view .createAccount-form .form-fields').banana({set: ['ani'], animation: "objShake"});
            }

        } else if (currentState == 'briefingtime') {
            if ($('.createAccount-timezoneConfig li[swoosh-current="selected"]').length == 1
            && $('.createAccount-hourConfig li[swoosh-current="selected"]').length == 1) {
                var APIpostData = JSON.stringify({
                    "hour": $('#swoosh-createAccount-view .createAccount-hourConfig li[swoosh-current="selected"]').attr('swoosh-object-data'),
                    "timezone": $('#swoosh-createAccount-view .createAccount-timezoneConfig li[swoosh-current="selected"]').attr('swoosh-object-data')
                });
                $('#swoosh-network-indicator').attr('banana-status', '1');
                $('#swoosh-dimlayer-main').attr('banana-status', '1');
                $('#swoosh-createAccount-view .head-action-confirm').attr('banana-status', '0');

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
                    $('#swoosh-network-indicator').attr('banana-status', '0');
                    $('#swoosh-dimlayer-main').attr('banana-status', '0');
                    $('#swoosh-createAccount-view .head-action-confirm').attr('banana-status', '0');
                    localStorage.setItem("swoosh_briefing_hour", data.briefings.hour);
                    localStorage.setItem("swoosh_briefing_tz", data.briefings.timezone);
                    
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
                    $('.main-settings-view .settingsBriefingHourConfig').text(briefingHour);
                    

                    $('#swoosh-createAccount-view .createAccount-viewArea').attr('swoosh-current', 'bfpreference');
                    $('#swoosh-createAccount-view .createAccount-briefingtime').attr('banana-status', '0');
                    $('#swoosh-createAccount-view .createAccount-configBfPreference').attr('banana-status', '1');
                    
                    if (deviceTypeAndroid()) {
                        window.androidsfo.pushtokenrequest();
                    } else if (deviceTypeiOS()) {
                        appbridge({"pushtoken_request": ''});
                    }
                })
                .fail(function (data, textStatus) {
                    $('#swoosh-network-indicator').attr('banana-status', '0');
                    $('#swoosh-dimlayer-main').attr('banana-status', '0');
                    $('#swoosh-createAccount-view .head-action-confirm').attr('banana-status', '1');
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

            } else {
                $('#swoosh-createAccount-view .head-action-confirm').attr('banana-status', '0');
            }
        } else if (currentState == 'bfpreference') {
            var currentState = $('#swoosh-createAccount-view .createAccount-configBfPreference').attr('swoosh-current');
            if (currentState == 'first') {
                if ($('#swoosh-createAccount-view .configBfPreference-first li[swoosh-current="selected"]').attr('swoosh-object-data') == 'neutral') {
                    $('#swoosh-createAccount-view .configBfPreference-first').attr('banana-status', '0');
                    $('#swoosh-createAccount-view .configBfPreference-final').attr('banana-status', '1');
                    $('#swoosh-createAccount-view .createAccount-configBfPreference').attr('swoosh-current', 'final');
                    $('#swoosh-createAccount-view .configBfPreferenceFinalText').text('Unbiased/Neutral');
                    bfPreference_send();
                } else {
                    $('#swoosh-createAccount-view .configBfPreference-first').attr('banana-status', '0');
                    $('#swoosh-createAccount-view .configBfPreference-two').attr('banana-status', '1');
                    $('#swoosh-createAccount-view .createAccount-configBfPreference').attr('swoosh-current', 'two');
                }
            } else if (currentState == 'two') {
                $('#swoosh-createAccount-view .configBfPreference-two').attr('banana-status', '0');
                $('#swoosh-createAccount-view .configBfPreference-three').attr('banana-status', '1');
                $('#swoosh-createAccount-view .createAccount-configBfPreference').attr('swoosh-current', 'three');
            } else if (currentState == 'three') {
                $('#swoosh-createAccount-view .configBfPreference-three').attr('banana-status', '0');
                $('#swoosh-createAccount-view .configBfPreference-final').attr('banana-status', '1');
                $('#swoosh-createAccount-view .createAccount-configBfPreference').attr('swoosh-current', 'final');
                var preftype = bfPreference_check();
                if (preftype == 'CONS-2') {
                    $('#swoosh-createAccount-view .configBfPreferenceFinalText').text('Conservative +2');
                } else if (preftype == 'CONS-1') {
                    $('#swoosh-createAccount-view .configBfPreferenceFinalText').text('Conservative +1');
                } else if (preftype == 'CONS-0') {
                    $('#swoosh-createAccount-view .configBfPreferenceFinalText').text('Conservative +0');
                } else if (preftype == 'LIBERAL-0') {
                    $('#swoosh-createAccount-view .configBfPreferenceFinalText').text('Liberal +0');
                } else if (preftype == 'LIBERAL-1') {
                    $('#swoosh-createAccount-view .configBfPreferenceFinalText').text('Liberal +1');
                } else if (preftype == 'LIBERAL-2') {
                    $('#swoosh-createAccount-view .configBfPreferenceFinalText').text('Liberal +2');
                }

                setTimeout(function () {
                    bfPreference_send();
                }, 300);
            } else if (currentState == 'final') {
                bfPreference_send();
            }

        function bfPreference_send() {
            var preftype = bfPreference_check();
            var APIpostData = JSON.stringify({
                "type": preftype
            });

            $('#swoosh-network-indicator').attr('banana-status', '1');
            $('#swoosh-dimlayer-main').attr('banana-status', '1');
            $('#swoosh-createAccount-view .head-action-confirm').attr('banana-status', '0');

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
                $('#swoosh-createAccount-view .head-action-confirm').attr('banana-status', '1');
                $('#swoosh-network-indicator').attr('banana-status', '0');
                $('#swoosh-dimlayer-main').attr('banana-status', '0');

                $('input, textarea').blur();
                $('#swoosh-createAccount-view').banana({set: ['inactivetrans', 'callback'],
                    duration: 400,
                    transform: {data: "0, 100%, 0"},
                    callback: function () {
                        $('#swoosh-createAccount-view #createAccountEmailField').val('');
                        $('#swoosh-createAccount-view #createAccountPassField').val('');
                        $('#swoosh-createAccount-view .createAccount-intro').attr('banana-status', '1');
                        $('#swoosh-createAccount-view .head-action-close').attr('banana-status', '1');
                        $('#swoosh-createAccount-view .createAccount-form').attr('banana-status', '0');
                        $('#swoosh-createAccount-view .createAccount-briefingtime').attr('banana-status', '0');
                        $('#swoosh-createAccount-view .createAccount-viewArea').attr('swoosh-current', 'intro');
                        $('#swoosh-createAccount-view .configBfPreference-first').attr('banana-status', '1');
                        $('#swoosh-createAccount-view .configBfPreference-two').attr('banana-status', '0');
                        $('#swoosh-createAccount-view .configBfPreference-three').attr('banana-status', '0');
                        $('#swoosh-createAccount-view .configBfPreference-final').attr('banana-status', '0');
                        $('#swoosh-createAccount-view .createAccount-configBfPreference').attr('swoosh-current', 'first');
                        $('#swoosh-createAccount-view li[swoosh-current="selected"]').attr('swoosh-current', '');
                    }
                });
                $('#swoosh-addBriefingTag-view').banana({set: ['activetrans', 'callback'],
                    duration: 400,
                    transform: {data: "0, 0, 0"},
                    callback: function () {
                    }
                });
                $('.main-navigation-bar .navitem[swoosh-target="briefingHome"]').trigger('tap');
                $('.main-briefingHome-view .trending-stories').addClass('tutorialHighlightmodeDim');
                $('.main-briefingHome-view').addClass('tutorialmode');
                $('.main-manageTags-view').addClass('tutorialmode');
                $('#swoosh-interactiveTutorial-view').banana({set: ['activeani'],
                    animation: "objPrePopout"
                });
                $('#swoosh-interactiveTutorial-view .tutorialview-1').css('margin-top', $('.main-briefingHome-view .todaybriefings-notice').position().top + $('.main-briefingHome-view .todaybriefings-notice').height() + 20);
            })
            .fail(function (data, textStatus) {
                $('#swoosh-createAccount-view .head-action-confirm').attr('banana-status', '1');
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
            var bias = $('#swoosh-createAccount-view .configBfPreference-first li[swoosh-current="selected"]').attr('swoosh-object-data');
            var firstop = $('#swoosh-createAccount-view .configBfPreference-two li[swoosh-current="selected"]').attr('swoosh-object-data');
            var secondop = $('#swoosh-createAccount-view .configBfPreference-three li[swoosh-current="selected"]').attr('swoosh-object-data');

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
        }
    });

    $('#swoosh-createAccount-view .createAccount-configBfPreference').on('tap', 'li', function () {
        var currentGroup = $(this).parent().parent().attr('class');
        if (currentGroup == 'configBfPreference-first') {
            $(this).attr('swoosh-current', 'selected');
            $('#swoosh-createAccount-view .configBfPreference-first li[swoosh-current="selected"]').not($(this)).each(function () {
                $(this).attr('swoosh-current', '');
            });

            if ($('#swoosh-createAccount-view .configBfPreference-first li[swoosh-current="selected"]').length == 1) {
                $('#swoosh-createAccount-view .head-action-confirm').attr('banana-status', '1');
            } else {
                $('#swoosh-createAccount-view .head-action-confirm').attr('banana-status', '0');
            }
        } else if (currentGroup == 'configBfPreference-two') {
            $(this).attr('swoosh-current', 'selected');
            $('#swoosh-createAccount-view .configBfPreference-two li[swoosh-current="selected"]').not($(this)).each(function () {
                $(this).attr('swoosh-current', '');
            });

            if ($('#swoosh-createAccount-view .configBfPreference-two li[swoosh-current="selected"]').length == 1) {
                $('#swoosh-createAccount-view .head-action-confirm').attr('banana-status', '1');
            } else {
                $('#swoosh-createAccount-view .head-action-confirm').attr('banana-status', '0');
            }
        } else if (currentGroup == 'configBfPreference-three') {
            $(this).attr('swoosh-current', 'selected');
            $('.configBfPreference-three li[swoosh-current="selected"]').not($(this)).each(function () {
                $(this).attr('swoosh-current', '');
            });

            if ($('.configBfPreference-three li[swoosh-current="selected"]').length == 1) {
                $('#swoosh-createAccount-view .head-action-confirm').attr('banana-status', '1');
            } else {
                $('#swoosh-createAccount-view .head-action-confirm').attr('banana-status', '0');
            }
        }
    });

    $('#swoosh-createAccount-view .createAccount-briefingtime').on('tap', 'li', function () {
        var currentGroup = $(this).parent().parent().attr('class');
        if (currentGroup == 'createAccount-hourConfig') {
            $(this).attr('swoosh-current', 'selected');
            $('#swoosh-createAccount-view .createAccount-hourConfig li[swoosh-current="selected"]').not($(this)).each(function () {
                $(this).attr('swoosh-current', '');
            });
        } else if (currentGroup == 'createAccount-timezoneConfig') {
            $(this).attr('swoosh-current', 'selected');
            $('#swoosh-createAccount-view .createAccount-timezoneConfig li[swoosh-current="selected"]').not($(this)).each(function () {
                $(this).attr('swoosh-current', '');
            });
        }

        if ($('#swoosh-createAccount-view .createAccount-timezoneConfig li[swoosh-current="selected"]').length == 1
        && $('#swoosh-createAccount-view .createAccount-hourConfig li[swoosh-current="selected"]').length == 1) {
            $('#swoosh-createAccount-view .head-action-confirm').attr('banana-status', '1');
        } else {
            $('#swoosh-createAccount-view .head-action-confirm').attr('banana-status', '0');
        }
    });
});