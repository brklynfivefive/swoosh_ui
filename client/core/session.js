var briefingInfoRoutes = require('../subscriber/loadBriefingConfig');

exports.sessionExpired = function () {
    errorHandler("Signed out from your last session safely", "It seems like your account session has expired. Try sign in again.");
    localStorage.clear();

    $('.main-navigation-bar').attr('swoosh-object', 'notoken');
    $('.main-settings-view').attr('banana-status', '0');
    $('.main-briefingHome-view').attr('banana-status', '0');
    $('.main-manageTags-view .others-group').empty();
    $('.main-manageTags-view .today-group').empty();
    $('.main-manageTags-view .briefingTagsStatText').text('No Briefing Tags');
    $('.main-manageTags-view .briefingTagsStatText').text('My Briefing tags');
    $('.main-manageTags-view .briefingTagsStatText').attr('swoosh-current', '');
    $('.main-briefingHome-view .todaybriefings-none').attr('banana-status', '0');
    $('.main-briefingHome-view .todaybriefings-load').attr('banana-status', '0');
    $('.main-briefingHome-view .todaybriefings-stories').empty();
    $('.main-readLater-view .list-group').empty();
    $('.main-readLater-view .readLater-none').attr('banana-status', '0');
    $('.main-navigation-bar').attr('swoosh-current', 'briefingHome');
    $('#swoosh-intro-view').banana({set: ['activetrans', 'callback'],
        duration: 0,
        transform: {data: "0, 0, 0"},
        callback: function () {
        }
    });
    
    if (deviceTypeAndroid()) {
        window.androidsfo.swooshsignout();
    } else if (deviceTypeiOS()) {
        appbridge({"swoosh_signout": ''});
    }
}