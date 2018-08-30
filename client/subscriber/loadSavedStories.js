exports.refreshSavedStories = function (mode) {
    $.ajax({
        type: 'GET',
        url: 'https://swoosh.inthenewsrooms.com/subscribers/saved/',
        headers: { 'x-access-token': swooshToken() },
        contentType: "application/json",
        dataType: 'json'
    })
    .done(function (data) {
        if (data.length <= 0) {
            if ($('.main-readLater-view .list-group').find('li').length <= 0) {
                $('.main-readLater-view .readLater-none').attr('banana-status', '1');
            }
            return;
        }

        var ndata = data.map(function (d) {
            d.tags = null;
            d.ngram = null;
            d.chainedtags = null;
            return d;
        });
        var thisSavedStoriesArray = [];
        thisSavedStoriesArray.array = ndata;
        
        $('.main-readLater-view .list-group').empty();
        $('.main-readLater-view .list-group').append(mainReadLaterStory_tp(thisSavedStoriesArray));
        $('.main-readLater-view .readLater-none').attr('banana-status', '0');
    })
    .fail(function (data, textStatus) {
        if ($('.main-readLater-view .list-group').find('li').length <= 0) {
            $('.main-readLater-view .readLater-none').attr('banana-status', '1');
        }
        
        if (data.responseText) {
            var res = $.parseJSON(data.responseText);
            var errMsg = res.error.message;
        }
    });
}

