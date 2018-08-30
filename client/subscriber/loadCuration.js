var moment = require('moment');
var tz = require('moment-timezone');

exports.refreshCurationTags = function (mode) {
    $('.main-briefingHome-view .deskbriefingsUpdatedTs').text('Refreshing...');
    $('.main-briefingHome-view .deskbriefings-notice').attr('swoosh-current', 'processing');
    $('.main-briefingHome-view .deskbriefings-group .others').attr('banana-status', '0');
    var type = 'usasociety';
    var curationTagsCurrentType = localStorage.getItem('swoosh_curationtags_type');
    if (curationTagsCurrentType != undefined) {
        type = curationTagsCurrentType;
    }

    var type_humanread = "";
    if (type == 'usasociety') type_humanread = "U.S.";
    if (type == 'usapolitics') type_humanread = "Politics";
    if (type == 'usatechindustry') type_humanread = "Tech";
    if (type == 'western-en-world') type_humanread = "World";
    if (type == 'usabusiness') type_humanread = "Business";
    if (type == 'usafinance') type_humanread = "Finance";
    if (type == 'usasports') type_humanread = "Sports";
    $('.main-briefingHome-view .desk-briefings .type-selection').attr('swoosh-object-data', type);
    $('.main-briefingHome-view .deskbriefings-type-selection').find('ul').scrollTo($('.main-briefingHome-view .deskbriefings-type-selection').find('li[swoosh-object-data="' + $('.main-briefingHome-view .deskbriefings-type-selection').find('ul').attr('swoosh-object-data') + '"]'), 100);

    var api_url = 'https://swoosh.inthenewsrooms.com/discover/briefings/usasociety';
    if (type == 'usasociety') {
        api_url = 'https://swoosh.inthenewsrooms.com/discover/briefings/usasociety';
    } else if (type == 'usapolitics') {
        api_url = 'https://swoosh.inthenewsrooms.com/discover/briefings/usapolitics';
    } else if (type == 'usatechindustry') {
        api_url = 'https://swoosh.inthenewsrooms.com/discover/briefings/usatechindustry';
    } else if (type == 'western-en-world') {
        api_url = 'https://swoosh.inthenewsrooms.com/discover/briefings/western-en-world';
    } else if (type == 'usabusiness') {
        api_url = 'https://swoosh.inthenewsrooms.com/discover/briefings/usabusiness';
    } else if (type == 'usafinance') {
        api_url = 'https://swoosh.inthenewsrooms.com/discover/briefings/usafinance';
    } else if (type == 'usasports') {
        api_url = 'https://swoosh.inthenewsrooms.com/discover/briefings/usasports';
    }

    if (mode == 'typechanged') $('.main-briefingHome-view .deskbriefings-group ul').empty();

    $.ajax({
        type: 'GET',
        url: api_url,
        headers: { 'x-access-token': swooshToken() },
        contentType: "application/json",
        dataType: 'json'
    })
    .done(function (data) {
        $('.main-briefingHome-view .deskbriefingsUpdatedTs').text('');
        $('.main-briefingHome-view .deskbriefings-notice').attr('swoosh-current', 'exist');
        if (data[0] == null) {
            if ($('.main-briefingHome-view .deskbriefings-group ul').find('li').length <= 0) {
                $('.main-briefingHome-view .deskbriefings-none').attr('banana-status', '1');
                $('.main-briefingHome-view .deskfocus-ticker').attr('swoosh-current', 'none');
                $('.main-briefingHome-view .deskbriefings-group .others').attr('banana-status', '0');
            }
            return;
        }

        $('.main-briefingHome-view .deskfocus-ticker').attr('swoosh-current', 'exist');
        $('.main-briefingHome-view .deskbriefings-none').attr('banana-status', '0');
        $('.main-briefingHome-view .deskbriefings-group ul').empty();
        var timezoneParam = 'America/New_York';
        $('.main-briefingHome-view .deskbriefingsUpdatedTs').text(moment.unix(data[0].ts).tz(timezoneParam).format('hA z'));

        var briefingSetArray = [];
        data.filter(function (data, i, arr) {
            var tags = arr[i].tag;
            var S4 = function() {
                return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
            };
            
            var tagObjectId = (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());

            if (arr[i].ts != null) {
                var tsInfo = null;
                var unix = moment().utc().unix();
                var diff = unix*1000 - moment(arr[i].ts).unix()*1000;
                var hoursDifference = diff/1000/60/60;

                var a = moment().utc();
                var b = arr[i].ts;
                tsInfo = b;

                var photosArray = [];

                var photosArray = [];
                arr[i].focusstories.filter(function (st) {
                    if (st.photo != null) {
                        photosArray.push(st.photo);
                    }
                });

                var mainphotoObj = null;
                if (photosArray[0] != null) mainphotoObj = photosArray[0];
                var focuscount = arr[i].focusstoriesCount;
                if (arr[i].focusstoriesCount == 1) focuscount = null;
                var finalArray = {
                    "objectid": arr[i]._id,
                    "curation": "curation",
                    "tag": tags,
                    "ts": tsInfo,
                    "rawTs": arr[i].ts,
                    "mainphoto": mainphotoObj,
                    "stories": arr[i].stories,
                    "keywords": arr[i].keywords,
                    "keywordsCount": arr[i].keywordsCount,
                    "headstories": arr[i].headstories,
                    "storiescount": arr[i].storiescount,
                    "headstoriesCount": arr[i].headstoriesCount,
                    "focusstories": arr[i].focusstories,
                    "focusstoriesCount": focuscount,
                    "peakscale": arr[i].peakscale
                }
                
                briefingSetArray.push(finalArray);
            }
        });
        
        process_deskfocus(briefingSetArray, type_humanread);
        var ar = LZString.compress(JSON.stringify(briefingSetArray));
        //localStorage.setItem('swoosh_curationtags_home', ar);
    })
    .fail(function (data, textStatus) {
        $('.main-briefingHome-view .deskbriefingsUpdatedTs').text('tap to refresh');
        $('.main-briefingHome-view .deskbriefings-notice').attr('swoosh-current', 'failed');
        $('.main-briefingHome-view .deskfocus-ticker').attr('swoosh-current', 'none');
        $(".main-briefingHome-view .deskbriefingsTickerText").text('tap to refresh')

        if ($('.main-briefingHome-view .deskbriefings-group ul').find('li').length <= 0) {
            $('.main-briefingHome-view .deskbriefings-none').attr('banana-status', '1');
        }
    });

    $.ajax({
        type: 'GET',
        url: 'https://swoosh.inthenewsrooms.com/discover/briefings/usasociety',
        headers: { 'x-access-token': swooshToken() },
        contentType: "application/json",
        dataType: 'json'
    })
    .done(function (data) {
        if (data[0] == null) {
            if ($('#swoosh-addBriefingTag-view .addTag-suggestions ul').find('li').length <= 0) {
                $('#swoosh-addBriefingTag-view .addTag-suggestions').attr('banana-status', '0');
            }
            return;
        }

        $('#swoosh-addBriefingTag-view .addTag-suggestions ul').empty();
        $('#swoosh-addBriefingTag-view .addTag-suggestions').attr('banana-status', '1');

        var briefingSetArray = [];
        data.filter(function (data, i, arr) {
            var tags = arr[i].tag;
            var S4 = function() {
                return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
            };
            
            var tagObjectId = (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());

            if (arr[i].ts != null) {
                var tsInfo = null;
                var unix = moment().utc().unix();
                var diff = unix*1000 - moment(arr[i].ts).unix()*1000;
                var hoursDifference = diff/1000/60/60;

                var a = moment().utc();
                var b = arr[i].ts;
                tsInfo = b;

                var photosArray = [];

                var photosArray = [];
                arr[i].focusstories.filter(function (st) {
                    if (st.photo != null) {
                        photosArray.push(st.photo);
                    }
                });

                var mainphotoObj = null;
                if (photosArray[0] != null) mainphotoObj = photosArray[0];
                var finalArray = {
                    "objectid": tagObjectId,
                    "curation": "curation",
                    "tag": tags,
                    "ts": tsInfo,
                    "rawTs": arr[i].ts,
                    "mainphoto": mainphotoObj,
                    "stories": arr[i].stories,
                    "keywords": arr[i].keywords,
                    "keywordsCount": arr[i].keywordsCount,
                    "headstories": arr[i].headstories,
                    "storiescount": arr[i].storiescount,
                    "headstoriesCount": arr[i].headstoriesCount,
                    "focusstories": arr[i].focusstories,
                    "focusstoriesCount": arr[i].focusstoriesCount,
                    "peakscale": arr[i].peakscale
                }
                
                briefingSetArray.push(finalArray);
                var briefingTagArray = {
                    "array": finalArray
                };
                $('#swoosh-addBriefingTag-view .addTag-suggestions ul').append(addTagSuggestions_tp(briefingTagArray)); 
            }
        });
    })
    .fail(function (data, textStatus) {
        if ($('#swoosh-addBriefingTag-view .addTag-suggestions ul').find('li').length <= 0) {
            $('#swoosh-addBriefingTag-view .addTag-suggestions').attr('banana-status', '0');
        }
    });
}

