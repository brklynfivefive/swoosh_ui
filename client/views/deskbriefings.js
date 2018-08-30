var _ = require('lodash');
var moment = require('moment');
var tz = require('moment-timezone');
var fuse = require("fuse.js");
var curationRoutes = require('../subscriber/loadCuration');

$(function () {
    $('.main-briefingHome-view').on('tap', '.deskbriefings-action-toggle', function () {
        if (deviceWide()) return;
        if ($(this).parents('.desk-briefings').attr('swoosh-current') == 'folded') {
            $(this).parents('.desk-briefings').attr('swoosh-current', 'opened');
            $('.home-trendingjump-bar').attr('banana-status', '1');
        } else {
            $(this).parents('.desk-briefings').attr('swoosh-current', 'folded');
            $('.home-trendingjump-bar').attr('banana-status', '0');
        }
    });

    $('.main-briefingHome-view').on('tap', '.deskbriefings-notice', function () {
        if (!deviceWide()) {
            if ($(this).parents('.desk-briefings').attr('swoosh-current') == 'folded') {
                $(this).parents('.desk-briefings').attr('swoosh-current', 'opened');
                $('.home-trendingjump-bar').attr('banana-status', '1');
            } else {
                $(this).parents('.desk-briefings').attr('swoosh-current', 'folded');
                $('.home-trendingjump-bar').attr('banana-status', '0');
            }
        }
        
        if ($(this).attr('swoosh-current') == 'failed') curationRoutes.refreshCurationTags();
    });

    $('.main-briefingHome-view').on('tap', '.home-trendingjump-bar', function () {
        $('.home-trendingjump-bar').attr('banana-status', '0');
        $('.main-briefingHome-view .desk-briefings').attr('swoosh-current', 'folded');
        $('.main-briefingHome-view').scrollTo($('.main-briefingHome-view .trending-stories'), 200);
    });

    $('.main-briefingHome-view').on('tap', '.deskbriefings-type-selection li', function () {
        var objectkey = $(this).attr('swoosh-object-data');
        localStorage.setItem('swoosh_curationtags_type', objectkey);
        curationRoutes.refreshCurationTags('typechanged');
    });

    $('.main-briefingHome-view').on('tap', '.deskbriefings-group li', function () {
        var type = 'usasociety';
        var curationTagsCurrentType = localStorage.getItem('swoosh_curationtags_type');
        if (curationTagsCurrentType != undefined) {
            type = curationTagsCurrentType;
        }
        
        var thisObjectId = $(this).attr('swoosh-object-id');
        $('#swoosh-briefingload-indicator').attr('banana-status', '1');
        $('#swoosh-dimlayer-main').attr('banana-status', '1');
        
        var api_url = 'https://swoosh.inthenewsrooms.com/discover/briefings/usasociety/';
        if (type == 'usasociety') {
            api_url = 'https://swoosh.inthenewsrooms.com/discover/briefings/usasociety/';
        } else if (type == 'usapolitics') {
            api_url = 'https://swoosh.inthenewsrooms.com/discover/briefings/usapolitics/';
        } else if (type == 'usatechindustry') {
            api_url = 'https://swoosh.inthenewsrooms.com/discover/briefings/usatechindustry/';
        } else if (type == 'western-en-world') {
            api_url = 'https://swoosh.inthenewsrooms.com/discover/briefings/western-en-world/';
        } else if (type == 'usabusiness') {
            api_url = 'https://swoosh.inthenewsrooms.com/discover/briefings/usabusiness/';
        } else if (type == 'usafinance') {
            api_url = 'https://swoosh.inthenewsrooms.com/discover/briefings/usafinance/';
        } else if (type == 'usasports') {
            api_url = 'https://swoosh.inthenewsrooms.com/discover/briefings/usasports/';
        }

        $.ajax({
            type: 'GET',
            url: api_url + thisObjectId,
            headers: { 'x-access-token': swooshToken() },
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
                var b = moment.unix(data.content[0].ts).format();
                tsInfo = b;
                console.log(b);

                var keywords_f = data.content[0].keywords.filter(function (k) {
                    var a = k.split(' ');
                    if (a.length <= 5) return k;
                });

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
                    "tag": tags,
                    "ts": tsInfo,
                    "type": "deskfocus",
                    "rawTs": data.content[0].ts,
                    "mainphoto": data.content[0].mainphoto,
                    "stories": data.content[0].stories,
                    "keywords": keywords_f,
                    "keywordsCount": keywords_f.length,
                    "headstories": farray_head,
                    "storiescount": data.content[0].storiescount,
                    "headstoriesCount": farray_head.length,
                    "focusstories": data.content[0].focusstories,
                    "focusstoriesCount": data.content[0].focusstories.length,
                    "peakscale": data.content[0].peakscale
                }
                
                var thisBriefingDataArray = [];
                thisBriefingDataArray.array = finalArray;
                var ar = LZString.compress(JSON.stringify(finalArray));
                //localStorage.setItem('swoosh_briefings_current', ar);
                
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

    $('.main-briefingHome-view').on('tap', '.deskbriefings-alertoption', function () {
        var thisobj = $(this);
        if ($(thisobj).attr('swoosh-current') == 'no') {
            var APIpostData = JSON.stringify({
                "subscribestatus": "1"
            });

            $('#swoosh-network-indicator').attr('banana-status', '1');
            $('#swoosh-dimlayer-main').attr('banana-status', '1');

            $.ajax({
                type: 'POST',
                url: 'https://swoosh.inthenewsrooms.com/subscribers/config/deskfocusdaily',
                data: APIpostData,
                headers: { 'x-access-token': swooshToken() },
                contentType: "application/json",
                dataType: 'json',
                timeout: 20000
            })
            .done(function (data) {
                $('#swoosh-network-indicator').attr('banana-status', '0');
                $('#swoosh-dimlayer-main').attr('banana-status', '0');

                $(thisobj).attr('swoosh-current', 'yes');
                $(thisobj).find('li p').text('alert on');
                $('.main-updatenotice-bar .updateNoticeText').text('Successfully subscribed to Desk Focus Alert');
                $('.main-updatenotice-bar').banana({set: ['activetrans', 'callback'],
                    duration: 400,
                    transform: {data: "0, 0, 0"},
                    callback: function () {
                        setTimeout(function () {
                            $('.main-updatenotice-bar').banana({set: ['inactivetrans', 'callback'],
                                duration: 600,
                                transform: {data: "0, -200px, 0"},
                                callback: function () {
                                    $('.main-updatenotice-bar .updateNoticeText').text('');
                                }
                            });
                        }, 3000);
                    }
                });
            })
            .fail(function (data, textStatus) {
                $('#swoosh-network-indicator').attr('banana-status', '0');
                $('#swoosh-dimlayer-main').attr('banana-status', '0');

                if (data.responseText) {
                    var res = $.parseJSON(data.responseText);
                    var errMsg = res.error.message;

                    if (errMsg == "NO_SUBSCRIBERS" || errMsg == "INVALID_SUBSCRIBER_CREDENTIAL" || errMsg.indexOf('FAILED_AUTH') != -1) {
                        sessionExpired();
                    } else if (errMsg == "INVALID_DESKFOCUSALERT_PARAMETERS") {
                        errorHandler("Unable to subscribe desk focus alert", "It seems like the app has an interal issue while processing it. Please try again later.");
                    } else {
                        errorHandler("Unable to subscribe desk focus alert", "It seems like there might be a network problem. Please check your wireless connection and try again.");
                    }
                } else {
                    errorHandler("Unable to subscribe desk focus alert", "It seems like there might be a network problem. Please check your wireless connection and try again.");
                }
            });
        } else if ($(thisobj).attr('swoosh-current') == 'yes') {
            var APIpostData = JSON.stringify({
                "subscribestatus": "0"
            });

            $('#swoosh-network-indicator').attr('banana-status', '1');
            $('#swoosh-dimlayer-main').attr('banana-status', '1');

            $.ajax({
                type: 'POST',
                url: 'https://swoosh.inthenewsrooms.com/subscribers/config/deskfocusdaily',
                data: APIpostData,
                headers: { 'x-access-token': swooshToken() },
                contentType: "application/json",
                dataType: 'json',
                timeout: 20000
            })
            .done(function (data) {
                $('#swoosh-network-indicator').attr('banana-status', '0');
                $('#swoosh-dimlayer-main').attr('banana-status', '0');

                $(thisobj).attr('swoosh-current', 'no');
                $(thisobj).find('li p').text('alert off');
                $('.main-updatenotice-bar .updateNoticeText').text('Successfully unsubscribed from Desk Focus Alert');
                $('.main-updatenotice-bar').banana({set: ['activetrans', 'callback'],
                    duration: 400,
                    transform: {data: "0, 0, 0"},
                    callback: function () {
                        setTimeout(function () {
                            $('.main-updatenotice-bar').banana({set: ['inactivetrans', 'callback'],
                                duration: 600,
                                transform: {data: "0, -200px, 0"},
                                callback: function () {
                                    $('.main-updatenotice-bar .updateNoticeText').text('');
                                }
                            });
                        }, 3000);
                    }
                });
            })
            .fail(function (data, textStatus) {
                $('#swoosh-network-indicator').attr('banana-status', '0');
                $('#swoosh-dimlayer-main').attr('banana-status', '0');

                if (data.responseText) {
                    var res = $.parseJSON(data.responseText);
                    var errMsg = res.error.message;

                    if (errMsg == "NO_SUBSCRIBERS" || errMsg == "INVALID_SUBSCRIBER_CREDENTIAL" || errMsg.indexOf('FAILED_AUTH') != -1) {
                        sessionExpired();
                    } else if (errMsg == "INVALID_DESKFOCUSALERT_PARAMETERS") {
                        errorHandler("Unable to subscribe desk focus alert", "It seems like the app has an interal issue while processing it. Please try again later.");
                    } else {
                        errorHandler("Unable to subscribe desk focus alert", "It seems like there might be a network problem. Please check your wireless connection and try again.");
                    }
                } else {
                    errorHandler("Unable to subscribe desk focus alert", "It seems like there might be a network problem. Please check your wireless connection and try again.");
                }
            });
        }
    });
});