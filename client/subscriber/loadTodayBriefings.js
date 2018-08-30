var moment = require('moment');
var tz = require('moment-timezone');
var _ = require('lodash');
var briefingInfoRoutes = require('../subscriber/loadBriefingConfig');

exports.refreshTodayBriefings = function (callback) {
    $('.main-briefingHome-view .todaybriefingsStatusText').text('refreshing briefings');
    $('.main-manageTags-view .briefingActiveTagsStatText').text('Refreshing briefings');
    $('.main-manageTags-view .manageTags-notice').attr('swoosh-current', 'processing');
    $('.main-briefingHome-view .todaybriefings-notice').attr('swoosh-current', 'processing');

    $.ajax({
        type: 'GET',
        url: 'https://swoosh.inthenewsrooms.com/briefings/check',
        headers: { 'x-access-token': swooshToken() },
        contentType: "application/json",
        dataType: 'json'
    })
    .done(function (data) {
        var briefingTagsArrayCachedString = localStorage.getItem("swoosh_briefing_tags");
        var briefingTagsArrayCached;
        if (briefingTagsArrayCachedString != undefined) {
            briefingTagsArrayCached = JSON.parse(briefingTagsArrayCachedString);
        } else {
            briefingInfoRoutes.briefingTagsArray(callback);
            return;
        }
        
        $('.main-manageTags-view .briefingActiveTagsStatText').text('My newsrooms');
        $('.main-manageTags-view .manageTags-notice').attr('swoosh-current', 'exist');
        $('.main-briefingHome-view .todaybriefings-notice').attr('swoosh-current', 'exist');

        var briefingSetArray = [];
        var briefingSetCount = 0;
        var briefingTodayTags = [];
        
        if (data.content !== null) {
            var briefingTagsObjectIds = [];
            $('.main-manageTags-view .list-group').find('li').each(function (obj) {
                briefingTagsObjectIds.push($(obj).attr('swoosh-object-id'));
            });

            $('.main-briefingHome-view .todaybriefings-tagslist ul').empty();
            $('.main-manageTags-view .list-group').empty();

            $('.main-manageTags-view .manageTags-none').attr('banana-status', '0');
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

                    var keywords_f = arr[i].keywords.filter(function (k) {
                        var a = k.split(' ');
                        if (a.length <= 5) return k;
                    });

                    var briefingTagArray = [];
                    var finalArray = {
                        "objectid": arr[i].keyid,
                        "tag": tags.join(' '),
                        "ts": tsInfo,
                        "rawTs": arr[i].ts,
                        "mainphoto": arr[i].mainphoto,
                        "stories": null,
                        "keywords": keywords_f,
                        "keywordsCount": keywords_f.length,
                        "headstories": null,
                        "storiescount": arr[i].storiescount,
                        "headstoriesCount": arr[i].headstoriesCount,
                        "focusstories": null,
                        "focusstoriesCount": arr[i].focusstoriesCount,
                        "peakscale": arr[i].peakscale
                    }
                    
                    briefingTagArray.array = finalArray;
                    briefingSetArray.push(finalArray);
                    
                    if (hoursDifference <= 24) {
                        briefingSetCount++;
                        briefingTodayTags.push(tags.join(' '));
                        $('.main-briefingHome-view .todaybriefings-tagslist ul').append(mainBriefingHomeTags_tp(briefingTagArray));
                        $('.main-manageTags-view .list-group').append(mainManageTagsTags_tp(briefingTagArray));
                    } else {
                        $('.main-manageTags-view .list-group').append(mainManageTagsTags_tp(briefingTagArray));
                    }
                } else {
                    var briefingTagArray = [];
                    var finalArray = {
                        "objectid": arr[i].keyid,
                        "tag": tags.join(' '),
                        "ts": null,
                        "rawTs": null,
                        "mainphoto": null,
                        "stories": null,
                        "keywords": null,
                        "keywordsCount": null,
                        "headstories": null,
                        "storiescount": null,
                        "headstoriesCount": null,
                        "focusstories": null,
                        "focusstoriesCount": null,
                        "peakscale": null
                    }

                    briefingSetArray.push(finalArray);
                    briefingTagArray.array = finalArray;
                    $('.main-manageTags-view .list-group').append(mainManageTagsTags_tp(briefingTagArray));
                }
            });
            
            if (deviceTypeAndroid() || deviceTypeiOS()) {
                localStorage.setItem('swoosh_briefings_home', '');
                var ar = LZString.compress(JSON.stringify(briefingSetArray));
                localStorage.setItem('swoosh_briefings_home', ar);
            }

        } else {
            $('.main-manageTags-view .list-group').empty();
            $('.main-manageTags-view .manageTags-none').attr('banana-status', '1');
            localStorage.removeItem('swoosh_briefings_home');
        }

        if (briefingSetCount >= 1) {
            if (briefingSetCount > 1) {
                $('.main-briefingHome-view .todaybriefingsStatusText').text(briefingSetCount + ' briefings today');
            } else {
                $('.main-briefingHome-view .todaybriefingsStatusText').text(briefingSetCount + ' briefing today');
            }

            $('.main-briefingHome-view .todayTagsText').text('About ' + [briefingTodayTags.slice(0, -1).join(', '), briefingTodayTags.slice(-1)[0]].join(briefingTodayTags.length < 2 ? '' : ' and '));
            $('.main-briefingHome-view .todaybriefings-none').attr('banana-status', '0');
        } else {
            $('.main-briefingHome-view .todaybriefingsStatusText').text('no briefings today');
            $('.main-briefingHome-view .todaybriefings-none').attr('banana-status', '1');
        }

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

        if (deviceWide()) {
            $('.main-briefingHome-view .home-subsections').css('height', $('body').height() - $('.main-briefingHome-view .todaythings-group').innerHeight());
        }

        if (deviceTypeAndroid() || deviceTypeiOS()) localStorage.setItem('swoosh_briefings_counts', briefingSetCount);
        if (callback) return callback();
    })
    .fail(function (data, textStatus) {
        $('.main-briefingHome-view .todaybriefingsStatusText').text('tap to refresh');
        $('.main-manageTags-view .briefingActiveTagsStatText').text('Tap to refresh briefings');
        $('.main-manageTags-view .manageTags-notice').attr('swoosh-current', 'failed');
        $('.main-briefingHome-view .todaybriefings-notice').attr('swoosh-current', 'failed');

        if ($('.main-manageTags-view').find('li').length <= 0) {
            $('.main-manageTags-view .manageTags-none').attr('banana-status', '1');
        }
    });
}

