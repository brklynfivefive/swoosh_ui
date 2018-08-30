exports.deviceTypeAndroid = function () {
    var ua = navigator.userAgent.toLowerCase();
	return ua.indexOf("nsr/1.0") > -1 && localStorage.getItem('swoosh_c_type') != undefined;
}

exports.deviceTypeiOS = function () {
    return /(iPhone|iPod|iPad).*AppleWebKit(?!.*Version)/i.test(navigator.userAgent) && !window.MSStream && localStorage.getItem('swoosh_c_type') != undefined;
}

exports.deviceWide = function () {
    return $('body').attr('swoosh-screen-type') == 'wide';
}