function process_deskfocus (briefingSetArray, type_humanread) {
    briefingSetArray.sort(function(a, b) {
        return b.storiescount - a.storiescount;
    });
    var briefingSetArrayTop = _.chunk(briefingSetArray, 10); 
    var briefingCurationTagsArray = [];
    briefingSetArrayTop.filter(function (bf, i) {
        var briefingTagArray = {
            "array": bf
        };
        
        if (i == 0) { 
            bf.filter(function (i) {
                briefingCurationTagsArray.push(i.tag);
            });
            
            $('.main-briefingHome-view .deskbriefings-group .top ul').append(mainManageTagsAutoBriefingsTop_tp(briefingTagArray)); 
        } else {
            $('.main-briefingHome-view .deskbriefings-group .others ul').append(mainManageTagsAutoBriefings_tp(briefingTagArray)); 
        }
    });

    if ($('.main-briefingHome-view .deskbriefings-group .others').find('li').length <= 0) {
        $('.main-briefingHome-view .deskbriefings-group .others').attr('banana-status', '0');
    } else {
        $('.main-briefingHome-view .deskbriefings-group .others').attr('banana-status', '1');
    }

    if (briefingSetArrayTop.length > 0) {
        $('.main-briefingHome-view .deskbriefings-group .top li').each(function (i) {
            if (i+1 == 1) {
                $('.main-briefingHome-view .deskbriefingsStatText').text(i+1 + ' Desk focus in ' + type_humanread);
            } else {
                $('.main-briefingHome-view .deskbriefingsStatText').text(i+1 + ' Desk focuses in ' + type_humanread);
            }
        });
    } else {
        $('.main-briefingHome-view .deskbriefingsStatText').text('No Desk Focus in ' + type_humanread);
    }
}