$(function () {
    $('#swoosh-configDefaultBriefingMode-view .head-action-close').on('tap', function () {
        $('#swoosh-configDefaultBriefingMode-view').banana({set: ['inactivetrans', 'callback'],
            duration: 400,
            transform: {data: "0, 100%, 0"},
            callback: function () {
            }
        });
    });

    $('#swoosh-configDefaultBriefingMode-view').on('tap', 'li', function () {
        var traceData = $(this).attr('swoosh-object-data');
        if (traceData == 'basic') {
            localStorage.setItem('swoosh_briefingmode_type', 'basic');
            $('.main-settings-view .settingsBriefingDefaultMode').text('basic');
            $('#swoosh-configDefaultBriefingMode-view .head-action-close').trigger('tap');
        } else if (traceData == 'comparemode') {
            localStorage.setItem('swoosh_briefingmode_type', 'comparemode');
            $('.main-settings-view .settingsBriefingDefaultMode').text('compare mode');
            $('#swoosh-configDefaultBriefingMode-view .head-action-close').trigger('tap');
        }
    });
});