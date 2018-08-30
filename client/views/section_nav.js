var moment = require('moment');
var tz = require('moment-timezone');
var briefingInfoRoutes = require('../subscriber/loadBriefingConfig');

$(function () {
    $('.main-navigation-bar').on('tap', '.navmenu-container .navitem', function () {
        var currentState = $(this).parents('.main-navigation-bar').attr('swoosh-current');
        var targetSection = $(this).attr('swoosh-target');

        switch (currentState) {
            case 'briefingHome':
                $('.main-briefingHome-view').attr('banana-status', '0');
                if (deviceWide()) $('.main-manageTags-view').attr('banana-status', '0');
                break;
            case 'manageTags':
                $('.main-manageTags-view').attr('banana-status', '0');
                break;
            case 'readLater':
                $('.main-readLater-view').attr('banana-status', '0');
                break;
            case 'settings':
                $('.main-settings-view').attr('banana-status', '0');
                break;
        }

        switch (targetSection) {
            case 'manageTags':
                $('.main-manageTags-view').attr('banana-status', '1');
                $(this).parents('.main-navigation-bar').attr('swoosh-current', 'manageTags');
                $('.main-manageTags-view .manageTags-list ul').find('span[swoosh-object-type="ts"]').each(function () {
                    var ts = $(this).attr('swoosh-object-data');
                    var a = moment(new Date());
                    var b = moment(ts);
                    var tsInfo = a.from(b, true);

                    var tsText = tsInfo.replace('a few ', '<50 ').replace('a ', '1 ').replace('an ', '1 ').replace(' hours', 'h').replace(' hour', 'h').replace(' minutes', 'm').replace(' minute', 'm').replace(' days', 'd').replace(' day', 'd').replace(' months', 'mon').replace(' month', 'mon').replace(' years', 'y').replace(' year', 'y').replace(' seconds', 's').replace(' second', 's');
                    $(this).text(tsText);
                });

                if ($('.main-manageTags-view .manageTags-tagslist').find('li').length <= 0) {
                    $('.main-manageTags-view .manageTags-tagslist').attr('banana-status', '0');
                } else {
                    $('.main-manageTags-view .manageTags-tagslist').attr('banana-status', '1');
                }

                if ($('.main-manageTags-view').find('li').length <= 0) {
                    $('.main-navigation-bar .manageTags-options').attr('swoosh-current', 'none');
                }
                $('.main-manageTags-view').animate({ scrollTop: 0 }, 100);
                break;
            case 'briefingHome':
                $('.main-briefingHome-view').attr('banana-status', '1');
                $(this).parents('.main-navigation-bar').attr('swoosh-current', 'briefingHome');
                $('.main-briefingHome-view').animate({ scrollTop: 0 }, 100);
                break;
            case 'readLater':
                $('.main-readLater-view').attr('banana-status', '1');
                $(this).parents('.main-navigation-bar').attr('swoosh-current', 'readLater');
                $('.main-readLater-view').animate({ scrollTop: 0 }, 100);
                $('.main-readLater-view .list-group').find('.storyTs').each(function () {
                    var ts = $(this).attr('swoosh-object-data');
                    var a = moment(new Date());
                    var b = moment.unix(ts);
                    var tsInfo = b.from(a);
                    $(this).text(tsInfo);
                });
                break;
            case 'settings':
                $('.main-settings-view').attr('banana-status', '1');
                $(this).parents('.main-navigation-bar').attr('swoosh-current', 'settings');
                $('.main-settings-view').find('#settingsAccountEmailField').attr('placeholder', localStorage.getItem('swoosh_semail'));
                if (localStorage.getItem('swoosh_sname') != "") {
                    $('.main-settings-view').find('#settingsAccountUsernameField').attr('placeholder', localStorage.getItem('swoosh_sname'));
                } else {
                    $('.main-settings-view').find('#settingsAccountUsernameField').attr('placeholder', 'type to set username');
                }
                break;
        }
    });

    $('.main-navigation-bar').on('tap', function (event) {
        if ($(event.target).hasClass('main-navigation-bar')) {
            var currentState = $('.main-navigation-bar').attr('swoosh-current');
            switch (currentState) {
                case 'briefingHome':
                    $('.main-briefingHome-view').animate({ scrollTop: 0 }, 100);
                    break;
                case 'manageTags':
                    $('.main-manageTags-view').animate({ scrollTop: 0 }, 100);
                    break;
                case 'readLater':
                    $('.main-readLater-view').animate({ scrollTop: 0 }, 100);
                    break;
                case 'settings':
                    $('.main-settings-view').animate({ scrollTop: 0 }, 100);
                    break;
            }
        }
    });
});