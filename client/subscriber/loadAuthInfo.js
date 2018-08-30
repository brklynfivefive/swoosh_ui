exports.swooshToken = function () {
	var retrieved = localStorage.getItem("swoosh_token");
	return retrieved;
}

exports.swooshSid = function () {
	var retrieved = localStorage.getItem("swoosh_sid");
	return retrieved;
}

exports.swooshUserInfoUpdate = function () {
	if (localStorage.getItem('swoosh_sname') != undefined && localStorage.getItem('swoosh_sname') != "") {
		$('.main-briefingHome-view').find('.homeSubscriberUsername').text(localStorage.getItem('swoosh_sname') + ',');
	} else {
		$('.main-briefingHome-view').find('.homeSubscriberUsername').text('Hi,');
	}

	$.ajax({
		type: 'GET',
		url: 'https://swoosh.inthenewsrooms.com/subscribers/',
		headers: { 'x-access-token': swooshToken() },
		contentType: "application/json",
		dataType: 'json'
	})
	.done(function (data) {
		localStorage.setItem('swoosh_semail', data.email);
		if (data.username) {
			localStorage.setItem('swoosh_sname', data.username);
			$('.main-briefingHome-view').find('.homeSubscriberUsername').text(data.username + ', ');
		} else {
			$('.main-briefingHome-view').find('.homeSubscriberUsername').text('Hi,');
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