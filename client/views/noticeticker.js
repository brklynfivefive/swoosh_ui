$(function () {
    $('.main-noticeticker-bar').on('tap', function () {
        $(this).attr('banana-status', '0');
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
});