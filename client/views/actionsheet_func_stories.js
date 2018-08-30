var savedStoriesRoutes = require('../subscriber/loadSavedStories');

var addto_savedstories = exports.addto_savedstories = function (item) {
    var APIpostData = JSON.stringify({
        "story": item
    });
    
    $.ajax({
        type: 'POST',
        url: 'https://swoosh.inthenewsrooms.com/subscribers/saved/',
        data: APIpostData,
        contentType: "application/json",
        headers: { 'x-access-token': swooshToken() },
        dataType: 'json',
        timeout: 20000
    })
    .done(function (data) {
        var thisSavedStoriesArray = [];
        thisSavedStoriesArray.array = data.contents;
        $('.main-readLater-view').find('.list-group').append(mainReadLaterStory_tp(thisSavedStoriesArray));
        $('.main-readLater-view').attr('swoosh-current', '');
        
        savedStoriesRoutes.refreshSavedStories();
        $('.main-updatenotice-bar .updateNoticeText').text('Successfully added to your list');
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
        if (data.responseText) {
            var res = $.parseJSON(data.responseText);
            var errMsg = res.error.message;
            
            if (errMsg == "NO_SUBSCRIBERS" || errMsg == "INVALID_SUBSCRIBER_CREDENTIAL" || errMsg.indexOf('FAILED_AUTH') != -1) {
                sessionExpired();
            } else {
                errorHandler("Unable to save the story", "It seems like there might be a network problem. Please check your wireless connection and try again.");
            }
        } else {
            errorHandler("Unable to save the story", "It seems like there might be a network problem. Please check your wireless connection and try again.");
        }
    });
}

exports.action_latesttrendingstory = function (type, id) {
    if (type == 'saveforlater') {
        addto_savedstories(JSON.parse(id));
    } else if (type == 'sharestory') {
        if (id != "" && id != undefined && id != "none") {
            if (deviceTypeAndroid()) {
                window.androidsfo.sharelink(id);
            } else if (deviceTypeiOS()) {
                appbridge({"share_link": id});
            }

            if (!deviceTypeAndroid() && !deviceTypeiOS()) window.open('https://www.facebook.com/sharer/sharer.php?u=' + id, '_blank');
        }
    }
}

exports.action_briefingstory = function (type, id) {
    if (type == 'saveforlater') {
        addto_savedstories(JSON.parse(id));
    } else if (type == 'sharestory') {
        if (id != "" && id != undefined && id != "none") {
            if (deviceTypeAndroid()) {
                window.androidsfo.sharelink(id);
            } else if (deviceTypeiOS()) {
                appbridge({"share_link": id});
            }

            if (!deviceTypeAndroid() && !deviceTypeiOS()) window.open('https://www.facebook.com/sharer/sharer.php?u=' + id, '_blank');
        }
    }
}

exports.action_deskbriefingstory = function (type, id) {
    if (type == 'saveforlater') {
        addto_savedstories(JSON.parse(id));
    } else if (type == 'sharestory') {
        if (id != "" && id != undefined && id != "none") {
            if (deviceTypeAndroid()) {
                window.androidsfo.sharelink(id);
            } else if (deviceTypeiOS()) {
                appbridge({"share_link": id});
            }

            if (!deviceTypeAndroid() && !deviceTypeiOS()) window.open('https://www.facebook.com/sharer/sharer.php?u=' + id, '_blank');
        }
    }
}

exports.action_savedstoriesstory = function (type, id) {
    if (type == 'removefromsavedstories') {
        var APIpostData = JSON.stringify({
            "storyid": id
        });
        
        $.ajax({
            type: 'POST',
            url: 'https://swoosh.inthenewsrooms.com/subscribers/saved/delete/',
            data: APIpostData,
            contentType: "application/json",
            headers: { 'x-access-token': swooshToken() },
            dataType: 'json'
        })
        .done(function (data) {
            $('.main-readLater-view').find('.list-group').find('li[swoosh-object-id=' + id + ']').remove();
            savedStoriesRoutes.refreshSavedStories();
            
            $('.main-updatenotice-bar .updateNoticeText').text('Successfully removed from your list');
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
            if (data.responseText) {
                var res = $.parseJSON(data.responseText);
                var errMsg = res.error.message;
                
                if (errMsg == "NO_SUBSCRIBERS" || errMsg == "INVALID_SUBSCRIBER_CREDENTIAL" || errMsg.indexOf('FAILED_AUTH') != -1) {
                    sessionExpired();
                } else {
                    errorHandler("Unable to save the story", "It seems like there might be a network problem. Please check your wireless connection and try again.");
                }
            } else {
                errorHandler("Unable to save the story", "It seems like there might be a network problem. Please check your wireless connection and try again.");
            }
        });
    } else if (type == 'sharestory') {
        if (id != "" && id != undefined && id != "none") {
            if (deviceTypeAndroid()) {
                window.androidsfo.sharelink(id);
            } else if (deviceTypeiOS()) {
                appbridge({"share_link": id});
            }

            if (!deviceTypeAndroid() && !deviceTypeiOS()) window.open('https://www.facebook.com/sharer/sharer.php?u=' + id, '_blank');
        }
    }
}