exports.loadTodayBriefingContents = function (callback) {
    $('.main-briefingHome-view .todaybriefings-load').attr('banana-status', '1');
    $('.main-briefingHome-view .today-briefings').attr('banana-status', '1');
    
    $.ajax({
        type: 'GET',
        url: 'https://swoosh.inthenewsrooms.com/briefings',
        headers: { 'x-access-token': swooshToken() },
        contentType: "application/json",
        dataType: 'json',
        timeout: 40000
    })
    .done(function (data) {
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
                        briefingSetCount++;
                        briefingSetArray.push(finalArray);
                    }
                }
            });

            var thisBriefingDataArray = [];
            thisBriefingDataArray.array = briefingSetArray;

            $('.main-briefingHome-view .todaybriefings-load').attr('banana-status', '0');
            $('.main-briefingHome-view .todaybriefings-stories').empty();
            if (briefingSetCount > 0) {
                $('.main-briefingHome-view .todaybriefings-none').attr('banana-status', '0');
                $('.main-briefingHome-view .todaybriefings-stories').append(todayBriefings_tp(thisBriefingDataArray));
                $('.main-briefingHome-view .todaybriefings-stories').attr('banana-status', '1');
                var todaystoriesObj = $('.main-briefingHome-view .todaybriefings-stories');
                $(todaystoriesObj).find('.today-story').find('.focusStoryTs').each(function () {
                    $(this).text(moment.unix($(this).attr('swoosh-data')).format("ddd, h:mmA"));
                });

                $(todaystoriesObj).find('.today-top').next().attr('swoosh-current', '');
                if ($(todaystoriesObj).find('.today-top').next().find('.story-photo').length > 0 || $(todaystoriesObj).find('.today-top').next().hasClass('today-tag')) {
                    $(todaystoriesObj).find('.today-top').attr('swoosh-object-data', 'firstphoto');
                } else {
                    $(todaystoriesObj).find('.today-top').attr('swoosh-object-data', '');
                }

                if ($(todaystoriesObj).find('.today-story').length == 1) {
                    $(todaystoriesObj).find('.today-story').attr('swoosh-current', 'only');
                } else {
                    $(todaystoriesObj).on('scroll', function () {
                        $(this).find('.today-story').each(function () {
                            if (Math.abs($(this).offset().top) >= $(todaystoriesObj).height()/3) {
                                if (this.getBoundingClientRect().top <= 0) {
                                    $(this).attr('swoosh-current', 'hidden');
                                } else if (this.getBoundingClientRect().bottom >= $(todaystoriesObj).height()/2) {
                                    $(this).attr('swoosh-current', 'hidden');
                                }
                            } else {
                                if (this.getBoundingClientRect().bottom >= $(todaystoriesObj).height()/3) {
                                    $(this).attr('swoosh-current', '');
                                }
                            }
                        });
                    });
                }

                $(todaystoriesObj).find('.today-story').each(function () {
                    var ids = $('[swoosh-object-id=\''+ $(this).attr('swoosh-object-id') +'\']');
                    if (ids.length > 1 && ids[0] == this) {
                        var count = ids.length;
                        $(todaystoriesObj).find('.today-story[swoosh-object-id=' + $(this).attr('swoosh-object-id') + ']').each(function (i) {
                            if (i >= count-1) return;
                            $(this).remove();
                        });
                    }
                });
            } else {
                $('.main-briefingHome-view .todaybriefings-none').attr('banana-status', '1');
                $('.main-briefingHome-view .todaybriefings-stories').attr('banana-status', '0');
            }
        } else {
            $('.main-briefingHome-view .todaybriefings-load').attr('banana-status', '0');
            $('.main-briefingHome-view .todaybriefings-none').attr('banana-status', '1');
            $('.main-briefingHome-view .todaybriefings-stories').attr('banana-status', '0');
            errorHandler("No briefing for you at this moment", "There's no briefing content available for you right now. Please wait until the next briefing delivery or try add another briefing tag.");
            return;
        }
    })
    .fail(function (data, textStatus) {
        $('.main-briefingHome-view .todaybriefings-load').attr('banana-status', '0');
        $('.main-briefingHome-view .todaybriefings-none').attr('banana-status', '1');
        
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