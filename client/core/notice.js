exports.loadNotice = function () {
    $.ajax({
		type: 'GET',
		url: 'https://swoosh.inthenewsrooms.com/interact/notice',
		headers: { 'x-access-token': swooshToken() },
		contentType: "application/json",
		dataType: 'json'
	})
	.done(function (data) {
        if (data) {
            if (data.length > 0) {
                if (localStorage.getItem('swoosh_notice_latestid') != undefined) {
                    if (localStorage.getItem('swoosh_notice_latestid') != data[0].noticeid) {
                        localStorage.setItem('swoosh_notice_latestid', data[0].noticeid);
                        $('.main-noticeticker-bar').find('.noticetickerText').text(data[0].title);
                        $('.main-noticeticker-bar').attr('banana-status', '1');
                    }
                } else {
                    localStorage.setItem('swoosh_notice_latestid', data[0].noticeid);
                    $('.main-noticeticker-bar').find('.noticetickerText').text(data[0].title);
                    $('.main-noticeticker-bar').attr('banana-status', '1');
                }

                var dataparsed = data.filter(function (it) {
                    it.content = it.content.split('%^break%^');
                    return it;
                });

                var noticearray = [];
                noticearray.array = data;
                $('#swoosh-notice-view').find('.notice-viewArea ul').empty();
                $('#swoosh-notice-view').find('.notice-viewArea ul').append(popover_noticeitem_tp(noticearray));
            } else {
                $('#swoosh-notice-view').find('.notice-viewArea ul').empty();
            }
        }
	})
	.fail(function (data, textStatus) {
		if (data.responseText) {
			var res = $.parseJSON(data.responseText);
			var errMsg = res.error.message;
			
			if (errMsg == "NO_SUBSCRIBERS" || errMsg == "INVALID_SUBSCRIBER_CREDENTIAL" || errMsg.indexOf('FAILED_AUTH') != -1) {
				sessionExpired();
			}
		}
	});
}

exports.checkBuildUpdate = function () {
    $.ajax({
		type: 'GET',
		url: 'https://swoosh.inthenewsrooms.com/clientmng/build',
		headers: { 'x-access-token': swooshToken() },
		contentType: "application/json",
		dataType: 'json'
	})
	.done(function (data) {
        if (data) {
            if (data.latestStableBuildMajor != getBuildMajorNumbering()) {
                errorHandler("New update available", "Please update #Newsrooms to the latest version to enjoy the cool new features and better performance/stability.");
            }
        }
	})
	.fail(function (data, textStatus) {
		if (data.responseText) {
			var res = $.parseJSON(data.responseText);
			var errMsg = res.error.message;
			
			if (errMsg == "NO_SUBSCRIBERS" || errMsg == "INVALID_SUBSCRIBER_CREDENTIAL" || errMsg.indexOf('FAILED_AUTH') != -1) {
				sessionExpired();
			}
		}
	});
}