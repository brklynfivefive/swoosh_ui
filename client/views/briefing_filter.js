exports.filterArticlesBySection = function (targetobj, excludeSections) {
    $(targetobj).find('div[swoosh-object-type="briefingstory"]').each(function () {
        if (_.includes(excludeSections, $(this).attr('swoosh-object-section')) == true) {
            $(this).attr('swoosh-object-filter', 'filtered');
        } else {
            $(this).attr('swoosh-object-filter', '');
        }
    }).promise().done(function () {
        if ($(targetobj).find('.bfP-focus').length > 0) {
            if ($(targetobj).find('.focus-story[swoosh-object-filter=""]').length == 1) {
                $(targetobj).find('.focusview-stories').find('.focus-story[swoosh-object-filter=""]').attr('swoosh-object-status', 'only');
            } else if ($(targetobj).find('.focus-story[swoosh-object-filter=""]').length <= 0) {
                var tracePanel = $(targetobj).find('.bfP-focus');
                $(tracePanel).banana({set: ['inactivetrans', 'callback'],
                    duration: 400,
                    transform: {data: "0, 100%, 0"},
                    callback: function () {
                        $(tracePanel).remove();
                    }
                });
            } else {
                $(targetobj).find('.focusview-stories').find('.focus-story[swoosh-object-status="only"]').attr('swoosh-object-status', '');
            }
        }
    });
}