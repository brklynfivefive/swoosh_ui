var _ = require('lodash');
var moment = require('moment');
var tz = require('moment-timezone');
var fuse = require("fuse.js");
var briefingInfoRoutes = require('../subscriber/loadBriefingConfig');

$(function () {
    $('.main-manageTags-view').on('tap', '.manageTags-notice', function () {
        if ($(this).attr('swoosh-current') !== 'failed') return;
        briefingInfoRoutes.briefingTagsArray();
    });

    $('.main-manageTags-view').on('tap', '.manageTags-action-addTag', function () {
        $('#swoosh-addBriefingTag-view').banana({set: ['activetrans', 'callback'],
            duration: 400,
            transform: {data: "0, 0, 0"},
            callback: function () {
            }
        });
    });

    $('.main-manageTags-view').on('tap', '.manageTags-action-hourconfig', function () {
        $('#swoosh-configBriefingTime-view').banana({set: ['activetrans', 'callback'],
            duration: 400,
            transform: {data: "0, 0, 0"},
            callback: function () {
            }
        });
    });

    $('.main-manageTags-view').on('tap', '.manageTags-action-editTag', function () {
        if ($('.main-manageTags-view .manageTags-notice').attr('swoosh-current') == 'processing') {
            errorHandler("Please wait for a few mins", "The app is refreshing your briefing tags right now. Please try again in a few mins.");
            return;
        }
        var tzConfig = localStorage.getItem("swoosh_briefing_tz");
        var timezoneParam = 'America/Los_Angeles';
        if (tzConfig != null) {
            switch (tzConfig) {
                case 'US_WEST':
                    timezoneParam = 'America/Los_Angeles';
                    break;
                case 'US_MOUNTAIN':
                    timezoneParam = 'America/Denver';
                    break;
                case 'US_CENTRAL':
                    timezoneParam = 'America/Chicago';
                    break;
                case 'US_EAST':
                    timezoneParam = 'America/New_York';
                    break;
            }
        }
        var subscriberHourConfig = parseInt(localStorage.getItem("swoosh_briefing_hour"));
        var thisHour = moment(moment(new Date)).tz(timezoneParam).format('HH:mm').split(':');
        if (thisHour[0] == subscriberHourConfig) {
            if ((parseInt(thisHour[1]) >= 46) && (parseInt(thisHour[1]) <= 48)) {
                errorHandler("Please wait for a few mins", "We're creating new daily briefings for you right now, hence you can't add or edit any briefing tags for the next two minutes.");
                return;
            }
        }

        $(this).attr('banana-status', '0');
        $('.main-manageTags-view').find('.manageTags-action-addTag').attr('banana-status', '0');
        $('.main-manageTags-view').find('.manageTags-action-editTagConfirm').attr('banana-status', '1');
        $('.main-manageTags-view').find('.tag-action-delete').each(function () {
            $(this).attr('banana-status', '1');
        });
    });

    $('.main-manageTags-view').on('tap', '.comparePresets-action-newpreset', function () {
        $('#swoosh-addComparePreset-view').banana({set: ['activetrans', 'callback'],
            duration: 400,
            transform: {data: "0, 0, 0"},
            callback: function () {
            }
        });
    });

    $('.main-manageTags-view').on('tap', '.comparePresets-list li', function () {
        var sourcesarray = [];
        sourcesarray.array = JSON.parse($(this).attr('swoosh-object-array'));
        $('#swoosh-comparePresetManage-view').find('.presetTitle').text($(this).children('p').text());
        $('#swoosh-comparePresetManage-view').find('.comparePresetManage-presetinfo').attr('swoosh-object-id', $(this).attr('swoosh-object-id'));
        $('#swoosh-comparePresetManage-view').find('.comparePresetManage-includedsources ul').append(comparepresetItemSources_tp(sourcesarray));
        $('#swoosh-comparePresetManage-view').banana({set: ['activetrans', 'callback'],
            duration: 400,
            transform: {data: "0, 0, 0"},
            callback: function () {
            }
        });
    });

    $('.main-manageTags-view').on('tap', '.manageTags-list li', function (event) {
        if (!$(event.target).hasClass('actionicon') && !$(event.target).parent().hasClass('actionicon')
        && !$(event.target).parent().hasClass('tag-action-delete') && !$(event.target).hasClass('tag-action-delete')) {
            if ($(this).attr('swoosh-object') == 'nobriefing') return;
            if ($(this).attr('swoosh-object-id') == undefined) return;
            var thisObjectId = $(this).attr('swoosh-object-id');
            $('#swoosh-briefingload-indicator').attr('banana-status', '1');
            $('#swoosh-dimlayer-main').attr('banana-status', '1');
            var APIpostData = JSON.stringify({
                "tagid": thisObjectId
            });
            
            $.ajax({
                type: 'POST',
                url: 'https://swoosh.inthenewsrooms.com/briefings/content/',
                headers: { 'x-access-token': swooshToken() },
                data: APIpostData,
                contentType: "application/json",
                dataType: 'json',
                timeout: 40000
            })
            .done(function (data) {
                $('#swoosh-briefingload-indicator').attr('banana-status', '0');
                $('#swoosh-dimlayer-main').attr('banana-status', '0');
                if (data.content == null) {
                    errorHandler("No briefing for you at this moment", "There's no briefing content available for you right now. Please wait until the next briefing delivery or try add another briefing tag.");
                    return;
                }

                var tags = data.content[0].tag;
                if (data.content[0].ts != null) {
                    var tsInfo = null;
                    var unix = moment().utc().unix();
                    var diff = unix*1000 - moment(data.content[0].ts).unix()*1000;
                    var hoursDifference = diff/1000/60/60;

                    var a = moment().utc();
                    var b = data.content[0].ts;
                    tsInfo = b;

                    var keywords_f = data.content[0].keywords.filter(function (k) {
                        var a = k.split(' ');
                        if (a.length <= 5) return k;
                    });

                    var focusArray = [];
                    data.content[0].focusstories.filter(function (id) {
                        var fid = id;
                        data.content[0].stories.filter(function (st) {
                            if (st.headstory != null) {
                                st.headstory.filter(function (el) {
                                    if (el.tweet_id == fid) focusArray.push(el);
                                });
                            } else if (st.storiesGroup != null) {
                                st.storiesGroup.filter(function (el) {
                                    if (el.tweet_id == fid) focusArray.push(el);
                                });
                            }
                        });
                    });
                    
                    focusArray = _.uniqWith(focusArray, _.isEqual);

                    var farray_head = [];
                    if (keywords_f.length > 0) {
                        var farray_all = [];
                        var farray_all_base = [];
                        _.filter(data.content[0].stories, function (st) {
                            if (st.headstory != null) {
                                _.filter(st.headstory, function (key) {
                                    farray_all.push({
                                        "key": key.title,
                                        "tweet_id": key.tweet_id
                                    });
                                    farray_all_base.push(key);
                                });
                            }

                            if (st.storiesGroup != null) {
                                _.filter(st.storiesGroup, function (key) {
                                    farray_all.push({
                                        "key": key.title,
                                        "tweet_id": key.tweet_id
                                    });
                                    farray_all_base.push(key);
                                });
                            }
                        });

                        var farray_focus = [];
                        _.filter(keywords_f, function (word) {
                            var scoreSearch = new fuse(farray_all, {keys: [ "key" ], include: ["score"]});
                            var score_result = scoreSearch.search(word);

                            score_result.sort(function (a, b) { return a.score < b.score ? 1 : -1; });
                            var score_result_f;
                            if (score_result.length > 1) {
                                score_result_f = score_result.splice(0, 1);
                            } else {
                                score_result_f = score_result;
                            }

                            _.filter(score_result_f, function (scf) {
                                var e = _.filter(farray_focus, function (fs) {
                                    return fs.story.tweet_id == scf.item.tweet_id;
                                });
                                
                                if (e.length <= 0) {
                                    farray_focus.push({
                                        "story": scf.item,
                                        "keyword": word
                                    });
                                }
                            });
                        });

                        _.filter(farray_all_base, function (all) {
                            _.filter(farray_focus, function (f) {
                                if (f.story.tweet_id == all.tweet_id) {
                                    farray_head.push({
                                        "story": all,
                                        "keyword": f.keyword
                                    });
                                }
                            });
                        });
                    }

                    var briefingTagArray = [];
                    var finalArray = {
                        "objectid": data.content[0].keyid,
                        "tag": tags.join(' '),
                        "ts": tsInfo,
                        "rawTs": data.content[0].ts,
                        "mainphoto": data.content[0].mainphoto,
                        "stories": data.content[0].stories,
                        "keywords": keywords_f,
                        "keywordsCount": keywords_f.length,
                        "headstories": farray_head,
                        "storiescount": data.content[0].storiescount,
                        "headstoriesCount": farray_head.length,
                        "focusstories": focusArray,
                        "focusstoriesCount": focusArray.length,
                        "peakscale": data.content[0].peakscale
                    }
                    
                    var thisBriefingDataArray = [];
                    thisBriefingDataArray.array = finalArray;
                    
                    $('#swoosh-briefingPanelGroups').append(dailybriefingView_tp(thisBriefingDataArray));
                } else {
                    errorHandler("No briefing for you at this moment", "There's no briefing content available for you right now. Please wait until the next briefing delivery or try add another briefing tag.");
                    return;
                }
            })
            .fail(function (data, textStatus) {
                $('#swoosh-briefingload-indicator').attr('banana-status', '0');
                $('#swoosh-dimlayer-main').attr('banana-status', '0');
                if (data.responseText) {
                    var res = $.parseJSON(data.responseText);
                    var errMsg = res.error.message;

                    if (errMsg == "NO_SUBSCRIBERS" || errMsg == "INVALID_SUBSCRIBER_CREDENTIAL" || errMsg.indexOf('FAILED_AUTH') != -1) {
                        sessionExpired();
                    } else {
                        errorHandler("Unable to load the briefing", "It seems like there might be a network problem. Please check your wireless connection and try again.");
                    }
                } else {
                    errorHandler("Unable to load the briefing", "It seems like there might be a network problem. Please check your wireless connection and try again.");
                }
            });
        }
    });

    $('.main-manageTags-view').on('tap', '.tag-action-delete', function () {
        if ($('.main-manageTags-view .manageTags-notice').attr('swoosh-current') == 'processing') {
            errorHandler("Please wait for a few mins", "The app is refreshing your briefing tags right now. Please try again in a few mins.");
            return;
        }
        var tzConfig = localStorage.getItem("swoosh_briefing_tz");
        var timezoneParam = 'America/Los_Angeles';
        if (tzConfig != null) {
            switch (tzConfig) {
                case 'US_WEST':
                    timezoneParam = 'America/Los_Angeles';
                    break;
                case 'US_MOUNTAIN':
                    timezoneParam = 'America/Denver';
                    break;
                case 'US_CENTRAL':
                    timezoneParam = 'America/Chicago';
                    break;
                case 'US_EAST':
                    timezoneParam = 'America/New_York';
                    break;
            }
        }
        var subscriberHourConfig = parseInt(localStorage.getItem("swoosh_briefing_hour"));
        var thisHour = moment(moment(new Date)).tz(timezoneParam).format('HH:mm').split(':');
        if (thisHour[0] == subscriberHourConfig) {
            if ((parseInt(thisHour[1]) >= 46) && (parseInt(thisHour[1]) <= 59)) {
                errorHandler("Please wait for a few mins", "We're creating new daily briefings for you right now, hence you can't add or edit any briefing tags for the next two minutes.");
                return;
            }
        }
        
        var thisObjectId = $(this).parent().parent().attr('swoosh-object-id');
        var thisObject = $(this).parent().parent();

        var S4 = function() {
            return (((1+Math.random())*0x10000)|0).toString(10).substring(1);
        };
        var tempObjectid = (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4()+S4()+S4());
        $(thisObject).attr('swoosh-temp-await-id', tempObjectid);
        var briefingsArray = JSON.parse(localStorage.getItem('swoosh_briefing_tags'));

        var thisTag;
        _.filter(briefingsArray, function (b) {
            if (b.keyid == thisObjectId) {
                thisTag = b.keyid;
            }
        });

        var dataset = {
            "type": 'deletetag',
            "id": thisTag,
            "ref_object1": tempObjectid
        }

        $('#swoosh-dimlayer-main').banana({set: ['1']});
        $('#swoosh-popupsheet-view').attr('swoosh-object-data', JSON.stringify(dataset));
        $('#swoosh-popupsheet-view').find('.popupsheet-info-text').text('Do you really want to delete the tag?');
        $('#swoosh-popupsheet-view').banana({set: ['activetrans', 'callback'],
            duration: 600,
            transform: {data: "0, 0, 0"},
            callback: function () {
            }
        });
    });
});