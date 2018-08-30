$(function () {
    $('#swoosh-notice-view .head-action-close').on('tap', function () {
        $('#swoosh-notice-view').banana({set: ['inactivetrans', 'callback'],
            duration: 400,
            transform: {data: "0, 100%, 0"},
            callback: function () {
            }
        });
    });

    $('#swoosh-notice-view').on('tap', '.noticeitem', function () {
        var traceLink = $(this).attr('swoosh-object-link');
        if (traceLink != "" && traceLink != undefined && traceLink != "none") {
            if (deviceTypeAndroid()) {
                window.androidsfo.openlink(traceLink);
            } else if (deviceTypeiOS()) {
                appbridge({"open_link": traceLink});
            }
            if (!deviceTypeAndroid() && !deviceTypeiOS()) window.open(traceLink,'_blank');
        }
    });
});