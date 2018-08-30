var moment = require('moment');
var tz = require('moment-timezone');
var _ = require('lodash');
var fuse = require("fuse.js");
var d3 = require('d3');
var briefingFilterRoutes = require('../views/briefing_filter');

$(function () {
    $('#swoosh-briefingPanelGroups').on('tap', '.swoosh-dailybriefingView .bfP-newBriefingSetRequestview .subview-action-close', function () {
        var obj = $(this).parents('.bfP-newBriefingSetRequestview');
        $(obj).banana({set: ['inactivetrans', 'callback'],
            duration: 400,
            transform: {data: "0, 100%, 0"},
            callback: function () {
                $(obj).find('li[swoosh-current="selected"]').attr('swoosh-current', '');
                $(obj).find('.subview-action-confirm').attr('banana-status', '0');
            }
        });
    });

    $('#swoosh-briefingPanelGroups').on('tap', '.swoosh-dailybriefingView .bfP-newBriefingSetRequestview .newBriefingSetRequest-action-newpreset', function () {
        $('#swoosh-addComparePreset-view').banana({set: ['activetrans', 'callback'],
            duration: 400,
            transform: {data: "0, 0, 0"},
            callback: function () {
            }
        });
    });

    $('#swoosh-briefingPanelGroups').on('tap', '.swoosh-dailybriefingView .bfP-newBriefingSetRequestview .sourcegroup-title', function () {
        if ($(this).parent().attr('swoosh-current') == 'opened') {
            $(this).parent().attr('swoosh-current', 'closed');
        } else {
            $(this).parent().attr('swoosh-current', 'opened');
        }
    });

    $('#swoosh-briefingPanelGroups').on('tap', '.swoosh-dailybriefingView .bfP-newBriefingSetRequestview li', function () {
        if ($(this).attr('swoosh-current') != 'selected') {
            $(this).attr('swoosh-current', 'selected');
        } else {
            $(this).attr('swoosh-current', '');
        }

        if ($(this).parents('.bfP-newBriefingSetRequestview').find('li[swoosh-current="selected"]').length > 0) {
            $(this).parents('.bfP-newBriefingSetRequestview').find('.subview-action-confirm').attr('banana-status', '1');
        } else {
            $(this).parents('.bfP-newBriefingSetRequestview').find('.subview-action-confirm').attr('banana-status', '0');
        }
    });

    $('#swoosh-briefingPanelGroups').on('tap', '.swoosh-dailybriefingView .bfP-newBriefingSetRequestview .subview-action-confirm', function () {
        var obj = $(this).parents('.bfP-newBriefingSetRequestview');

        var targetPanelDOM = $(this).parents('.swoosh-dailybriefingView');
        var tabGroup = $(this).parents('.swoosh-dailybriefingView').find('.briefingContainer-tabs').find('ul');
        var currentTabsLength = $(this).parents('.swoosh-dailybriefingView').find('.briefingContainer-tabs').find('li').length;
        var currentTab = $(this).parents('.swoosh-dailybriefingView').find('.briefingContainer-tabs').find('li[swoosh-object-status="active"]');
        var currentView = $(this).parents('.swoosh-dailybriefingView').find('.briefingContainer-view').find('.bfP-view[banana-status="1"]');
        var parentViewTabs = $(this).parents('.swoosh-dailybriefingView').find('.briefingContainer-tabs ul');
        var parentViewPanel = $(this).parents('.swoosh-dailybriefingView').find('.briefingContainer-view');

        var sourcesSelected = [];
        $(this).parents('.bfP-newBriefingSetRequestview').find('.newBriefing-sourceslist li[swoosh-current="selected"]').each(function () {
            sourcesSelected.push($(this).attr('swoosh-object-data'));
        });

        $(this).parents('.bfP-newBriefingSetRequestview').find('.newBriefing-sourcepresetlist li[swoosh-current="selected"]').each(function () {
            var presetsources = JSON.parse($(this).attr('swoosh-object-array'));
            _.filter(presetsources, function (ps) {
                sourcesSelected.push(ps);
            });
        });

        sourcesSelected = _.uniqWith(sourcesSelected, _.isEqual);

        var sourcesText = "";
        if (sourcesSelected.length > 1) {
            sourcesText = (sourcesSelected[0]) + ' and ' + (sourcesSelected.length-1) + '+';
        } else {
            sourcesText = sourcesSelected[0];
        }
        
        $('#swoosh-briefingload-indicator').attr('banana-status', '1');
        $('#swoosh-dimlayer-main').attr('banana-status', '1');
        var thisobjectTag = $(this).parents('.swoosh-dailybriefingView').find('.dailybriefingTag').text();
        var APIpostData = JSON.stringify({
            "keyword": thisobjectTag,
            "sources": sourcesSelected
        });
        
        $.ajax({
            type: 'POST',
            url: 'https://swoosh.inthenewsrooms.com/briefings/new/content/',
            headers: { 'x-access-token': swooshToken() },
            data: APIpostData,
            contentType: "application/json",
            dataType: 'json'
        })
        .done(function (data) {
            $(obj).find('.subview-action-close').trigger('tap');
            $('#swoosh-briefingload-indicator').attr('banana-status', '0');
            $('#swoosh-dimlayer-main').attr('banana-status', '0');
            if (data.content == null) {
                errorHandler("No briefing for you at this moment", "There's no briefing content available for you right now. Please try add other sources.");
                return;
            }

            var tags = data.content.tag;
            if (data.content.stories != null) {
                var tsInfo = null;
                var unix = moment().utc().unix();
                var diff = unix*1000 - moment(data.content.ts).unix()*1000;
                var hoursDifference = diff/1000/60/60;

                var a = moment().utc();
                var b = data.content.ts;
                tsInfo = b;

                var keywords_f = data.content.keywords.filter(function (k) {
                    var a = k.split(' ');
                    if (a.length <= 5) return k;
                });

                var focusArray = [];
                data.content.focusstories.filter(function (id) {
                    var fid = id;
                    data.content.stories.filter(function (st) {
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

                var storiesarr = data.content.stories;
                if (data.content.storiescount == data.content.focusstoriesCount) {
                    storiesarr = null;
                }
                
                focusArray = _.uniqWith(focusArray, _.isEqual);

                var farray_head = [];
                if (keywords_f.length > 0) {
                    var farray_all = [];
                    var farray_all_base = [];
                    _.filter(data.content.stories, function (st) {
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
                            farray_focus.push({
                                "story": scf.item,
                                "keyword": word
                            });
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
                    "tabcount": currentTabsLength+1,
                    "sources": sourcesText,
                    "objectid": data.content.keyid,
                    "tag": tags.join(' '),
                    "ts": tsInfo,
                    "rawTs": data.content.ts,
                    "mainphoto": data.content.mainphoto,
                    "stories": storiesarr,
                    "keywords": keywords_f,
                    "keywordsCount": keywords_f.length,
                    "headstories": farray_head,
                    "storiescount": data.content.storiescount,
                    "headstoriesCount": farray_head.length,
                    "focusstories": focusArray,
                    "focusstoriesCount": data.content.focusstoriesCount,
                    "peakscale": data.content.peakscale
                }
                
                var thisBriefingDataArray = [];
                thisBriefingDataArray.array = finalArray;

                $(currentTab).attr('swoosh-object-status', 'inactive');
                $(currentView).attr('banana-status', '0');
                
                $(parentViewPanel).append(dailybriefingViewSub_tp(thisBriefingDataArray));
                $(parentViewTabs).append(dailybriefingViewTab_tp(thisBriefingDataArray));

                $(tabGroup).scrollTo($(tabGroup).find('li:nth-last-child(1)'), 100);

                var newViewObjId = $(tabGroup).find('li:nth-last-child(1)').attr('swoosh-object-id');
                var newTargetViewDOM = $(parentViewPanel).find('.bfP-view[swoosh-object-id="' + newViewObjId + '"]');

                $(newTargetViewDOM).find('.highlighted-story').css('height', $('body').height() * 0.32);
                $(newTargetViewDOM).find('.highlighted-story').find('.focusStoryTs').each(function () {
                    $(this).text(moment.unix($(this).attr('swoosh-data')).format("ddd, h:mmA"));
                });

                if ($(newTargetViewDOM).find('.highlighted-story').length <= 0 || deviceWide()) {
                    $(newTargetViewDOM).find('.allstories-group').attr('swoosh-current', 'opened');
                }

                var sentimentarray = {
                    "pos_normal": [],
                    "pos_high": [],
                    "neutral": [],
                    "neg_normal": [],
                    "neg_high": []
                };
                $(newTargetViewDOM).find('.allstories-group div[swoosh-object-type="briefingstory"]').each(function (i, v) {
                    var data = $(this).attr('swoosh-object-sentiment');
                    if (data >= 4 && data < 6) {
                        sentimentarray.pos_normal.push(data);
                    } else if (data >= 6) {
                        sentimentarray.pos_high.push(data);
                    } else if (data <= 3 && data > -4) {
                        sentimentarray.neutral.push(data);
                    } else if (data <= -4 && data > -6) {
                        sentimentarray.neg_normal.push(data);
                    } else if (data <= -6) {
                        sentimentarray.neg_high.push(data);
                    }
                });

                var sentimentCount = [];
                sentimentCount.push(sentimentarray.pos_high.length);
                sentimentCount.push(sentimentarray.pos_normal.length);
                sentimentCount.push(sentimentarray.neg_normal.length);
                sentimentCount.push(sentimentarray.neg_high.length);
                
                if (sentimentarray.pos_high.length > 1) {
                    $(newTargetViewDOM).find('.highPosStatText').text(sentimentarray.pos_high.length + ' highly positive stories');
                } else if (sentimentarray.pos_high.length == 1) {
                    $(newTargetViewDOM).find('.highPosStatText').text(sentimentarray.pos_high.length + ' highly positive story');
                } else if (sentimentarray.pos_high.length <= 0) {
                    $(newTargetViewDOM).find('.highPosStatText').text('no highly positive story');
                }

                if (sentimentarray.pos_normal.length > 1) {
                    $(newTargetViewDOM).find('.normalPosStatText').text(sentimentarray.pos_normal.length + ' positive stories');
                } else if (sentimentarray.pos_normal.length == 1) {
                    $(newTargetViewDOM).find('.normalPosStatText').text(sentimentarray.pos_normal.length + ' positive story');
                } else if (sentimentarray.pos_normal.length <= 0) {
                    $(newTargetViewDOM).find('.normalPosStatText').text('no positive story');
                }

                if (sentimentarray.neg_normal.length > 1) {
                    $(newTargetViewDOM).find('.normalNegStatText').text(sentimentarray.neg_normal.length + ' negative stories');
                } else if (sentimentarray.neg_normal.length == 1) {
                    $(newTargetViewDOM).find('.normalNegStatText').text(sentimentarray.neg_normal.length + ' negative story');
                } else if (sentimentarray.neg_normal.length <= 0) {
                    $(newTargetViewDOM).find('.normalNegStatText').text('no negative story');
                }

                if (sentimentarray.neg_high.length > 1) {
                    $(newTargetViewDOM).find('.highNegStatText').text(sentimentarray.neg_high.length + ' highly negative stories');
                } else if (sentimentarray.neg_high.length == 1) {
                    $(newTargetViewDOM).find('.highNegStatText').text(sentimentarray.neg_high.length + ' highly negative story');
                } else if (sentimentarray.neg_high.length <= 0) {
                    $(newTargetViewDOM).find('.highNegStatText').text('no highly negative story');
                }

                var sentimentMax = d3.max(sentimentCount);
                var scaleCalc = d3.scaleLinear().domain([0, sentimentMax]).range([0, 100]);

                var sentimentScale = [];
                sentimentCount.filter(function (p, e) {
                    sentimentScale.push(scaleCalc(sentimentCount[e]));
                });

                if (sentimentScale[0] <= 0) {
                    $(newTargetViewDOM).find('.highPosStat .stat-bar').css('display', 'none');
                } else {
                    $(newTargetViewDOM).find('.highPosStat .stat-bar').css('display', 'block');
                }

                if (sentimentScale[1] <= 0) {
                    $(newTargetViewDOM).find('.normalPosStat .stat-bar').css('display', 'none');
                } else {
                    $(newTargetViewDOM).find('.normalPosStat .stat-bar').css('display', 'block');
                }

                if (sentimentScale[2] <= 0) {
                    $(newTargetViewDOM).find('.normalNegStat .stat-bar').css('display', 'none');
                } else {
                    $(newTargetViewDOM).find('.normalNegStat .stat-bar').css('display', 'block');
                }

                if (sentimentScale[3] <= 0) {
                    $(newTargetViewDOM).find('.highNegStat .stat-bar').css('display', 'none');
                } else {
                    $(newTargetViewDOM).find('.highNegStat .stat-bar').css('display', 'block');
                }
                
                $(newTargetViewDOM).find('.highPosStat .stat-bar').css('width', sentimentScale[0]+'%');
                $(newTargetViewDOM).find('.normalPosStat .stat-bar').css('width', sentimentScale[1]+'%');
                $(newTargetViewDOM).find('.normalNegStat .stat-bar').css('width', sentimentScale[2]+'%');
                $(newTargetViewDOM).find('.highNegStat .stat-bar').css('width', sentimentScale[3]+'%');

                if ($(newTargetViewDOM).find('.headstories-group').length <= 0) {
                    $(newTargetViewDOM).find('.bfP-storieslist').attr('swoosh-status', 'noheadstories');
                    if (deviceWide()) {
                        $(newTargetViewDOM).find('.sentiment-group').insertBefore($(newTargetViewDOM).find('.allstories-group .stories-foldarea'));
                        $(newTargetViewDOM).find('.head-info-group').remove();
                    }
                }
            } else {
                errorHandler("No briefing for you at this moment", "There's not enough news story for the briefing at the moment. Please try add other sources.");
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
                } else if (errMsg == "NOT_ENOUGH_ARTICLES") {
                    errorHandler("No briefing for you at this moment", "There's not enough news story for the briefing at the moment. Please try add other sources.");
                } else {
                    errorHandler("Unable to load the briefing", "It seems like there might be a network problem. Please check your wireless connection and try again.");
                }
            } else {
                errorHandler("Unable to load the briefing", "It seems like there might be a network problem. Please check your wireless connection and try again.");
            }
        });
    });
});