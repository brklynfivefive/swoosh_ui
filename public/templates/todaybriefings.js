var Handlebars = require("handlebars");module.exports = Handlebars.template({"1":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1;

  return ((stack1 = helpers["if"].call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.focusstories : depth0),{"name":"if","hash":{},"fn":container.program(2, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"2":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1;

  return ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.focusstories : depth0),{"name":"each","hash":{},"fn":container.program(3, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "</div>\n";
},"3":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.escapeExpression, alias3=helpers.helperMissing, alias4="function";

  return ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.url : depth0),{"name":"if","hash":{},"fn":container.program(4, data, 0, blockParams, depths),"inverse":container.program(6, data, 0, blockParams, depths),"data":data})) != null ? stack1 : "")
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.original_image : depth0),{"name":"if","hash":{},"fn":container.program(8, data, 0, blockParams, depths),"inverse":container.program(13, data, 0, blockParams, depths),"data":data})) != null ? stack1 : "")
    + "        \n        <div class=\"story-source\">\n            <p class=\"textSize1 textWeightBold\">About "
    + alias2(container.lambda((depths[1] != null ? depths[1].tag : depths[1]), depth0))
    + " from "
    + alias2(((helper = (helper = helpers.target || (depth0 != null ? depth0.target : depth0)) != null ? helper : alias3),(typeof helper === alias4 ? helper.call(alias1,{"name":"target","hash":{},"data":data}) : helper)))
    + "</p>\n            <p class=\"textSize1 textWeightMid focusStoryTs\" swoosh-data=\""
    + alias2(((helper = (helper = helpers.ts || (depth0 != null ? depth0.ts : depth0)) != null ? helper : alias3),(typeof helper === alias4 ? helper.call(alias1,{"name":"ts","hash":{},"data":data}) : helper)))
    + "\"></p>\n        </div>\n        <div class=\"story-action-share\">\n            <div class=\"actionicon\"><div class=\"obj\"></div></div>\n        </div>\n    </div>\n</div>\n";
},"4":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<div class=\"today-story\" swoosh-object-id=\""
    + alias4(((helper = (helper = helpers.tweet_id || (depth0 != null ? depth0.tweet_id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"tweet_id","hash":{},"data":data}) : helper)))
    + "\" swoosh-current=\"hidden\" swoosh-object-type=\"briefingstory\" swoosh-object-link=\""
    + alias4(((helper = (helper = helpers.url || (depth0 != null ? depth0.url : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"url","hash":{},"data":data}) : helper)))
    + "\" banana-status=\"1\">\n";
},"6":function(container,depth0,helpers,partials,data) {
    var helper;

  return "<div class=\"today-story\" swoosh-object-id=\""
    + container.escapeExpression(((helper = (helper = helpers.tweet_id || (depth0 != null ? depth0.tweet_id : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"tweet_id","hash":{},"data":data}) : helper)))
    + "\" swoosh-current=\"hidden\" swoosh-object-type=\"briefingstory\" swoosh-object-link=\"none\" banana-status=\"1\">\n";
},"8":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {});

  return "    <div class=\"story-photo\">\n        <div class=\"obj\" style=\"background-image: linear-gradient(to top, rgba(0,0,0,0.9) 0%,rgba(0,0,0,0.1) 90%), url('"
    + container.escapeExpression(((helper = (helper = helpers.original_image || (depth0 != null ? depth0.original_image : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(alias1,{"name":"original_image","hash":{},"data":data}) : helper)))
    + "');\"></div>\n    </div>\n    <div class=\"story-head\" swoosh-object-type=\"photo\">\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.titleonly : depth0),{"name":"if","hash":{},"fn":container.program(9, data, 0),"inverse":container.program(11, data, 0),"data":data})) != null ? stack1 : "");
},"9":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "        <p class=\"textSize7 textWeightBold storyHeadTitle\" swoosh-object-origin=\""
    + alias4(((helper = (helper = helpers.target || (depth0 != null ? depth0.target : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"target","hash":{},"data":data}) : helper)))
    + "\">"
    + alias4(((helper = (helper = helpers.titleonly || (depth0 != null ? depth0.titleonly : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"titleonly","hash":{},"data":data}) : helper)))
    + "</p>\n        <p class=\"textSize2 textWeightReg2 storyHeadTitle\" swoosh-object-origin=\""
    + alias4(((helper = (helper = helpers.target || (depth0 != null ? depth0.target : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"target","hash":{},"data":data}) : helper)))
    + "\">"
    + alias4(((helper = (helper = helpers.descriptionfocus || (depth0 != null ? depth0.descriptionfocus : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"descriptionfocus","hash":{},"data":data}) : helper)))
    + "</p>\n";
},"11":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "        <p class=\"textSize7 textWeightBold storyHeadTitle\" swoosh-object-origin=\""
    + alias4(((helper = (helper = helpers.target || (depth0 != null ? depth0.target : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"target","hash":{},"data":data}) : helper)))
    + "\">"
    + alias4(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"title","hash":{},"data":data}) : helper)))
    + "</p>\n";
},"13":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers["if"].call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.photo : depth0),{"name":"if","hash":{},"fn":container.program(14, data, 0),"inverse":container.program(16, data, 0),"data":data})) != null ? stack1 : "");
},"14":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {});

  return "    <div class=\"story-photo\">\n        <div class=\"obj\" style=\"background-image: linear-gradient(to top, rgba(0,0,0,0.9) 0%,rgba(0,0,0,0.1) 90%), url('"
    + container.escapeExpression(((helper = (helper = helpers.photo || (depth0 != null ? depth0.photo : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(alias1,{"name":"photo","hash":{},"data":data}) : helper)))
    + "');\"></div>\n    </div>\n    <div class=\"story-head\" swoosh-object-type=\"photo\">\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.titleonly : depth0),{"name":"if","hash":{},"fn":container.program(9, data, 0),"inverse":container.program(11, data, 0),"data":data})) != null ? stack1 : "");
},"16":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "    <div class=\"story-head\">\n"
    + ((stack1 = helpers["if"].call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.titleonly : depth0),{"name":"if","hash":{},"fn":container.program(17, data, 0),"inverse":container.program(19, data, 0),"data":data})) != null ? stack1 : "");
},"17":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "        <p class=\"textSize9 textWeightBold storyHeadTitle\" swoosh-object-origin=\""
    + alias4(((helper = (helper = helpers.target || (depth0 != null ? depth0.target : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"target","hash":{},"data":data}) : helper)))
    + "\">"
    + alias4(((helper = (helper = helpers.titleonly || (depth0 != null ? depth0.titleonly : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"titleonly","hash":{},"data":data}) : helper)))
    + "</p>\n        <p class=\"textSize2 textWeightReg2 storyHeadTitle\" swoosh-object-origin=\""
    + alias4(((helper = (helper = helpers.target || (depth0 != null ? depth0.target : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"target","hash":{},"data":data}) : helper)))
    + "\">"
    + alias4(((helper = (helper = helpers.descriptionfocus || (depth0 != null ? depth0.descriptionfocus : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"descriptionfocus","hash":{},"data":data}) : helper)))
    + "</p>\n";
},"19":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "        <p class=\"textSize9 textWeightBold storyHeadTitle\" swoosh-object-origin=\""
    + alias4(((helper = (helper = helpers.target || (depth0 != null ? depth0.target : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"target","hash":{},"data":data}) : helper)))
    + "\">"
    + alias4(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"title","hash":{},"data":data}) : helper)))
    + "</p>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, helper, options, buffer = 
  "<div class=\"today-top\"></div>\n";
  stack1 = ((helper = (helper = helpers.array || (depth0 != null ? depth0.array : depth0)) != null ? helper : helpers.helperMissing),(options={"name":"array","hash":{},"fn":container.program(1, data, 0, blockParams, depths),"inverse":container.noop,"data":data}),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),options) : helper));
  if (!helpers.array) { stack1 = helpers.blockHelperMissing.call(depth0,stack1,options)}
  if (stack1 != null) { buffer += stack1; }
  return buffer + "<div class=\"today-end\" banana-tap=\"1\">\n    <p class=\"textSize4 textWeightBold\">That's all!</p>\n    <p class=\"textSize4 textWeightBold\">You can always read all key stories in your briefing inbox</p>\n    <div class=\"today-action-jumpinbox\" banana-tap=\"1\">\n        <div class=\"actionicon\"><div class=\"obj\"></div></div>\n    </div>\n</div>";
},"useData":true,"useDepths":true});