var moment = require('moment');
var Chartist = require('chartist');
var d3 = require('d3');

$(function () {
    var dailybriefingViewObserver = new MutationObserver(function (mutations) {
        mutations.forEach(function (mutation) {
            if (mutation.addedNodes[0] === null || mutation.addedNodes[0] === undefined) return;
            var objType = mutation.addedNodes[0].className;
            var targetPanelDOM = mutation.addedNodes[0];

            switch (objType) {
            case 'swoosh-dailybriefingView':
                var currentStance_socpol = localStorage.getItem('swoosh_briefingpref_socpol');
                if (currentStance_socpol != undefined) {
                    var currentStancetext = "Unbiased";
                    if (currentStance_socpol == "UNBIASED") {
                        currentStancetext = "Unbiased";
                    } else if (currentStance_socpol == "LIBERAL-0") {
                        currentStancetext = "Liberal bias +0";
                    } else if (currentStance_socpol == "LIBERAL-1") {
                        currentStancetext = "Liberal bias +1";
                    } else if (currentStance_socpol == "LIBERAL-2") {
                        currentStancetext = "Liberal bias +2";
                    } else if (currentStance_socpol == "CONS-0") {
                        currentStancetext = "Cons bias +0";
                    } else if (currentStance_socpol == "CONS-1") {
                        currentStancetext = "Cons bias +1";
                    } else if (currentStance_socpol == "CONS-2") {
                        currentStancetext = "Cons bias +2";
                    }
                    $(targetPanelDOM).find('.briefing-tabitem[swoosh-object-id="1"] > p').text(currentStancetext);
                }

                var sentimentarray = {
                    "pos_normal": [],
                    "pos_high": [],
                    "neutral": [],
                    "neg_normal": [],
                    "neg_high": []
                };
                $(targetPanelDOM).find('.allstories-group div[swoosh-object-type="briefingstory"]').each(function (i, v) {
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
                    $(targetPanelDOM).find('.highPosStatText').text(sentimentarray.pos_high.length + ' highly positive stories');
                } else if (sentimentarray.pos_high.length == 1) {
                    $(targetPanelDOM).find('.highPosStatText').text(sentimentarray.pos_high.length + ' highly positive story');
                } else if (sentimentarray.pos_high.length <= 0) {
                    $(targetPanelDOM).find('.highPosStatText').text('no highly positive story');
                }

                if (sentimentarray.pos_normal.length > 1) {
                    $(targetPanelDOM).find('.normalPosStatText').text(sentimentarray.pos_normal.length + ' positive stories');
                } else if (sentimentarray.pos_normal.length == 1) {
                    $(targetPanelDOM).find('.normalPosStatText').text(sentimentarray.pos_normal.length + ' positive story');
                } else if (sentimentarray.pos_normal.length <= 0) {
                    $(targetPanelDOM).find('.normalPosStatText').text('no positive story');
                }

                if (sentimentarray.neg_normal.length > 1) {
                    $(targetPanelDOM).find('.normalNegStatText').text(sentimentarray.neg_normal.length + ' negative stories');
                } else if (sentimentarray.neg_normal.length == 1) {
                    $(targetPanelDOM).find('.normalNegStatText').text(sentimentarray.neg_normal.length + ' negative story');
                } else if (sentimentarray.neg_normal.length <= 0) {
                    $(targetPanelDOM).find('.normalNegStatText').text('no negative story');
                }

                if (sentimentarray.neg_high.length > 1) {
                    $(targetPanelDOM).find('.highNegStatText').text(sentimentarray.neg_high.length + ' highly negative stories');
                } else if (sentimentarray.neg_high.length == 1) {
                    $(targetPanelDOM).find('.highNegStatText').text(sentimentarray.neg_high.length + ' highly negative story');
                } else if (sentimentarray.neg_high.length <= 0) {
                    $(targetPanelDOM).find('.highNegStatText').text('no highly negative story');
                }

                var sentimentMax = d3.max(sentimentCount);
                var scaleCalc = d3.scaleLinear().domain([0, sentimentMax]).range([0, 100]);

                var sentimentScale = [];
                sentimentCount.filter(function (p, e) {
                    sentimentScale.push(scaleCalc(sentimentCount[e]));
                });

                if (sentimentScale[0] <= 0) {
                    $(targetPanelDOM).find('.highPosStat .stat-bar').css('display', 'none');
                } else {
                    $(targetPanelDOM).find('.highPosStat .stat-bar').css('display', 'block');
                }

                if (sentimentScale[1] <= 0) {
                    $(targetPanelDOM).find('.normalPosStat .stat-bar').css('display', 'none');
                } else {
                    $(targetPanelDOM).find('.normalPosStat .stat-bar').css('display', 'block');
                }

                if (sentimentScale[2] <= 0) {
                    $(targetPanelDOM).find('.normalNegStat .stat-bar').css('display', 'none');
                } else {
                    $(targetPanelDOM).find('.normalNegStat .stat-bar').css('display', 'block');
                }

                if (sentimentScale[3] <= 0) {
                    $(targetPanelDOM).find('.highNegStat .stat-bar').css('display', 'none');
                } else {
                    $(targetPanelDOM).find('.highNegStat .stat-bar').css('display', 'block');
                }
                
                $(targetPanelDOM).find('.highPosStat .stat-bar').css('width', sentimentScale[0]+'%');
                $(targetPanelDOM).find('.normalPosStat .stat-bar').css('width', sentimentScale[1]+'%');
                $(targetPanelDOM).find('.normalNegStat .stat-bar').css('width', sentimentScale[2]+'%');
                $(targetPanelDOM).find('.highNegStat .stat-bar').css('width', sentimentScale[3]+'%');

                $(targetPanelDOM).find('.dailybriefingTs').text(moment(new Date($(targetPanelDOM).find('.dailybriefingTs').attr('swoosh-data')).toISOString()).tz('America/New_York').format("hh:mm z"));
                $(targetPanelDOM).banana({set: ['activetrans', 'callback'],
                    duration: 400,
                    transform: {data: "0, 0, 0"},
                    callback: function () {
                        if ($('body').height() <= 600) {
                            $(targetPanelDOM).find('.highlighted-story').css('height', $('body').height() * 0.38);
                        } else {
                            $(targetPanelDOM).find('.highlighted-story').css('height', $('body').height() * 0.30);
                        }

                        if ($(targetPanelDOM).find('.highlighted-story').length <= 0 || deviceWide()) {
                            $(targetPanelDOM).find('.allstories-group').attr('swoosh-current', 'opened');
                        }

                        if ($(targetPanelDOM).find('.headstories-group').length <= 0) {
                            $(targetPanelDOM).find('.bfP-storieslist').attr('swoosh-status', 'noheadstories');
                            if (deviceWide()) {
                                $(targetPanelDOM).find('.sentiment-group').insertBefore($(targetPanelDOM).find('.allstories-group .stories-foldarea'));
                                $(targetPanelDOM).find('.head-info-group').remove();
                            }
                        }

                        $(targetPanelDOM).find('.highlighted-story').find('.focusStoryTs').each(function () {
                            $(this).text(moment.unix($(this).attr('swoosh-data')).format("ddd, h:mmA"));
                        });
                        var thisObjectId = $(targetPanelDOM).attr('swoosh-object-id');
                        var targetPanelViewArea = $(targetPanelDOM).find('.briefingContainer-view');
                        $(targetPanelDOM).find('.briefingContainer-view').banana({set: ['1']});
                        $(targetPanelViewArea).on('scroll', function (e) {
                            if ($(this).scrollTop() >= 5) {
                                $(targetPanelDOM).find('.briefingContainer-tabs').attr('swoosh-current', 'scrolled');
                            } else {
                                $(targetPanelDOM).find('.briefingContainer-tabs').attr('swoosh-current', '');
                            }
                        });

                        var thisBriefingDataPeakArray = JSON.parse($(targetPanelDOM).attr('swoosh-object-peakscale'));

                        var thisBriefingDataPeakTsArray = [];
                        thisBriefingDataPeakArray.filter(function (pk, index) {
                            if (pk >= 100) {
                                $(targetPanelDOM).find('.bfP-storieslist').find('li').each(function (i, v) {
                                    if (i == index) {
                                        if (!$(this).parent().parent().hasClass('headstories-group')) $(this).attr('swoosh-object-type', 'peak');
                                        thisBriefingDataPeakTsArray.push($(this).find('.story-time').children('p').text());
                                    }
                                });
                            }
                        });

                        if (thisBriefingDataPeakTsArray.length > 0) {
                            if (thisBriefingDataPeakTsArray.length == 1) {
                                $(targetPanelDOM).find('.bfpPeakTimeTs').text(thisBriefingDataPeakTsArray[0] + ' was the peak');
                            } else {
                                $(targetPanelDOM).find('.bfpPeakTimeTs').text(thisBriefingDataPeakTsArray.join(', ') + ' were the peaks');
                            }
                        }
                    }
                });
                break;
            }
        });    
    });

    var dailybriefingViewObserverConfig = {
        childList: true, 
        characterData: true
    };

    var dailybriefingViewObserverTargetNode = document.querySelector('#swoosh-briefingPanelGroups');
    dailybriefingViewObserver.observe(dailybriefingViewObserverTargetNode, dailybriefingViewObserverConfig);
});