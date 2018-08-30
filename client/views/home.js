var briefingInfoRoutes = require('../subscriber/loadBriefingConfig');
var todaybriefingRoutes = require('../subscriber/loadTodayBriefings');
var lateststoriesRoutes = require('../subscriber/loadLatestStories');
var curationRoutes = require('../subscriber/loadCuration');
var moment = require('moment');
var tz = require('moment-timezone');
var _ = require('lodash');
var fuse = require("fuse.js");
var d3 = require('d3');

$(function () {
    $('.main-briefingHome-view').on('tap', '.todaybriefings-notice', function () {
        if ($(this).attr('swoosh-current') == 'failed') {
            briefingInfoRoutes.briefingTagsArray();
            return;
        }
        if ($(this).attr('swoosh-current') !== 'exist') return;
        $('#swoosh-briefingload-indicator').attr('banana-status', '1');
        $('#swoosh-dimlayer-main').attr('banana-status', '1');

        $.ajax({
            type: 'GET',
            url: 'https://swoosh.inthenewsrooms.com/briefings',
            headers: { 'x-access-token': swooshToken() },
            contentType: "application/json",
            dataType: 'json',
            timeout: 40000
        })
        .done(function (data) {
            $('#swoosh-briefingload-indicator').attr('banana-status', '0');
            $('#swoosh-dimlayer-main').attr('banana-status', '0');

            var briefingSetArray = [];
            var briefingSetCount = 0;
            
            if (data.content !== null) {
                var briefingTagsObjectIds = [];
                data.content.filter(function (data, i, arr) {
                    var tags = arr[i].tag;

                    if (arr[i].ts != null) {
                        var tsInfo = null;
                        var unix = moment().utc().unix();
                        var diff = unix*1000 - moment(arr[i].ts).unix()*1000;
                        var hoursDifference = diff/1000/60/60;

                        var a = moment().utc();
                        var b = arr[i].ts;
                        tsInfo = b;

                        var focusArray = [];
                        arr[i].focusstories.filter(function (id) {
                            var fid = id;
                            arr[i].stories.filter(function (st) {
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

                        var keywords_f = arr[i].keywords.filter(function (k) {
                            var a = k.split(' ');
                            if (a.length <= 5) return k;
                        });

                        var finalArray = {
                            "objectid": arr[i].keyid,
                            "tag": tags.join(' '),
                            "ts": tsInfo,
                            "rawTs": arr[i].ts,
                            "mainphoto": arr[i].mainphoto,
                            "stories": arr[i].stories,
                            "keywords": keywords_f,
                            "keywordsCount": keywords_f.length,
                            "headstories": arr[i].headstories,
                            "storiescount": arr[i].storiescount,
                            "headstoriesCount": arr[i].headstoriesCount,
                            "focusstories": focusArray,
                            "focusstoriesCount": arr[i].focusstoriesCount,
                            "peakscale": arr[i].peakscale
                        }
                        
                        if (hoursDifference <= 24) {
                            briefingSetArray.push(finalArray);
                        }
                    }
                });

                var thisBriefingDataArray = [];
                thisBriefingDataArray.array = briefingSetArray;

                $('#swoosh-briefingPanelGroups').append(allbriefingsPanel_tp(thisBriefingDataArray));
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
    });

    $('.main-briefingHome-view').on('tap', '.todaybriefings-tagslist li', function (event) {
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
    });

    $('.main-briefingHome-view').on('tap', '.deskfocus-ticker', function () {
        $('.main-briefingHome-view').attr('banana-status', '0');
        $('.main-manageTags-view').attr('banana-status', '1');
        $('.main-navigation-bar').attr('swoosh-current', 'manageTags');
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
        
        $('.main-manageTags-view').scrollTo($('.main-manageTags-view .desk-briefings'), 150, { offset: 5 });
    });

    $('.main-briefingHome-view').on('tap', '.trendingstories-notice', function () {
        if ($(this).attr('swoosh-current') !== 'failed') return;
        lateststoriesRoutes.refreshHotStories();
    });

    $('.main-briefingHome-view').on('tap', '.trendingstories-action-alltoggle', function () {
        if ($(this).attr('swoosh-current') == 'closed') {
            $(this).parents('li').find('.allstoriesContainer').attr('banana-status', '1');
            $(this).attr('swoosh-current', 'opened');
        } else {
            $(this).attr('swoosh-current', 'closed');
            $(this).parents('li').find('.allstoriesContainer').attr('banana-status', '0');
        }
    });

    $('.main-briefingHome-view').on('tap', '.trending-stories .type-selection li', function () {
        var objectkey = $(this).attr('swoosh-object-data');
        localStorage.setItem('swoosh_hotstories_type', objectkey);
        $(this).parent().attr('swoosh-object-data', objectkey);
        $('.main-briefingHome-view .trendingstories-type-selection').find('ul').scrollTo($('.main-briefingHome-view .trendingstories-type-selection').find('li[swoosh-object-data="' + $('.main-briefingHome-view .trendingstories-type-selection').find('ul').attr('swoosh-object-data') + '"]'), 100);
        
        lateststoriesRoutes.refreshHotStories('typechanged');
        $('.main-briefingHome-view .trendingstories-action-categorySelect').trigger('tap');
    });

    function focuspoint_jump (thisobj) {
        if (swooshToken() == null) return;
        var thisObjectId = $(thisobj).parents('li').attr('swoosh-object-id');
        var text = $(thisobj).text();
        mixpanel.track("Tapped trending focus points", {"tag": text});
        var hotstoriesArray = JSON.parse(LZString.decompress(localStorage.getItem('swoosh_hotstories_content')));
        var thisStoryArray = hotstoriesArray.filter(function (story) { return story.objectid == thisObjectId; });

        var combinePendingKeywordsArray = [];
        var thisStoryHotKeywordArray = [];
        hotstoriesArray.filter(function (story) {
            if (story.objectid == thisObjectId) {
                story.hotkeyword.filter(function (key) { thisStoryHotKeywordArray.push(key) });
            }
        });
        thisStoryHotKeywordArray.filter(function (key) { combinePendingKeywordsArray.push({ "hotkeyword": key }); });

        var thisStoryKeywordsArray = [];
        if (thisStoryArray[0].hotstories) {
            thisStoryArray[0].hotstories.filter(function (story) { 
                if (story.keywords) story.keywords.filter(function (key) { thisStoryKeywordsArray.push(key) }); 
            });
        }

        thisStoryArray[0].headstory.filter(function (story) { 
            if (story.keywords) story.keywords.filter(function (key) { thisStoryKeywordsArray.push(key) }); 
        });
        thisStoryKeywordsArray.filter(function (key) { combinePendingKeywordsArray.push({ "keyword": key }); });

        var combinedKeywordArray = {
            "array": []
        }
        combinedKeywordArray.array = combinePendingKeywordsArray;

        //init dom
        $('#swoosh-hsTagsSuggestion-view .tagSuggestion-group ul').empty();
        $('#swoosh-hsTagsSuggestion-view .tagSuggestion-group ul').append(tagsHotStories_tp(combinedKeywordArray));

        $('#swoosh-hsTagsSuggestion-view').banana({set: ['activetrans', 'callback'],
            duration: 400,
            transform: {data: "0, 0, 0"},
            callback: function () {
            }
        });
    }

    $('.main-briefingHome-view').on('tap', 'div[swoosh-object-type="hotstory"]', function (event) {
        if (!$(event.target).hasClass('story-action-share') && !$(event.target).parent().hasClass('story-action-share') && !$(event.target).parent().parent().hasClass('story-action-share') && !$(event.target).hasClass('story-action-addtag') && !$(event.target).parent().hasClass('story-action-addtag')) {
            var traceLink = $(this).attr('swoosh-object-link');
            if (traceLink != "" && traceLink != undefined && traceLink != "none") {
                if (deviceTypeAndroid()) {
                    window.androidsfo.openlink(traceLink);
                } else if (deviceTypeiOS()) {
                    appbridge({"open_link": traceLink});
                }
                if (!deviceTypeAndroid() && !deviceTypeiOS()) window.open(traceLink,'_blank');
            }
        } else {
            var thisObjectId = $(this).attr('swoosh-object-array');
            var hstype = $('.main-briefingHome-view').find('.trendingstories-type-selection').find('.type-selection').attr('swoosh-object-data');
            if ($(event.target).hasClass('story-action-share') || $(event.target).parent().hasClass('story-action-share') || $(event.target).parent().parent().hasClass('story-action-share')) {
                var traceLink = $(this).attr('swoosh-object-link');
                if (traceLink != "" && traceLink != undefined && traceLink != "none") {
                    var data = {
                        "options": [
                            {
                                "key": "sharestory",
                                "text": "Share this story",
                                "info": traceLink
                            },
                            {
                                "key": "saveforlater",
                                "text": "Save this for later",
                                "info": thisObjectId
                            }
                        ]
                    };

                    $('#swoosh-actionsheet-view ul').empty();
                    $('#swoosh-actionsheet-view ul').append(actionsheet_tp(data));
                    $('#swoosh-actionsheet-view').attr('swoosh-object-data', 'lateststory-moreoptions');
                    $('#swoosh-actionsheet-view').attr('swoosh-object-type', hstype);
                    $('#swoosh-dimlayer-main').banana({set: ['1']});
                    $('#swoosh-actionsheet-view').banana({set: ['activetrans', 'callback'],
                        duration: 400,
                        transform: {data: "0, 0, 0"},
                        callback: function () {
                        }
                    });
                } else {
                    var data = {
                        "options": [
                            {
                                "key": "saveforlater",
                                "text": "Save this for later",
                                "info": thisObjectId
                            }
                        ]
                    };

                    $('#swoosh-actionsheet-view ul').empty();
                    $('#swoosh-actionsheet-view ul').append(actionsheet_tp(data));
                    $('#swoosh-actionsheet-view').attr('swoosh-object-data', 'lateststory-moreoptions');
                    $('#swoosh-actionsheet-view').attr('swoosh-object-type', hstype);
                    $('#swoosh-dimlayer-main').banana({set: ['1']});
                    $('#swoosh-actionsheet-view').banana({set: ['activetrans', 'callback'],
                        duration: 400,
                        transform: {data: "0, 0, 0"},
                        callback: function () {
                        }
                    });
                }
            } else if ($(event.target).hasClass('story-action-addtag') || $(event.target).parent().hasClass('story-action-addtag')) {
                focuspoint_jump($(this));
            }
        }
    });
});