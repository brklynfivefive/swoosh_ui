var briefingInfoRoutes = require('../subscriber/loadBriefingConfig');
var moment = require('moment');

$(function () {
    $('.main-settings-view').on('tap', '.account-action-signout', function () {
        sessionExpired();
    });

    $('.main-settings-view').on('tap', '.account-action-message', function () {
        if (deviceTypeAndroid()) {
            window.androidsfo.messageteam();
        } else if (deviceTypeiOS()) {
            appbridge({"message_team": ''});
        }
    });

    $('.main-settings-view').on('tap', '.account-action-fb', function () {
        var traceLink = "http://facebook.com/inthenewsrooms";
        if (deviceTypeAndroid()) {
            window.androidsfo.opensocial(traceLink);
        } else if (deviceTypeiOS()) {
            appbridge({"open_social": traceLink});
        }

        if (!deviceTypeAndroid() && !deviceTypeiOS()) window.open(traceLink,'_blank');
    });

    $('.main-settings-view').on('tap', '.account-action-instagram', function () {
        var traceLink = "http://instagram.com/inthenewsrooms";
        if (deviceTypeAndroid()) {
            window.androidsfo.opensocial(traceLink);
        } else if (deviceTypeiOS()) {
            appbridge({"open_social": traceLink});
        }

        if (!deviceTypeAndroid() && !deviceTypeiOS()) window.open(traceLink,'_blank');
    });

    $('.main-settings-view').on('tap', '.account-action-twitter', function () {
        var traceLink = "http://twitter.com/inthenewsrooms";
        if (deviceTypeAndroid()) {
            window.androidsfo.opensocial(traceLink);
        } else if (deviceTypeiOS()) {
            appbridge({"open_social": traceLink});
        }

        if (!deviceTypeAndroid() && !deviceTypeiOS()) window.open(traceLink,'_blank');
    });

    $('.main-settings-view').on('tap', '.account-action-feedback', function () {
        $('#swoosh-sendFeedback-view').banana({set: ['activetrans', 'callback'],
            duration: 400,
            transform: {data: "0, 0, 0"},
            callback: function () {
            }
        });
    });

    $('.main-settings-view').on('tap', '.account-action-notice', function () {
        $('#swoosh-notice-view').find('.noticeitemTs').each(function () {
            $(this).text(moment($(this).attr('swoosh-data')).format("ddd, h:mmA"));
        });
        $('#swoosh-notice-view').banana({set: ['activetrans', 'callback'],
            duration: 400,
            transform: {data: "0, 0, 0"},
            callback: function () {
            }
        });
    });

    $('.main-settings-view').on('tap', '.account-action-promotion', function () {
        $('#swoosh-marketingpromotion-view').banana({set: ['activetrans', 'callback'],
            duration: 400,
            transform: {data: "0, 0, 0"},
            callback: function () {
            }
        });
    });

    $('.main-settings-view').on('tap', '.account-action-tutorial', function () {
        $('.main-navigation-bar .navitem[swoosh-target="briefingHome"]').trigger('tap');
        $('.main-briefingHome-view .trending-stories').addClass('tutorialHighlightmodeDim');
        $('.main-briefingHome-view').addClass('tutorialmode');
        $('.main-manageTags-view').addClass('tutorialmode');
        $('#swoosh-interactiveTutorial-view .tutorialview-1').css('margin-top', $('.main-briefingHome-view .todaybriefings-notice').position().top + $('.main-briefingHome-view .todaybriefings-notice').height() + 20);
        $('#swoosh-interactiveTutorial-view').banana({set: ['activeani'],
            animation: "objPrePopout"
        });
    });

    $('.main-settings-view').on('tap', '.account-action-invite', function () {
        $('#swoosh-network-indicator').attr('banana-status', '1');
        $('#swoosh-dimlayer-main').attr('banana-status', '1');

        $.ajax({
            type: 'GET',
            url: 'https://swoosh.inthenewsrooms.com/referral/request/',
            headers: { 'x-access-token': swooshToken() },
            contentType: "application/json",
            dataType: 'json',
            timeout: 20000
        })
        .done(function (data) {
            $('#swoosh-network-indicator').attr('banana-status', '0');
            $('#swoosh-dimlayer-main').attr('banana-status', '0');

            $('#swoosh-inviteFriends-view .inviteReferralCodeText').text(data.code);
            if (data.accepted.length <= 1) {
                $('#swoosh-inviteFriends-view .inviteReferralCountsText').text('Your referral count: ' + data.accepted.length);
            } else {
                $('#swoosh-inviteFriends-view .inviteReferralCountsText').text('Your referral counts: ' + data.accepted.length);
            }

            $('#swoosh-inviteFriends-view').banana({set: ['activetrans', 'callback'],
                duration: 400,
                transform: {data: "0, 0, 0"},
                callback: function () {
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
                } else if (errMsg == "NO_REFERRAL_CODE_EXIST") {
                    newreferral_request();
                } else {
                    errorHandler("Unable to load your referral code", "It seems like there might be a network problem. Please check your wireless connection and try again.");
                }
            } else {
                errorHandler("Unable to load your referral code", "It seems like there might be a network problem. Please check your wireless connection and try again.");
            }
        });

        function newreferral_request () {
            $('#swoosh-network-indicator').attr('banana-status', '1');
            $('#swoosh-dimlayer-main').attr('banana-status', '1');

            $.ajax({
                type: 'POST',
                url: 'https://swoosh.inthenewsrooms.com/referral/request/',
                headers: { 'x-access-token': swooshToken() },
                contentType: "application/json",
                dataType: 'json',
                timeout: 20000
            })
            .done(function (data) {
                $('#swoosh-network-indicator').attr('banana-status', '0');
                $('#swoosh-dimlayer-main').attr('banana-status', '0');

                $('#swoosh-inviteFriends-view .inviteReferralCodeText').text(data.code);
                $('#swoosh-inviteFriends-view .inviteReferralCountsText').text('0');

                $('#swoosh-inviteFriends-view').banana({set: ['activetrans', 'callback'],
                    duration: 400,
                    transform: {data: "0, 0, 0"},
                    callback: function () {
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
                    } else if (errMsg == "REFERRAL_CODE_EXISTS") {
                        errorHandler("Unable to create your referral code", "It seems like there's a referral code for you, however, something went wrong while loading it. Please try again later.");
                    } else {
                        errorHandler("Unable to create your referral code", "It seems like there might be a network problem. Please check your wireless connection and try again.");
                    }
                } else {
                    errorHandler("Unable to create your referral code", "It seems like there might be a network problem. Please check your wireless connection and try again.");
                }
            });
        }
    });

    $('.main-settings-view').on('tap', '.account-action-prefconfig_socpol', function () {
        $('#swoosh-configBfPreferenceSocPol-view').banana({set: ['activetrans', 'callback'],
            duration: 400,
            transform: {data: "0, 0, 0"},
            callback: function () {
            }
        });
    });

    $('.main-settings-view').on('tap', '.account-action-hourconfig', function () {
        $('#swoosh-configBriefingTime-view').banana({set: ['activetrans', 'callback'],
            duration: 400,
            transform: {data: "0, 0, 0"},
            callback: function () {
            }
        });
    });

    $('.main-settings-view').on('tap', '.account-action-editConfirm', function () {
        $('input, textarea').blur();
        var settingsAccountEmailVal = $('.main-settings-view #settingsAccountEmailField').val();
        var settingsAccountPassVal = $('.main-settings-view #settingsAccountPassField').val();
        var settingsAccountUsernameVal = $('.main-settings-view #settingsAccountUsernameField').val();

        var settingsUpdateAccEmail = $('.main-settings-view #settingsAccountEmailField').attr('placeholder');
        var settingsUpdateAccPass = null;
        var settingsUpdateAccUsername = $('.main-settings-view #settingsAccountUsernameField').attr('placeholder');

        if (settingsAccountEmailVal != "" && settingsAccountEmailVal != null) {
            settingsUpdateAccEmail = $('.main-settings-view #settingsAccountEmailField').val();
        }

        if (settingsAccountPassVal != "" && settingsAccountPassVal != null) {
            settingsUpdateAccPass = $('.main-settings-view #settingsAccountPassField').val();
        }

        if (settingsAccountUsernameVal != "" && settingsAccountUsernameVal != null) {
            settingsUpdateAccUsername = $('.main-settings-view #settingsAccountUsernameField').val();
        }

        if (!settingsUpdateAccEmail || /^[a-zA-Z0-9.!#$%&’*+\/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/i.test(settingsUpdateAccEmail) === false) {
            $('.main-settings-view .settings-account').banana({set: ['ani'], animation: "objShake"});
            return;
        }

		if (settingsUpdateAccUsername != null) {
			settingsUpdateAccUsername = settingsUpdateAccUsername.replace(/[.,#!\^\*;:{}="'_`()%@,$&~+\\|\]\[><\/]/gm, '').replace(/\s{2,}/g, ' ');
		}

        if ((settingsAccountEmailVal != "" && settingsAccountEmailVal != null) || (settingsAccountPassVal != "" && settingsAccountPassVal != null) || (settingsAccountUsernameVal != "" && settingsAccountUsernameVal != null)) {
            if (settingsUpdateAccPass != null) {
                var APIpostData = JSON.stringify({
                    "email": settingsUpdateAccEmail,
                    "password": settingsUpdateAccPass
                });
            } else if (settingsUpdateAccUsername != null) {
                var APIpostData = JSON.stringify({
                    "email": settingsUpdateAccEmail,
                    "username": settingsUpdateAccUsername
                });
            } else {
                if (settingsUpdateAccEmail !== localStorage.getItem('swoosh_semail')) {
                    var APIpostData = JSON.stringify({
                        "email": settingsUpdateAccEmail
                    });
                } else {
                    $('.main-settings-view .settings-account').banana({set: ['ani'], animation: "objShake"});
                }
            }
            
            $('.main-settings-view .settings-account').addClass('objFlickering');
            $('.main-settings-view .account-action-editConfirm').attr('banana-status', '0');

            $.ajax({
                type: 'POST',
                url: 'https://swoosh.inthenewsrooms.com/subscribers/edit/',
                data: APIpostData,
                contentType: "application/json",
                headers: { 'x-access-token': swooshToken() },
                dataType: 'json',
                timeout: 20000
            })
            .done(function (data) {
                localStorage.setItem('swoosh_semail', data.email);
                if (data.username) {
                    localStorage.setItem('swoosh_sname', data.username);
                }

                $('.main-updatenotice-bar .updateNoticeText').text('Successfully saved the changes');
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

                try {
                    if (!debugmode()) {
                        mixpanel.alias(swooshSid(), mixpanel.get_distinct_id());
                        mixpanel.people.set({
                            "$email": localStorage.getItem('swoosh_semail'),
                            "$last_login": new Date(),
                            "userId": swooshSid(),
                            "frameworkVersion": getBuildVersion()
                        });
                        mixpanel.track("Updated account info", {"signinUserId": swooshSid()});
                        mixpanel.identify(swooshSid());
                    }
                } catch (err) {
                    console.log(err);
                }
                
                $('.main-settings-view #settingsAccountEmailField').val('');
                $('.main-settings-view #settingsAccountPassField').val('');
                $('.main-settings-view #settingsAccountUsernameField').val('');
                $('.main-settings-view').find('#settingsAccountEmailField').attr('placeholder', localStorage.getItem('swoosh_semail'));
                if (localStorage.getItem('swoosh_sname') != "") {
                    $('.main-settings-view').find('#settingsAccountUsernameField').attr('placeholder', localStorage.getItem('swoosh_sname'));
                    $('.main-briefingHome-view').find('.homeSubscriberUsername').text(data.username + ',');
                } else {
                    $('.main-settings-view').find('#settingsAccountUsernameField').attr('placeholder', 'type to set username');
                    $('.main-briefingHome-view').find('.homeSubscriberUsername').text('Hi,');
                }


                $('.main-settings-view .settings-account').removeClass('objFlickering');
                $('.main-settings-view .account-action-editConfirm').attr('banana-status', '1');
            })
            .fail(function (data, textStatus) {
                $('.main-settings-view .settings-account').removeClass('objFlickering');
                $('.main-settings-view .account-action-editConfirm').attr('banana-status', '1');
                if (data.responseText) {
                    var res = $.parseJSON(data.responseText);
                    var errMsg = res.error.message;
                    console.log(errMsg);
                    if (errMsg == "NO_SUBSCRIBERS" || errMsg == "INVALID_SUBSCRIBER_CREDENTIAL" || errMsg.indexOf('FAILED_AUTH') != -1) {
                        sessionExpired();
                    } else {
                        errorHandler("Unable to save changes", "It seems like there might be a network problem. Please check your wireless connection and try again.");
                    }
                } else {
                    errorHandler("Unable to save changes", "It seems like there might be a network problem. Please check your wireless connection and try again.");
                }
            });
        } else {
            console.log('e');
            $('.main-settings-view .settings-account').banana({set: ['ani'], animation: "objShake"});
        }
    });
});