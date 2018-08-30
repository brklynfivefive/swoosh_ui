var briefingInfoRoutes = require('../subscriber/loadBriefingConfig');
var todaybriefingRoutes = require('../subscriber/loadTodayBriefings');
var lateststoriesRoutes = require('../subscriber/loadLatestStories');
var curationRoutes = require('../subscriber/loadCuration');
var savedStoriesRoutes = require('../subscriber/loadSavedStories');
var loadnoticeRoutes = require('../core/notice');

$(function () {
    $('#swoosh-signinAccount-view').on('focus', 'input', function () {
        var obj = $('#swoosh-signinAccount-view .signinAccount-form');
        if (deviceTypeAndroid()) {
            if (!$(obj).hasClass('androidScroll')) {
                $(obj).addClass('androidScroll');
            }
        }
    });

    $('#swoosh-signinAccount-view').on('blur', 'input', function () {
        var obj = $('#swoosh-signinAccount-view .signinAccount-form');
        if (deviceTypeAndroid()) {
            if ($(obj).hasClass('androidScroll')) {
                $(obj).removeClass('androidScroll');
            }
        }
    });

    $('#swoosh-signinAccount-view').on('keyup', 'input', function (e) {
        if (e.which == 13) {
            $('#swoosh-signinAccount-view .head-action-confirm').trigger('tap');
        }
    });

    $('#swoosh-signinAccount-view .head-action-close').on('tap', function () {
        $('input, textarea').blur();
        $('#swoosh-signinAccount-view').banana({set: ['inactivetrans', 'callback'],
            duration: 400,
            transform: {data: "0, 100%, 0"},
            callback: function () {
                $('#swoosh-signinAccount-view #signinAccountEmailField').val('');
                $('#swoosh-signinAccount-view #signinAccountPassField').val('');
            }
        });
    });

    $('#swoosh-signinAccount-view .head-action-confirm').on('tap', function () {
        $('input, textarea').blur();
        var signinEmailVal = $('#swoosh-signinAccount-view #signinAccountEmailField').val();
        var signinPassVal = $('#swoosh-signinAccount-view #signinAccountPassField').val();
        if (signinEmailVal != "" && signinEmailVal != null && signinPassVal != "" && signinPassVal != null) {

            signinEmailVal = $.trim(signinEmailVal);
            var APIpostData = JSON.stringify({
                "email": signinEmailVal,
                "password": signinPassVal
            });

            $('#swoosh-network-indicator').attr('banana-status', '1');
            $('#swoosh-dimlayer-main').attr('banana-status', '1');
            $('#swoosh-signinAccount-view .head-action-confirm').attr('banana-status', '0');

            $.ajax({
                type: 'POST',
                url: 'https://swoosh.inthenewsrooms.com/auth/',
                data: APIpostData,
                contentType: "application/json",
                dataType: 'json',
                timeout: 20000
            })
            .done(function (data) {
                localStorage.setItem('swoosh_sid', data.userId);
                localStorage.setItem('swoosh_token', data.token);
                localStorage.setItem('swoosh_semail', data.email);
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
                $('.main-updatenotice-bar .updateNoticeText').text('Welcome back!');
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

                $('#swoosh-intro-view').banana({set: ['inactivetrans', 'callback'],
                    duration: 400,
                    transform: {data: "0, 100%, 0"},
                    callback: function () {
                    }
                });

                $('.main-briefingHome-view').attr('banana-status', '1');
                $('.main-navigation-bar').attr('swoosh-object', '');

                $('#swoosh-signinAccount-view .head-action-confirm').attr('banana-status', '1');
                $('#swoosh-network-indicator').attr('banana-status', '0');
                $('#swoosh-dimlayer-main').attr('banana-status', '0');

                briefingInfoRoutes.briefingTimeConfig();
                briefingInfoRoutes.briefingTagsArray();
                lateststoriesRoutes.refreshHotStories();
                curationRoutes.refreshCurationTags();
                savedStoriesRoutes.refreshSavedStories();
                loadnoticeRoutes.loadNotice();
                $('#swoosh-signinAccount-view').banana({set: ['inactivetrans', 'callback'],
                    duration: 400,
                    transform: {data: "0, 100%, 0"},
                    callback: function () {
                        $('#swoosh-signinAccount-view #signinAccountEmailField').val('');
                        $('#swoosh-signinAccount-view #signinAccountPassField').val('');
                    }
                });

                try {
                    mixpanel.identify(swooshSid());
                    mixpanel.people.set({
                        "$email": localStorage.getItem('swoosh_semail'),
                        "$last_login": new Date(),
                        "userId": swooshSid(),
                        "frameworkVersion": getBuildVersion()
                    });
                    mixpanel.track("Signin", {"signinUserId": swooshSid()});
                } catch (err) {
                    console.log(err);
                }
                
            })
            .fail(function (data, textStatus) {
                $('#swoosh-signinAccount-view .head-action-confirm').attr('banana-status', '1');
                $('#swoosh-network-indicator').attr('banana-status', '0');
                $('#swoosh-dimlayer-main').attr('banana-status', '0');
                
                if (data.responseText) {
                    var res = $.parseJSON(data.responseText);
                    var errMsg = res.error.message;

                    if (errMsg == "INVALID_SUBSCRIBER_CREDENTIAL") {
                        errorHandler("Unable to sign in", "It seems like your account information is incorrect. Please check again.", "important");
                    } else {
                        errorHandler("Unable to sign in", "It seems like there might be a network problem. Please check your wireless connection and try again.", "important");
                    }
                } else {
                    errorHandler("Unable to sign in", "It seems like there might be a network problem. Please check your wireless connection and try again.");
                }
            });
        } else {
            $('#swoosh-signinAccount-view .signinAccount-form .form-fields').banana({set: ['ani'], animation: "objShake"});
        }
    });
});