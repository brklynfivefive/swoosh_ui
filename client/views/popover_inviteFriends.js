$(function () {
    $('#swoosh-inviteFriends-view .head-action-close').on('tap', function () {
        $('#swoosh-inviteFriends-view').banana({set: ['inactivetrans', 'callback'],
            duration: 400,
            transform: {data: "0, 100%, 0"},
            callback: function () {
                $('#swoosh-inviteFriends-view .inviteReferralCodeText').text('');
                $('#swoosh-inviteFriends-view .inviteReferralCountsText').text('');
            }
        });
    });

    $('#swoosh-inviteFriends-view').on('tap', '.inviteFriends-code', function () {
        var traceCode = 'Try create your own #Newsrooms- https://goo.gl/XCBEOQ /Referral code: ' + $(this).find('.inviteReferralCodeText').text();
        
        if (deviceTypeAndroid()) {
            window.androidsfo.invitecodeshare(traceCode);
        } else if (deviceTypeiOS()) {
            appbridge({"invitecode_share": traceCode});
        }
    });
});