$(function () {
    $('#swoosh-sendFeedback-view .head-action-close').on('tap', function () {
        $('#swoosh-sendFeedback-view').banana({set: ['inactivetrans', 'callback'],
            duration: 400,
            transform: {data: "0, 100%, 0"},
            callback: function () {
                $('#swoosh-createAccount-view #sendFeedbackMessageField').val('');
            }
        });
    });

    $('#swoosh-sendFeedback-view').on('tap', '.head-action-confirm', function () {
        var messageVal = $('#swoosh-sendFeedback-view #sendFeedbackMessageField').val();
        var platformType = "ios";
        if (deviceTypeAndroid()) {
            platformType = "android";
        } else if (deviceTypeiOS()) {
            platformType = "ios";
        } else {
            platformType = "web";
        }
        var currentTs = new Date().getTime()/1000 | 0;

        var entityMap = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#39;',
            '/': '&#x2F;',
            '`': '&#x60;',
            '=': '&#x3D;'
        };

        function escapeHtml (string) {
            return String(string).replace(/[&<>"'`=\/]/g, function (s) {
                return entityMap[s];
            });
        }

        if (messageVal != "" && messageVal != null) {
            var APIpostData = JSON.stringify({
                "message": escapeHtml(messageVal),
                "platform": platformType,
                "time": currentTs
            });

            $('#swoosh-sendFeedback-view .sendFeedbackTitleStatus').text('Sharing');
            $('#swoosh-sendFeedback-view .head-action-confirm').attr('banana-status', '0');
            $('#swoosh-network-indicator').attr('banana-status', '1');
            $('#swoosh-dimlayer-main').attr('banana-status', '1');

            $.ajax({
                type: 'POST',
                url: 'https://swoosh.inthenewsrooms.com/interact/feedback/',
                headers: { 'x-access-token': swooshToken() },
                data: APIpostData,
                contentType: "application/json",
                dataType: 'json',
                timeout: 20000
            })
            .done(function (data) {
                $('.main-updatenotice-bar .updateNoticeText').text('Successfully sent your feedback, thanks!');
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

                $('#swoosh-sendFeedback-view .sendFeedbackTitleStatus').text('Share');
                $('#swoosh-sendFeedback-view .head-action-confirm').attr('banana-status', '1');
                $('#swoosh-sendFeedback-view .head-action-close').trigger('tap');
                $('#swoosh-network-indicator').attr('banana-status', '0');
                $('#swoosh-dimlayer-main').attr('banana-status', '0');
            })
            .fail(function (data, textStatus) {
                $('#swoosh-sendFeedback-view .sendFeedbackTitleStatus').text('Share');
                $('#swoosh-sendFeedback-view .head-action-confirm').attr('banana-status', '1');
                $('#swoosh-network-indicator').attr('banana-status', '0');
                $('#swoosh-dimlayer-main').attr('banana-status', '0');
                if (data.responseText) {
                    var res = $.parseJSON(data.responseText);
                    var errMsg = res.error.message;

                    if (errMsg == "NO_SUBSCRIBERS" || errMsg == "INVALID_SUBSCRIBER_CREDENTIAL" || errMsg.indexOf('FAILED_AUTH') != -1) {
                        sessionExpired();
                    } else {
                        errorHandler("Unable to send your feedback", "It seems like there might be a network problem. Please check your wireless connection and try again.");
                    }
                } else {
                    errorHandler("Unable to send your feedback", "It seems like there might be a network problem. Please check your wireless connection and try again.");
                }
            });
        } else {
            $('#swoosh-sendFeedback-view .sendFeedback-guide').banana({set: ['ani'], animation: "objShake"});
            return;
        }
    });
});