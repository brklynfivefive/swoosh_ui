var moment = require('moment');
var Chartist = require('chartist');

$(function () {
    var briefingPanelObserver = new MutationObserver(function (mutations) {
        mutations.forEach(function (mutation) {
            if (mutation.addedNodes[0] === null || mutation.addedNodes[0] === undefined) return;
            var objType = mutation.addedNodes[0].className;
            var targetPanelDOM = mutation.addedNodes[0];

            switch (objType) {
            case 'swoosh-briefingPanel':
                $(targetPanelDOM).banana({set: ['activetrans', 'callback'],
                    duration: 400,
                    transform: {data: "0, 0, 0"},
                    callback: function () {
                        if ($(targetPanelDOM).find('.bfP-focus').length > 0) {
                            $(targetPanelDOM).find('.bfP-focus').find('.focusview-stories').banana({set: ['1']});
                            $(targetPanelDOM).find('.focus-story').find('.focusStoryTs').each(function () {
                                $(this).text(moment.unix($(this).attr('swoosh-data')).format("ddd, h:mmA"));
                            });

                            if ($(targetPanelDOM).find('.focus-story').length == 1) {
                                $(targetPanelDOM).find('.focusview-stories').find('.focus-story').attr('swoosh-object-status', 'only');
                            }
                        }

                        if ($(targetPanelDOM).attr('swoosh-object-type') == 'all') {
                            $('.swoosh-briefingPanel').find('.view-title').css('width', 
                            $('.swoosh-briefingPanel').find('.view-head').width() - $('.swoosh-briefingPanel').find('.view-action-close').width());
                            $(targetPanelDOM).find('.focusview-stories').find('.focus-story').each(function () {
                                var ids = $('[swoosh-object-id=\''+ $(this).attr('swoosh-object-id') +'\']');
                                if (ids.length > 1 && ids[0] == this) {
                                    var count = ids.length;
                                    $(targetPanelDOM).find('.focusview-stories').find('.focus-story[swoosh-object-id=' + $(this).attr('swoosh-object-id') + ']').each(function (i) {
                                        if (i >= count-1) return;
                                        $(this).remove();
                                    });
                                }
                            });
                        }
                    }
                });
                var targetPanelFocusViewArea = $(targetPanelDOM).find('.focusview-stories');
                $(targetPanelFocusViewArea).on('scroll', function (e) {
                    if ($(this).scrollTop() >= 60) {
                        $(targetPanelDOM).find('.view-bar').attr('swoosh-current', 'scrolled');
                    } else {
                        $(targetPanelDOM).find('.view-bar').attr('swoosh-current', '');
                    }
                });
                break;
            }
        });    
    });

    var briefingPanelObserverConfig = {
        childList: true, 
        characterData: true
    };

    var briefingPanelObserverTargetNode = document.querySelector('#swoosh-briefingPanelGroups');
    briefingPanelObserver.observe(briefingPanelObserverTargetNode, briefingPanelObserverConfig);
});