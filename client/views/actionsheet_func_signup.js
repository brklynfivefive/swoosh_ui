exports.action_signupretryoptions = function (type, id) {
    if (type == 'referraltryagain') {
        var signupReferralVal = id;
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
}