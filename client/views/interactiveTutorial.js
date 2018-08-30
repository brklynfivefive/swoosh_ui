$(function () {
    $('#swoosh-interactiveTutorial-view').on('tap', function () {
        var thisObj = $(this).children('div[banana-status="1"]');
        var currentState = $(thisObj).attr('class');
        if (currentState == 'tutorialview-1') {
            $('.main-briefingHome-view .trending-stories').removeClass('tutorialHighlightmodeDim');
            $('.main-briefingHome-view .todaythings-group').addClass('tutorialHighlightmodeDim');

            $(thisObj).attr('banana-status', '0');
            if (!deviceWide()) {
                $('.main-briefingHome-view .desk-briefings').attr('swoosh-current', 'folded');
                $('#swoosh-interactiveTutorial-view .tutorialview-deskfocus-intro').css('margin-top', $('.main-briefingHome-view .desk-briefings').position().top - $('.main-briefingHome-view .desk-briefings').innerHeight());
            } else {
                $('#swoosh-interactiveTutorial-view .tutorialview-deskfocus-intro').css('margin-top', $('.main-briefingHome-view .desk-briefings').position().top - 70);
            }
            
            $('#swoosh-interactiveTutorial-view .tutorialview-deskfocus-intro').attr('banana-status', '1');

        } else if (currentState == 'tutorialview-deskfocus-intro') {
            $(thisObj).attr('banana-status', '0');
            $('#swoosh-interactiveTutorial-view .tutorialview-2').css('margin-top', $('.main-briefingHome-view .trendingstories-notice').position().top);
            $('#swoosh-interactiveTutorial-view .tutorialview-2').attr('banana-status', '1');

        } else if (currentState == 'tutorialview-2') {
            $(thisObj).attr('banana-status', '0');
            $('#swoosh-interactiveTutorial-view .tutorialview-3').css('margin-top', $('.main-briefingHome-view .trendingstories-notice').position().top - $('.main-briefingHome-view .trendingstories-notice').innerHeight() - 20);
            $('#swoosh-interactiveTutorial-view .tutorialview-3').attr('banana-status', '1');

        } else if (currentState == 'tutorialview-3') {
            $(thisObj).attr('banana-status', '0');
            $('.main-briefingHome-view').animate({ scrollTop: 200 }, 100);
            setTimeout(function () {
                $('#swoosh-interactiveTutorial-view .tutorialview-4').attr('banana-status', '1');
                $('#swoosh-interactiveTutorial-view .tutorialview-4').css('margin-top', $('.main-briefingHome-view .trendingstories-headstorieslist').find('li:nth-child(1)').position().top + $('.main-briefingHome-view .trendingstories-headstorieslist li:nth-child(1) .storyObj').innerHeight() - 120);
            }, 100);

        } else if (currentState == 'tutorialview-4') {
            $('.main-briefingHome-view .todaythings-group').removeClass('tutorialHighlightmodeDim');
            $('.main-manageTags-view .comparePresets-list').addClass('tutorialHighlightmodeDim');

            $('.main-navigation-bar .navitem[swoosh-target="manageTags"]').trigger('tap');
            setTimeout(function () {
                $(thisObj).attr('banana-status', '0');
                if ($('.main-manageTags-view .manageTags-tagslist').attr('banana-status') == '0') {
                    $('#swoosh-interactiveTutorial-view .tutorialview-5').css('margin-top', $('.main-manageTags-view .manageTags-none').position().top);
                } else {
                    $('#swoosh-interactiveTutorial-view .tutorialview-5').css('margin-top', $('.main-manageTags-view .manageTags-action-addTag').position().top + 20);
                }
                $('#swoosh-interactiveTutorial-view .tutorialview-5').attr('banana-status', '1');
            }, 100);

        } else if (currentState == 'tutorialview-5') {
            $('.main-manageTags-view').animate({ scrollTop: 0 }, 100);
            setTimeout(function () {
                $(thisObj).attr('banana-status', '0');
                $('#swoosh-interactiveTutorial-view .tutorialview-7').css('margin-top', $('.main-manageTags-view .manageTags-tagslist').position().top + 20);
                $('#swoosh-interactiveTutorial-view .tutorialview-7').attr('banana-status', '1');
            }, 100);

        } else if (currentState == 'tutorialview-7') {
            $('.main-briefingHome-view .todaythings-group').addClass('tutorialHighlightmodeDim');
            $('.main-manageTags-view .comparePresets-list').removeClass('tutorialHighlightmodeDim');
            $('.main-navigation-bar .navitem[swoosh-target="briefingHome"]').trigger('tap');
            setTimeout(function () {
                $('.main-briefingHome-view').animate({ scrollTop: 200 }, 10);
                setTimeout(function () {
                    $('#swoosh-interactiveTutorial-view .tutorialview-8').css('margin-top', $('.main-briefingHome-view .trendingstories-headstorieslist').find('li:nth-child(1)').position().top + $('.main-briefingHome-view .trendingstories-headstorieslist li:nth-child(1) .storyObj').innerHeight() - 120);
                    $('#swoosh-interactiveTutorial-view .tutorialview-8').attr('banana-status', '1');
                }, 100);
            }, 100);
            $(thisObj).attr('banana-status', '0');
            
        } else if (currentState == 'tutorialview-8') {
            $('.main-briefingHome-view .todaythings-group').removeClass('tutorialHighlightmodeDim');
            $('.main-briefingHome-view .trendingstories-headstorieslist li:nth-child(1) .story-action-addtag').trigger('tap');
            setTimeout(function () {
                $('#swoosh-interactiveTutorial-view .tutorialview-9').css('margin-top', $('#swoosh-hsTagsSuggestion-view .tagSuggestion-viewArea').position().top + 150);
                $('#swoosh-interactiveTutorial-view .tutorialview-9').attr('banana-status', '1');
            }, 350);
            $(thisObj).attr('banana-status', '0');

        } else if (currentState == 'tutorialview-9') {
            $('#swoosh-hsTagsSuggestion-view .head-action-close').trigger('tap');
            
            $('.main-briefingHome-view').animate({ scrollTop: 50 }, 0);
            setTimeout(function () {
                $('#swoosh-interactiveTutorial-view .tutorialview-10').css('margin-top', $('.main-briefingHome-view .desk-briefings').position().top - 80);
                $('#swoosh-interactiveTutorial-view .tutorialview-10').attr('banana-status', '1');
                $('.main-briefingHome-view .deskbriefings-action-toggle').trigger('tap');
            }, 100);
            $(thisObj).attr('banana-status', '0');

        } else if (currentState == 'tutorialview-10') {
            $('.main-briefingHome-view .deskbriefings-action-toggle').trigger('tap');
            $('.main-navigation-bar .navitem[swoosh-target="settings"]').trigger('tap');
            $('.main-settings-view .settings-account').addClass('tutorialHighlightmodeDim');
            setTimeout(function () {
                $('.main-settings-view').animate({ scrollTop: 150 }, 10);
                setTimeout(function () {
                    $('#swoosh-interactiveTutorial-view .tutorialview-12').attr('banana-status', '1');
                    $('#swoosh-interactiveTutorial-view .tutorialview-12').css('margin-top', $('.main-settings-view .account-action-hourconfig').position().top - $('.main-settings-view .account-action-hourconfig').innerHeight() - $('#swoosh-interactiveTutorial-view .tutorialview-12').innerHeight() + 20);
                }, 100);
            }, 100);
            $(thisObj).attr('banana-status', '0');

        } else if (currentState == 'tutorialview-12') {
            setTimeout(function () {
                $('#swoosh-interactiveTutorial-view .tutorialview-13').attr('banana-status', '1');
                $('#swoosh-interactiveTutorial-view .tutorialview-13').css('margin-top', $('.main-settings-view .account-action-prefconfig_socpol').position().top - $('.main-settings-view .account-action-prefconfig_socpol').innerHeight() - $('#swoosh-interactiveTutorial-view .tutorialview-13').innerHeight() + 40);
            }, 100);
            $(thisObj).attr('banana-status', '0');

        } else if (currentState == 'tutorialview-13') {
            $('.main-settings-view .settings-account').removeClass('tutorialHighlightmodeDim');
            $('.main-settings-view').animate({ scrollTop: 0 }, 0);
            $(thisObj).attr('banana-status', '0');
            $('#swoosh-interactiveTutorial-view .tutorialview-14').attr('banana-status', '1');
            $('#swoosh-interactiveTutorial-view .tutorialview-14').css('margin-top', $('.main-settings-view .account-action-invite').position().top - $('.main-settings-view .account-action-invite').innerHeight() - $('#swoosh-interactiveTutorial-view .tutorialview-14').innerHeight() + 20);

        } else if (currentState == 'tutorialview-14') {
            $('.main-navigation-bar .navitem[swoosh-target="briefingHome"]').trigger('tap');
            $('.main-briefingHome-view').addClass('tutorialHighlightmodeDim');
            $(thisObj).attr('banana-status', '0');
            $('#swoosh-interactiveTutorial-view .tutorialview-15').attr('banana-status', '1');

        } else if (currentState == 'tutorialview-15') {
            $('.main-briefingHome-view').removeClass('tutorialmode');
            $('.main-manageTags-view').removeClass('tutorialmode');
            $('.main-briefingHome-view').removeClass('tutorialHighlightmodeDim');
            $('#swoosh-interactiveTutorial-view').banana({set: ['inactiveani', 'callback'],
                animation: "objPopin",
                callback: function () {
                    $('#swoosh-interactiveTutorial-view .tutorialview-15').attr('banana-status', '0');
                    $('#swoosh-interactiveTutorial-view .tutorialview-1').attr('banana-status', '1');
                }
            });
        }
    });

});