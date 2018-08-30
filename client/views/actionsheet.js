var briefingInfoRoutes = require('../subscriber/loadBriefingConfig');
var savedStoriesRoutes = require('../subscriber/loadSavedStories');
var actionsheetRoutes_stories = require('../views/actionsheet_func_stories');
var actionsheetRoutes_signup = require('../views/actionsheet_func_signup');

$(function () {
    $('#swoosh-actionsheet-view').on('tap', '.actionsheet-action-close', function () {
        $('#swoosh-actionsheet-view').banana({set: ['inactivetrans', 'callback'],
            duration: 400,
            transform: {data: "0, 300px, 0"},
            callback: function () {
                $('#swoosh-actionsheet-view').attr('swoosh-object-data', '');
                $('#swoosh-actionsheet-view').attr('swoosh-object-id', '');
                $('#swoosh-actionsheet-view').attr('swoosh-object-type', '');
            }
        });
        $('#swoosh-dimlayer-main').banana({set: ['0']});
    });

    $('#swoosh-actionsheet-view').on('tap', 'li', function () {
        var traceorigin = $('#swoosh-actionsheet-view').attr('swoosh-object-data');
        var traceactiontype = $(this).attr('swoosh-object-data');
        var thisObjectId = $(this).attr('swoosh-object-info');

        if (traceorigin == 'lateststory-moreoptions') {
            actionsheetRoutes_stories.action_latesttrendingstory(traceactiontype, thisObjectId);
        } else if (traceorigin == 'briefingstory-moreoptions') {
            actionsheetRoutes_stories.action_briefingstory(traceactiontype, thisObjectId);
        } else if (traceorigin == 'deskbriefing-moreoptions') {
            actionsheetRoutes_stories.action_deskbriefingstory(traceactiontype, thisObjectId);
        } else if (traceorigin == 'savedstories-moreoptions') {
            actionsheetRoutes_stories.action_savedstoriesstory(traceactiontype, thisObjectId);
        } else if (traceorigin == 'signup-failureretryoptions') {
            actionsheetRoutes_signup.action_signupretryoptions(traceactiontype, thisObjectId);
        }

        $('#swoosh-actionsheet-view .actionsheet-action-close').trigger('tap');
    });
});