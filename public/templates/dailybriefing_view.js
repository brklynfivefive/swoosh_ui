var Handlebars = require("handlebars");module.exports = Handlebars.template({"1":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, helper, options, buffer = "";

  stack1 = ((helper = (helper = helpers.array || (depth0 != null ? depth0.array : depth0)) != null ? helper : helpers.helperMissing),(options={"name":"array","hash":{},"fn":container.program(2, data, 0, blockParams, depths),"inverse":container.noop,"data":data}),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),options) : helper));
  if (!helpers.array) { stack1 = helpers.blockHelperMissing.call(depth0,stack1,options)}
  if (stack1 != null) { buffer += stack1; }
  return buffer;
},"2":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {});

  return "<div class=\"bfP-view\" swoosh-object-id=\""
    + container.escapeExpression(((helper = (helper = helpers.tabcount || (depth0 != null ? depth0.tabcount : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(alias1,{"name":"tabcount","hash":{},"data":data}) : helper)))
    + "\" banana-status=\"1\">\n    <div class=\"bfP-storieslist\" swoosh-current=\"\">\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.focusstories : depth0),{"name":"if","hash":{},"fn":container.program(3, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\n        <div class=\"head-info-group\">\n            <div class=\"sentiment-group\">\n                <p class=\"textSize4 textWeightBold sentimentTitle\">sentiment analysis</p>\n                <div class=\"sentiment-data\">\n                    <div class=\"highPosStat\" swoosh-object-data=\"highpos\">\n                        <p class=\"textSize6 textWeightMid highPosStatText\">73 highly positive articles</p>\n                        <div class=\"stat-bar\" swoosh-object-data=\"90\"></div>\n                    </div>\n                    <div class=\"normalPosStat\" swoosh-object-data=\"normalpos\">\n                        <p class=\"textSize6 textWeightMid normalPosStatText\">23 positive articles</p>\n                        <div class=\"stat-bar\" swoosh-object-data=\"30\"></div>\n                    </div>\n                    <div class=\"normalNegStat\" swoosh-object-data=\"normalneg\">\n                        <p class=\"textSize6 textWeightMid normalNegStatText\">20 negative articles</p>\n                        <div class=\"stat-bar\" swoosh-object-data=\"10\"></div>\n                    </div>\n                    <div class=\"highNegStat\" swoosh-object-data=\"highneg\">\n                        <p class=\"textSize6 textWeightMid highNegStatText\">23 quite negative articles</p>\n                        <div class=\"stat-bar\" swoosh-object-data=\"20\"></div>\n                    </div>\n                </div>\n            </div>\n\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.headstories : depth0),{"name":"if","hash":{},"fn":container.program(23, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "        </div>\n\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.stories : depth0),{"name":"if","hash":{},"fn":container.program(36, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "    </div>\n</div>\n";
},"3":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {});

  return "        <div class=\"focusstories-group\">\n"
    + ((stack1 = (helpers.ifCond || (depth0 && depth0.ifCond) || helpers.helperMissing).call(alias1,(depth0 != null ? depth0.focusstoriesCount : depth0),"==","1",{"name":"ifCond","hash":{},"fn":container.program(4, data, 0, blockParams, depths),"inverse":container.program(6, data, 0, blockParams, depths),"data":data})) != null ? stack1 : "")
    + "            <ul>\n"
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.focusstories : depth0),{"name":"each","hash":{},"fn":container.program(8, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "            </ul>\n        </div>\n";
},"4":function(container,depth0,helpers,partials,data) {
    var helper;

  return "                <p class=\"textSize4 textWeightBold highlightstoriesTitle\">"
    + container.escapeExpression(((helper = (helper = helpers.focusstoriesCount || (depth0 != null ? depth0.focusstoriesCount : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"focusstoriesCount","hash":{},"data":data}) : helper)))
    + " focus story</p>\n";
},"6":function(container,depth0,helpers,partials,data) {
    var helper;

  return "                <p class=\"textSize4 textWeightBold highlightstoriesTitle\">"
    + container.escapeExpression(((helper = (helper = helpers.focusstoriesCount || (depth0 != null ? depth0.focusstoriesCount : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"focusstoriesCount","hash":{},"data":data}) : helper)))
    + " focus stories</p>\n";
},"8":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.url : depth0),{"name":"if","hash":{},"fn":container.program(9, data, 0, blockParams, depths),"inverse":container.program(11, data, 0, blockParams, depths),"data":data})) != null ? stack1 : "")
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.original_image : depth0),{"name":"if","hash":{},"fn":container.program(13, data, 0, blockParams, depths),"inverse":container.program(18, data, 0, blockParams, depths),"data":data})) != null ? stack1 : "")
    + "                            \n                            <div class=\"story-source\">\n                                <p class=\"textSize1 textWeightMid\">"
    + alias4(((helper = (helper = helpers.target || (depth0 != null ? depth0.target : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"target","hash":{},"data":data}) : helper)))
    + ", <span class=\"textWeightMid focusStoryTs\" swoosh-data=\""
    + alias4(((helper = (helper = helpers.ts || (depth0 != null ? depth0.ts : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"ts","hash":{},"data":data}) : helper)))
    + "\"></span></p>\n                            </div>\n                            <div class=\"story-action-share\">\n                                <div class=\"actionicon\"><div class=\"obj\"></div></div>\n                            </div>\n                        </div>\n                    </div>\n";
},"9":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "                    <div class=\"highlighted-story\" swoosh-object-id=\""
    + alias4(((helper = (helper = helpers.tweet_id || (depth0 != null ? depth0.tweet_id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"tweet_id","hash":{},"data":data}) : helper)))
    + "\" swoosh-current=\"\" swoosh-object-type=\"briefingstory\" swoosh-object-link=\""
    + alias4(((helper = (helper = helpers.url || (depth0 != null ? depth0.url : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"url","hash":{},"data":data}) : helper)))
    + "\" swoosh-object-sentiment=\""
    + alias4(container.lambda(((stack1 = (depth0 != null ? depth0.sentiment : depth0)) != null ? stack1.score : stack1), depth0))
    + "\" swoosh-object-section=\""
    + alias4(((helper = (helper = helpers.section || (depth0 != null ? depth0.section : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"section","hash":{},"data":data}) : helper)))
    + "\" banana-status=\"1\" swoosh-object-array='"
    + alias4((helpers.toJSON || (depth0 && depth0.toJSON) || alias2).call(alias1,depths[1],{"name":"toJSON","hash":{},"data":data}))
    + "'>\n";
},"11":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "                    <div class=\"highlighted-story\" swoosh-object-id=\""
    + alias4(((helper = (helper = helpers.tweet_id || (depth0 != null ? depth0.tweet_id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"tweet_id","hash":{},"data":data}) : helper)))
    + "\" swoosh-current=\"\" swoosh-object-type=\"briefingstory\" swoosh-object-link=\"none\" swoosh-object-sentiment=\""
    + alias4(container.lambda(((stack1 = (depth0 != null ? depth0.sentiment : depth0)) != null ? stack1.score : stack1), depth0))
    + "\" swoosh-object-section=\""
    + alias4(((helper = (helper = helpers.section || (depth0 != null ? depth0.section : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"section","hash":{},"data":data}) : helper)))
    + "\" banana-status=\"1\" swoosh-object-array='"
    + alias4((helpers.toJSON || (depth0 && depth0.toJSON) || alias2).call(alias1,depths[1],{"name":"toJSON","hash":{},"data":data}))
    + "'>\n";
},"13":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {});

  return "                        <div class=\"story-photo\">\n                            <div class=\"obj\" style=\"background-image: url('"
    + container.escapeExpression(((helper = (helper = helpers.original_image || (depth0 != null ? depth0.original_image : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(alias1,{"name":"original_image","hash":{},"data":data}) : helper)))
    + "');\"></div>\n                        </div>\n                        <div class=\"story-head\" swoosh-object-type=\"photo\">\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.descriptionfocus : depth0),{"name":"if","hash":{},"fn":container.program(14, data, 0),"inverse":container.program(16, data, 0),"data":data})) != null ? stack1 : "");
},"14":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "                            <p class=\"textSize4 textWeightMid storyHeadTitle\" swoosh-object-origin=\""
    + alias4(((helper = (helper = helpers.target || (depth0 != null ? depth0.target : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"target","hash":{},"data":data}) : helper)))
    + "\">"
    + alias4(((helper = (helper = helpers.titleonly || (depth0 != null ? depth0.titleonly : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"titleonly","hash":{},"data":data}) : helper)))
    + "</p>\n                            <p class=\"textSize2 textWeightReg2 storyHeadTitle storyHeadDesc\" swoosh-object-origin=\""
    + alias4(((helper = (helper = helpers.target || (depth0 != null ? depth0.target : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"target","hash":{},"data":data}) : helper)))
    + "\">"
    + alias4(((helper = (helper = helpers.descriptionfocus || (depth0 != null ? depth0.descriptionfocus : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"descriptionfocus","hash":{},"data":data}) : helper)))
    + "</p>\n";
},"16":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "                            <p class=\"textSize4 textWeightMid storyHeadTitle\" swoosh-object-origin=\""
    + alias4(((helper = (helper = helpers.target || (depth0 != null ? depth0.target : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"target","hash":{},"data":data}) : helper)))
    + "\">"
    + alias4(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"title","hash":{},"data":data}) : helper)))
    + "</p>\n";
},"18":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers["if"].call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.photo : depth0),{"name":"if","hash":{},"fn":container.program(19, data, 0),"inverse":container.program(21, data, 0),"data":data})) != null ? stack1 : "");
},"19":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {});

  return "                        <div class=\"story-photo\">\n                            <div class=\"obj\" style=\"background-image: url('"
    + container.escapeExpression(((helper = (helper = helpers.photo || (depth0 != null ? depth0.photo : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(alias1,{"name":"photo","hash":{},"data":data}) : helper)))
    + "');\"></div>\n                        </div>\n                        <div class=\"story-head\" swoosh-object-type=\"photo\">\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.descriptionfocus : depth0),{"name":"if","hash":{},"fn":container.program(14, data, 0),"inverse":container.program(16, data, 0),"data":data})) != null ? stack1 : "");
},"21":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "                        <div class=\"story-head\">\n"
    + ((stack1 = helpers["if"].call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.descriptionfocus : depth0),{"name":"if","hash":{},"fn":container.program(14, data, 0),"inverse":container.program(16, data, 0),"data":data})) != null ? stack1 : "");
},"23":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {});

  return "            <div class=\"headstories-group\">\n"
    + ((stack1 = (helpers.ifCond || (depth0 && depth0.ifCond) || helpers.helperMissing).call(alias1,(depth0 != null ? depth0.headstoriesCount : depth0),"==","1",{"name":"ifCond","hash":{},"fn":container.program(24, data, 0),"inverse":container.program(26, data, 0),"data":data})) != null ? stack1 : "")
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.keywords : depth0),{"name":"if","hash":{},"fn":container.program(28, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "                <ul>\n"
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.headstories : depth0),{"name":"each","hash":{},"fn":container.program(31, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "                </ul>\n            </div>\n";
},"24":function(container,depth0,helpers,partials,data) {
    var helper;

  return "                    <p class=\"textSize4 textWeightBold headstoriesTitle\">"
    + container.escapeExpression(((helper = (helper = helpers.headstoriesCount || (depth0 != null ? depth0.headstoriesCount : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"headstoriesCount","hash":{},"data":data}) : helper)))
    + " head story</p>\n";
},"26":function(container,depth0,helpers,partials,data) {
    var helper;

  return "                    <p class=\"textSize4 textWeightBold headstoriesTitle\">"
    + container.escapeExpression(((helper = (helper = helpers.headstoriesCount || (depth0 != null ? depth0.headstoriesCount : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"headstoriesCount","hash":{},"data":data}) : helper)))
    + " head stories</p>\n";
},"28":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "                <div class=\"bfP-focuspoints\" swoosh-current=\"\">\n                    <ul>\n"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.keywords : depth0),{"name":"each","hash":{},"fn":container.program(29, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "                    </ul>\n                </div>\n";
},"29":function(container,depth0,helpers,partials,data) {
    return "                        <li banana-tap=\"1\">\n                            <span class=\"textSize3 textWeightMid tagContainer\">"
    + container.escapeExpression(container.lambda(depth0, depth0))
    + "</span>\n                        </li>\n";
},"31":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression;

  return "                    <li swoosh-data=\"\">\n"
    + ((stack1 = helpers["if"].call(depth0 != null ? depth0 : (container.nullContext || {}),((stack1 = (depth0 != null ? depth0.story : depth0)) != null ? stack1.url : stack1),{"name":"if","hash":{},"fn":container.program(32, data, 0),"inverse":container.program(34, data, 0),"data":data})) != null ? stack1 : "")
    + "                            <div class=\"storyContent\">\n                                <p class=\"textSize5 textWeightMid storyHeadTitle\" swoosh-object-origin=\""
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.story : depth0)) != null ? stack1.target : stack1), depth0))
    + "\">"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.story : depth0)) != null ? stack1.titleonly : stack1), depth0))
    + "</p>\n                                <div class=\"story-source\">\n                                    <p class=\"textSize0 textWeightMid\">"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.story : depth0)) != null ? stack1.target : stack1), depth0))
    + "</p>\n                                </div>\n                            </div>\n                            <div class=\"story-action-share\">\n                                <div class=\"actionicon\"><div class=\"obj\"></div></div>\n                            </div>\n                        </div>\n                    </li>\n";
},"32":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression;

  return "                        <div class=\"story-head\" banana-tap=\"1\" swoosh-object-type=\"briefingstory\" swoosh-object-section=\""
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.story : depth0)) != null ? stack1.section : stack1), depth0))
    + "\" swoosh-object-sentiment=\""
    + alias2(alias1(((stack1 = ((stack1 = (depth0 != null ? depth0.story : depth0)) != null ? stack1.sentiment : stack1)) != null ? stack1.score : stack1), depth0))
    + "\" swoosh-object-id=\""
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.story : depth0)) != null ? stack1.tweet_id : stack1), depth0))
    + "\" swoosh-object-link=\""
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.story : depth0)) != null ? stack1.url : stack1), depth0))
    + "\" swoosh-object-array='"
    + alias2((helpers.toJSON || (depth0 && depth0.toJSON) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.story : depth0),{"name":"toJSON","hash":{},"data":data}))
    + "'>\n";
},"34":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression;

  return "                        <div class=\"story-head\" swoosh-object-type=\"briefingstory\" swoosh-object-section=\""
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.story : depth0)) != null ? stack1.section : stack1), depth0))
    + "\" swoosh-object-sentiment=\""
    + alias2(alias1(((stack1 = ((stack1 = (depth0 != null ? depth0.story : depth0)) != null ? stack1.sentiment : stack1)) != null ? stack1.score : stack1), depth0))
    + "\" swoosh-object-id=\""
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.story : depth0)) != null ? stack1.tweet_id : stack1), depth0))
    + "\" swoosh-object-link=\"none\" swoosh-object-array='"
    + alias2((helpers.toJSON || (depth0 && depth0.toJSON) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.story : depth0),{"name":"toJSON","hash":{},"data":data}))
    + "'>\n";
},"36":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {});

  return "        <div class=\"allstories-group\" swoosh-current=\"folded\">\n            <div class=\"stories-foldarea\">\n"
    + ((stack1 = (helpers.ifCond || (depth0 && depth0.ifCond) || helpers.helperMissing).call(alias1,(depth0 != null ? depth0.storiescount : depth0),"==","1",{"name":"ifCond","hash":{},"fn":container.program(37, data, 0, blockParams, depths),"inverse":container.program(39, data, 0, blockParams, depths),"data":data})) != null ? stack1 : "")
    + "                <div class=\"stories-action-toggle\">\n                    <div class=\"actionicon\"><div class=\"obj\"></div></div>\n                </div>\n            </div>\n            <ul>\n"
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.stories : depth0),{"name":"each","hash":{},"fn":container.program(41, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "            </ul>\n        </div>\n";
},"37":function(container,depth0,helpers,partials,data) {
    var helper;

  return "                    <p class=\"textSize4 textWeightBold allstoriesTitle\">all "
    + container.escapeExpression(((helper = (helper = helpers.storiescount || (depth0 != null ? depth0.storiescount : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"storiescount","hash":{},"data":data}) : helper)))
    + " story</p>\n";
},"39":function(container,depth0,helpers,partials,data) {
    var helper;

  return "                    <p class=\"textSize4 textWeightBold allstoriesTitle\">all "
    + container.escapeExpression(((helper = (helper = helpers.storiescount || (depth0 != null ? depth0.storiescount : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"storiescount","hash":{},"data":data}) : helper)))
    + " stories</p>\n";
},"41":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "                <li swoosh-object-count=\""
    + alias4(((helper = (helper = helpers.storiescount || (depth0 != null ? depth0.storiescount : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"storiescount","hash":{},"data":data}) : helper)))
    + "\" swoosh-data=\"\">\n                    <div class=\"storyHeadGroup\">\n                        <div class=\"story-time\">\n                            <p class=\"textSize1 textWeightBold\">"
    + alias4(((helper = (helper = helpers.time || (depth0 != null ? depth0.time : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"time","hash":{},"data":data}) : helper)))
    + "</p>\n                        </div>\n                        \n                        <div class=\"story-action-toggle\" banana-tap=\"1\" swoosh-current=\"closed\">\n                            <div class=\"actionicon\"><div class=\"obj\"></div></div>\n                        </div>\n                        \n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.headstory : depth0),{"name":"if","hash":{},"fn":container.program(42, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "                    </div>\n\n                    <div class=\"story-others\" banana-status=\"0\">\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.storiesGroup : depth0),{"name":"if","hash":{},"fn":container.program(52, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "                    </div>\n                </li>\n";
},"42":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1;

  return ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.headstory : depth0),{"name":"each","hash":{},"fn":container.program(43, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"43":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {});

  return ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.url : depth0),{"name":"if","hash":{},"fn":container.program(44, data, 0, blockParams, depths),"inverse":container.program(46, data, 0, blockParams, depths),"data":data})) != null ? stack1 : "")
    + "                            <div class=\"storyContent\">\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.descriptionfocus : depth0),{"name":"if","hash":{},"fn":container.program(48, data, 0, blockParams, depths),"inverse":container.program(50, data, 0, blockParams, depths),"data":data})) != null ? stack1 : "")
    + "                                <div class=\"story-source\">\n                                    <p class=\"textSize0 textWeightMid\">"
    + container.escapeExpression(((helper = (helper = helpers.target || (depth0 != null ? depth0.target : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(alias1,{"name":"target","hash":{},"data":data}) : helper)))
    + "</p>\n                                </div>\n                            </div>\n                            <div class=\"story-action-share\">\n                                <div class=\"actionicon\"><div class=\"obj\"></div></div>\n                            </div>\n                        </div>\n";
},"44":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "                        <div class=\"story-head\" banana-tap=\"1\" swoosh-object-type=\"briefingstory\" swoosh-object-section=\""
    + alias4(((helper = (helper = helpers.section || (depth0 != null ? depth0.section : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"section","hash":{},"data":data}) : helper)))
    + "\" swoosh-object-sentiment=\""
    + alias4(container.lambda(((stack1 = (depth0 != null ? depth0.sentiment : depth0)) != null ? stack1.score : stack1), depth0))
    + "\" swoosh-object-id=\""
    + alias4(((helper = (helper = helpers.tweet_id || (depth0 != null ? depth0.tweet_id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"tweet_id","hash":{},"data":data}) : helper)))
    + "\" swoosh-object-link=\""
    + alias4(((helper = (helper = helpers.url || (depth0 != null ? depth0.url : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"url","hash":{},"data":data}) : helper)))
    + "\" swoosh-object-array='"
    + alias4((helpers.toJSON || (depth0 && depth0.toJSON) || alias2).call(alias1,depths[1],{"name":"toJSON","hash":{},"data":data}))
    + "'>\n";
},"46":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "                        <div class=\"story-head\" swoosh-object-type=\"briefingstory\" swoosh-object-section=\""
    + alias4(((helper = (helper = helpers.section || (depth0 != null ? depth0.section : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"section","hash":{},"data":data}) : helper)))
    + "\" swoosh-object-sentiment=\""
    + alias4(container.lambda(((stack1 = (depth0 != null ? depth0.sentiment : depth0)) != null ? stack1.score : stack1), depth0))
    + "\" swoosh-object-id=\""
    + alias4(((helper = (helper = helpers.tweet_id || (depth0 != null ? depth0.tweet_id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"tweet_id","hash":{},"data":data}) : helper)))
    + "\" swoosh-object-link=\"none\" swoosh-object-array='"
    + alias4((helpers.toJSON || (depth0 && depth0.toJSON) || alias2).call(alias1,depths[1],{"name":"toJSON","hash":{},"data":data}))
    + "'>\n";
},"48":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "                                <p class=\"textSize5 textWeightMid storyHeadTitle\" swoosh-object-origin=\""
    + alias4(((helper = (helper = helpers.target || (depth0 != null ? depth0.target : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"target","hash":{},"data":data}) : helper)))
    + "\">"
    + alias4(((helper = (helper = helpers.titleonly || (depth0 != null ? depth0.titleonly : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"titleonly","hash":{},"data":data}) : helper)))
    + "</p>\n                                <p class=\"textSize2 textWeightReg2 storyHeadTitle storyHeadDesc\" swoosh-object-origin=\""
    + alias4(((helper = (helper = helpers.target || (depth0 != null ? depth0.target : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"target","hash":{},"data":data}) : helper)))
    + "\">"
    + alias4(((helper = (helper = helpers.descriptionfocus || (depth0 != null ? depth0.descriptionfocus : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"descriptionfocus","hash":{},"data":data}) : helper)))
    + "</p>\n";
},"50":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "                                <p class=\"textSize5 textWeightMid storyHeadTitle\" swoosh-object-origin=\""
    + alias4(((helper = (helper = helpers.target || (depth0 != null ? depth0.target : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"target","hash":{},"data":data}) : helper)))
    + "\">"
    + alias4(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"title","hash":{},"data":data}) : helper)))
    + "</p>\n";
},"52":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1;

  return ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.storiesGroup : depth0),{"name":"each","hash":{},"fn":container.program(53, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"53":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {});

  return ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.url : depth0),{"name":"if","hash":{},"fn":container.program(54, data, 0, blockParams, depths),"inverse":container.program(56, data, 0, blockParams, depths),"data":data})) != null ? stack1 : "")
    + "                            <div class=\"storyContent\">\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.titleonly : depth0),{"name":"if","hash":{},"fn":container.program(58, data, 0, blockParams, depths),"inverse":container.program(60, data, 0, blockParams, depths),"data":data})) != null ? stack1 : "")
    + "                                <div class=\"story-source\">\n                                    <p class=\"textSize0 textWeightMid\">"
    + container.escapeExpression(((helper = (helper = helpers.target || (depth0 != null ? depth0.target : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(alias1,{"name":"target","hash":{},"data":data}) : helper)))
    + "</p>\n                                </div>\n                            </div>\n                            <div class=\"story-action-share\">\n                                <div class=\"actionicon\"><div class=\"obj\"></div></div>\n                            </div>\n                        </div>\n";
},"54":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "                        <div class=\"storyObj\" banana-tap=\"1\" swoosh-object=\"\" swoosh-object-type=\"briefingstory\" swoosh-object-section=\""
    + alias4(((helper = (helper = helpers.section || (depth0 != null ? depth0.section : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"section","hash":{},"data":data}) : helper)))
    + "\" swoosh-object-sentiment=\""
    + alias4(container.lambda(((stack1 = (depth0 != null ? depth0.sentiment : depth0)) != null ? stack1.score : stack1), depth0))
    + "\" swoosh-content-type=\""
    + alias4(((helper = (helper = helpers.mediatype || (depth0 != null ? depth0.mediatype : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"mediatype","hash":{},"data":data}) : helper)))
    + "\" swoosh-object-id=\""
    + alias4(((helper = (helper = helpers.tweet_id || (depth0 != null ? depth0.tweet_id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"tweet_id","hash":{},"data":data}) : helper)))
    + "\" swoosh-object-link=\""
    + alias4(((helper = (helper = helpers.url || (depth0 != null ? depth0.url : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"url","hash":{},"data":data}) : helper)))
    + "\" swoosh-object-array='"
    + alias4((helpers.toJSON || (depth0 && depth0.toJSON) || alias2).call(alias1,depths[1],{"name":"toJSON","hash":{},"data":data}))
    + "'>\n";
},"56":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "                        <div class=\"storyObj\" swoosh-object=\"\" swoosh-object-type=\"briefingstory\" swoosh-object-section=\""
    + alias4(((helper = (helper = helpers.section || (depth0 != null ? depth0.section : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"section","hash":{},"data":data}) : helper)))
    + "\" swoosh-object-sentiment=\""
    + alias4(container.lambda(((stack1 = (depth0 != null ? depth0.sentiment : depth0)) != null ? stack1.score : stack1), depth0))
    + "\" swoosh-content-type=\""
    + alias4(((helper = (helper = helpers.mediatype || (depth0 != null ? depth0.mediatype : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"mediatype","hash":{},"data":data}) : helper)))
    + "\" swoosh-object-id=\""
    + alias4(((helper = (helper = helpers.tweet_id || (depth0 != null ? depth0.tweet_id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"tweet_id","hash":{},"data":data}) : helper)))
    + "\" swoosh-object-link=\"none\" swoosh-object-array='"
    + alias4((helpers.toJSON || (depth0 && depth0.toJSON) || alias2).call(alias1,depths[1],{"name":"toJSON","hash":{},"data":data}))
    + "'>\n";
},"58":function(container,depth0,helpers,partials,data) {
    var helper;

  return "                                <p class=\"textSize3 textWeightReg2 storyHeadTitle\">"
    + container.escapeExpression(((helper = (helper = helpers.titleonly || (depth0 != null ? depth0.titleonly : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"titleonly","hash":{},"data":data}) : helper)))
    + "</p>\n";
},"60":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "                                <p class=\"textSize3 textWeightReg2 storyHeadTitle\" swoosh-object-origin=\""
    + alias4(((helper = (helper = helpers.target || (depth0 != null ? depth0.target : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"target","hash":{},"data":data}) : helper)))
    + "\">"
    + alias4(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"title","hash":{},"data":data}) : helper)))
    + "</p>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1;

  return ((stack1 = helpers["if"].call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.array : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"useData":true,"useDepths":true});