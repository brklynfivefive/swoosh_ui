var briefingInfoRoutes = require('../subscriber/loadBriefingConfig');
var todaybriefingRoutes = require('../subscriber/loadTodayBriefings');
var lateststoriesRoutes = require('../subscriber/loadLatestStories');
var curationRoutes = require('../subscriber/loadCuration');
var savedStoriesRoutes = require('../subscriber/loadSavedStories');
var loadnoticeRoutes = require('../core/notice');
var moment = require('moment');
var tz = require('moment-timezone');

exports.nativeCheckInit = function (key) {
    if (key) localStorage.setItem('swoosh_c_type', key);

    $('.main-briefingHome-view').append(mainBriefingHome_tp);
    $('.main-manageTags-view').append(mainManageTags_tp);
    $('.main-readLater-view').append(mainReadLater_tp);
	$('.main-briefingHome-view .homeDateText').text(moment().format('dddd, MMM D'));

	if (deviceTypeAndroid()) $('body').attr('swoosh-device-type', 'android');
	if (deviceTypeiOS()) $('body').attr('swoosh-device-type', 'ios');

	if ($('body').width() >= 1024) $('body').attr('swoosh-screen-type', 'wide');
	// APP INIT
	if (swooshToken() !== null) {
		try {
			if (!debugmode()) {
				mixpanel.identify(swooshSid());
				mixpanel.people.set({
					"$email": localStorage.getItem('swoosh_semail'),
					"$last_login": new Date(),
					"userId": swooshSid(),
					"frameworkVersion": getBuildVersion()
				});
			}
		} catch (err) {
			console.log(err);
		}

		if (deviceWide()) {
			tabletAutoRefresh();
			$('.main-briefingHome-view .desk-briefings').attr('swoosh-current', 'opened');
		}

		mixpanel.track("Init", {"signinUserId": swooshSid()});
		// Briefings
		var briefingsArrayCached = localStorage.getItem('swoosh_briefings_home');
		if (briefingsArrayCached != undefined) {
			var rebuild = JSON.parse(LZString.decompress(briefingsArrayCached));
			var briefingSetCount = 0;
			if (rebuild == null) {
				$('.main-manageTags-view .manageTags-none').attr('banana-status', '1');
			} else {
				if (rebuild.length > 0) {
					$('.main-manageTags-view .manageTags-none').attr('banana-status', '0');
				} else {
					$('.main-manageTags-view .manageTags-none').attr('banana-status', '1');
				}
			}

			_.filter(rebuild, function (story) {
				var finalArray = story;
				var briefingTagArray = {};
				briefingTagArray.array = finalArray;

				if (story.rawTs != null) {
					var tsInfo = null;
					var unix = moment().utc().unix();
					var diff = unix*1000 - moment(story.rawTs).unix()*1000;
					var hoursDifference = diff/1000/60/60;
					
					if (hoursDifference < 24) {
						briefingSetCount++;
						$('.main-briefingHome-view .todaybriefings-tagslist ul').append(mainBriefingHomeTags_tp(briefingTagArray));
						$('.main-manageTags-view .list-group').append(mainManageTagsTags_tp(briefingTagArray));
					} else {
						$('.main-manageTags-view .list-group').append(mainManageTagsTags_tp(briefingTagArray));
					}
				} else {
					$('.main-manageTags-view .list-group').append(mainManageTagsTags_tp(briefingTagArray));
				}
			});

			var briefingStringType;
			if (briefingSetCount > 0) {
				$('.main-briefingHome-view .todaybriefings-load').attr('banana-status', '1');
			} else if (briefingSetCount == 0) {
				$('.main-briefingHome-view .todaybriefings-load').attr('banana-status', '0');
			}
		}

		// APP BRIEFING TIME INIT
		var bfHourCached = localStorage.getItem("swoosh_briefing_hour");
		if (bfHourCached != undefined) {
			var briefingHour = '8AM';
			switch (bfHourCached) {
				case '07':
					briefingHour = '7AM';
					break;
				case '08':
					briefingHour = '8AM';
					break;
				case '09':
					briefingHour = '9AM';
					break;
				case '10':
					briefingHour = '10AM';
					break;
				case '18':
					briefingHour = '6PM';
					break;
				case '19':
					briefingHour = '7PM';
					break;
				case '20':
					briefingHour = '8PM';
					break;
				case '21':
					briefingHour = '9PM';
					break;
			}
			$('.main-manageTags-view .manageTagsBriefingHourConfig').text(briefingHour);
		}

		// Saved stories
		var savedstoriesOriginalCache = localStorage.getItem('swoosh_savedstories_data');
		if (savedstoriesOriginalCache != undefined) {
			var rebuild = JSON.parse(LZString.decompress(savedstoriesOriginalCache));
			var thisSavedStoriesArray = [];
			thisSavedStoriesArray.array = rebuild;
			
			if (rebuild == null) {
				$('.main-readLater-view .readLater-none').attr('banana-status', '1');
			} else {
				if (rebuild.length > 0) {
					$('.main-readLater-view .readLater-none').attr('banana-status', '0');
					$('.main-readLater-view .list-group').empty();
					$('.main-readLater-view .list-group').append(mainReadLaterStory_tp(thisSavedStoriesArray));
				} else {
					$('.main-readLater-view .readLater-none').attr('banana-status', '1');
				}
			}
		} else {
			$('.main-readLater-view .readLater-none').attr('banana-status', '1');
		}

		// APP HOT STORIES INIT
		var hotstoryType = 'usasociety';
		var hotstoryCurrentType = localStorage.getItem('swoosh_hotstories_type');
		if (hotstoryCurrentType != undefined) {
			hotstoryType = hotstoryCurrentType;
		}

		var type_humanread = "";
		if (hotstoryType == 'usasociety') type_humanread = "U.S.";
		if (hotstoryType == 'usapolitics') type_humanread = "Politics";
		if (hotstoryType == 'usatechindustry') type_humanread = "Technology";
		if (hotstoryType == 'usabusiness') type_humanread = "Business";
		if (hotstoryType == 'usasports') type_humanread = "Sports";
		if (hotstoryType == 'western-en-gaming') type_humanread = "Gaming";
		if (hotstoryType == 'western-en-world') type_humanread = "World";
		$('.main-briefingHome-view .type-selection').attr('swoosh-object-data', hotstoryType);

		var hsArrayCached = localStorage.getItem('swoosh_hotstories_content');
		var hsTsCached = localStorage.getItem('swoosh_hotstories_ts');
		
		if (hsArrayCached != undefined && hsArrayCached != 'undefined') {
			$('.main-briefingHome-view .trendingstories-none').attr('banana-status', '0');
			var rebuild = JSON.parse(LZString.decompress(hsArrayCached));
			var lsArray = [];
			lsArray.array = rebuild;

			$('.main-briefingHome-view .trendingstories-headstorieslist').append(mainBriefingHomeHotTags_tp(lsArray));
		} else {
			$('.main-briefingHome-view .trendingstories-none').attr('banana-status', '1');
		}

		$('.main-briefingHome-view .deskbriefings-type-selection').find('ul').scrollTo($('.main-briefingHome-view .deskbriefings-type-selection').find('li[swoosh-object-data="' + $('.main-briefingHome-view .deskbriefings-type-selection').find('ul').attr('swoosh-object-data') + '"]'), 100);

		$('.main-briefingHome-view .trendingstories-type-selection').find('ul').scrollTo($('.main-briefingHome-view .trendingstories-type-selection').find('li[swoosh-object-data="' + $('.main-briefingHome-view .trendingstories-type-selection').find('ul').attr('swoosh-object-data') + '"]'), 100);
		
        swooshUserInfoUpdate();
        $('.main-briefingHome-view').attr('banana-status', '1');
        $('.main-navigation-bar').attr('swoosh-object', '');

        // Refresh contents
        briefingInfoRoutes.briefingTimeConfig();
        briefingInfoRoutes.briefingTagsArray();
        curationRoutes.refreshCurationTags();
        savedStoriesRoutes.refreshSavedStories();
		lateststoriesRoutes.refreshHotStories();
		loadnoticeRoutes.loadNotice();
		loadnoticeRoutes.checkBuildUpdate();

		if (localStorage.getItem("swoosh_appbv") != getBuildVersionMarketing()) {
            if (localStorage.getItem("swoosh_appbv") != null & parseInt(localStorage.getItem("swoosh_appbv")) != getBuildVersionMarketing()) {
                $('#swoosh-marketingpromotion-view').banana({set: ['activetrans', 'callback'],
					duration: 400,
					transform: {data: "0, 0, 0"},
					callback: function () {
					}
				});
            } else {
				$('#swoosh-marketingpromotion-view').banana({set: ['activetrans', 'callback'],
					duration: 400,
					transform: {data: "0, 0, 0"},
					callback: function () {
					}
				});
			}

            localStorage.setItem("swoosh_appbv", getBuildVersionMarketing());
        }
    } else {
        // NON-TOKEN
        $('.main-briefingHome-view').attr('banana-status', '0');
        $('.main-navigation-bar').attr('swoosh-object', 'notoken');
		$('#swoosh-main-view').attr('banana-status', '0');
		$('#swoosh-intro-view').banana({set: ['activetrans', 'callback'],
			duration: 0,
			transform: {data: "0, 0, 0"},
			callback: function () {
				setTimeout(function () {
					$('#swoosh-main-view').attr('banana-status', '1');
				}, 200);
			}
		});
    }
}