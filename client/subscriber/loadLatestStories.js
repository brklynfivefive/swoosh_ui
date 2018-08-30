var moment = require('moment');
var tz = require('moment-timezone');
var fuse = require('fuse.js');
var _ = require('lodash');

function isMatch(searchOnString, searchText) {
    searchText = searchText.replace(/[\/\\^%&#=_"':;,$*+!`~?.><()|[\]{}]/g, '');
    return searchOnString.match(new RegExp("\\b"+searchText+"\\b", "i")) != null;
}

exports.refreshHotStories = function (mode) {
    $('.main-briefingHome-view .trendingstoriesUpdatedTs').text('Refreshing...');
    $('.main-briefingHome-view .trendingstories-notice').attr('swoosh-current', 'processing');
    var type = 'usasociety';
    var hotstoryCurrentType = localStorage.getItem('swoosh_hotstories_type');
    if (hotstoryCurrentType != undefined) {
        type = hotstoryCurrentType;
    }

    var type_humanread = "";
    if (type == 'usasociety') type_humanread = "U.S.";
    if (type == 'usapolitics') type_humanread = "Politics";
    if (type == 'usatechindustry') type_humanread = "Technology";
    if (type == 'usabusiness') type_humanread = "Business";
    if (type == 'usasports') type_humanread = "Sports";
    if (type == 'western-en-gaming') type_humanread = "Gaming";
    if (type == 'western-en-world') type_humanread = "World";
    $('.main-briefingHome-view .trending-stories .type-selection').attr('swoosh-object-data', type);

    var api_url = 'https://swoosh.inthenewsrooms.com/hotstories/v1.1/usasociety';
    if (type == 'usasociety') {
        api_url = 'https://swoosh.inthenewsrooms.com/hotstories/v1.1/usasociety';
    } else if (type == 'usapolitics') {
        api_url = 'https://swoosh.inthenewsrooms.com/hotstories/v1.1/usapolitics';
    } else if (type == 'usatechindustry') {
        api_url = 'https://swoosh.inthenewsrooms.com/hotstories/usatechindustry';
    } else if (type == 'usabusiness') {
        api_url = 'https://swoosh.inthenewsrooms.com/hotstories/usabusiness';
    } else if (type == 'usasports') {
        api_url = 'https://swoosh.inthenewsrooms.com/hotstories/usasports';
    } else if (type == 'usafinance') {
        api_url = 'https://swoosh.inthenewsrooms.com/hotstories/usafinance';
    }  else if (type == 'western-en-gaming') {
        api_url = 'https://swoosh.inthenewsrooms.com/hotstories/western-en-gaming';
    } else if (type == 'western-en-world') {
        api_url = 'https://swoosh.inthenewsrooms.com/hotstories/western-en-world';
    }

    if (mode == 'typechanged') $('.main-briefingHome-view .trendingstories-headstorieslist').empty();
    
    $.ajax({
        type: 'GET',
        url: api_url,
        contentType: "application/json",
        dataType: 'json'
    })
    .done(function (data) {
        $('.main-briefingHome-view .trendingstoriesUpdatedTs').text('');
        $('.main-briefingHome-view .trendingstories-notice').attr('swoosh-current', 'exist');
        if (data[0] == null) {
            if ($('.main-briefingHome-view .trendingstories-headstorieslist').find('div').length <= 0) {
                $('.main-briefingHome-view .trendingstories-none').attr('banana-status', '1');
            }
            return;
        }

        if (data[0].latest == null) {
            if (data[1].latest == null) {
                if ($('.main-briefingHome-view .trendingstories-headstorieslist').find('div').length <= 0) {
                    $('.main-briefingHome-view .trendingstories-none').attr('banana-status', '1');
                }
                return;
            }
        }
        
        $('.main-briefingHome-view .trendingstories-headstorieslist').empty();
        $('.main-briefingHome-view .trendingstories-tagslist ul').empty();
        $('.main-briefingHome-view .trendingstories-none').attr('banana-status', '0');
        var timezoneParam = 'America/New_York';
        $('.main-briefingHome-view .trendingstoriesUpdatedTs').text(moment(data[0].ts).tz(timezoneParam).format('h:mmA z'));
        if (deviceTypeAndroid() || deviceTypeiOS()) {
            localStorage.setItem('swoosh_hotstories_ts', moment(data[0].ts).tz(timezoneParam).format('h:mmA z'));
        }

        var finalArray = data[0].latest;
        if (data[0].latest.length > 0) {
            finalArray = data[0].latest;
        } else {
            if (data[1] != null) {
                if (data[1].latest.length > 0) {
                    finalArray = data[1].latest;
                } else {
                    $('.main-briefingHome-view .trendingstories-none').attr('banana-status', '1');
                    return;
                }
            } else {
                $('.main-briefingHome-view .trendingstories-none').attr('banana-status', '1');
                return;
            }
        }

        var final_stories_arr = [];
        var final_key_arr = [];
        var final_objid_arr = [];
        var final_arr = [];
        _.filter(finalArray, function (f, i, arr) {
            if (f.headstory.length > 0) {
                var a = final_stories_arr.filter(function (ar) {
                    return ar.tweet_id == f.headstory[0].tweet_id || ar.titleonly == f.headstory[0].titleonly;
                });

                if (a.length <= 0) {
                    final_stories_arr.push(f.headstory[0]);
                    final_key_arr.push(f.hotkeyword);
                    final_objid_arr.push(f.objectid);
                }
            }
        });

        _.filter(final_stories_arr, function (f, i, arr) {
            var a = [];
            a.push(f);
            final_arr.push({
                "objectid": final_objid_arr[i],
                "hotkeywordtext": final_key_arr[i].join(' '),
                "hotkeyword": final_key_arr[i],
                "headstory": a
            });
        });

        var hotStoryArray = [];
        hotStoryArray.array = final_arr;
        
        var ar = LZString.compress(JSON.stringify(final_arr));
        localStorage.setItem('swoosh_hotstories_content', ar);
        
        $('.main-briefingHome-view .trendingstories-headstorieslist').append(mainBriefingHomeHotTags_tp(hotStoryArray));
        if ($('.main-briefingHome-view .trendingstories-headstorieslist').find('div').length <= 0) {
            $('.main-briefingHome-view .trendingstories-none').attr('banana-status', '1');
        }
    })
    .fail(function (data, textStatus) {
        $('.main-briefingHome-view .trendingstoriesUpdatedTs').text('tap to refresh');
        $('.main-briefingHome-view .trendingstories-notice').attr('swoosh-current', 'failed');

        if ($('.main-briefingHome-view .trendingstories-headstorieslist').find('div').length <= 0) {
            $('.main-briefingHome-view .trendingstories-none').attr('banana-status', '1');
        }
    });
}