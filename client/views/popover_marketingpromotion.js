$(function () {
    $('#swoosh-marketingpromotion-view .head-action-close').on('tap', function () {
        $('#swoosh-marketingpromotion-view').banana({set: ['inactivetrans', 'callback'],
            duration: 400,
            transform: {data: "0, 100%, 0"},
            callback: function () {
            }
        });
    });

    $('#swoosh-marketingpromotion-view').on('tap', '.promotion-image', function () {
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