var Handlebars = require("handlebars");module.exports = Handlebars.template({"1":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, helper, options, buffer = "";

  stack1 = ((helper = (helper = helpers.array || (depth0 != null ? depth0.array : depth0)) != null ? helper : helpers.helperMissing),(options={"name":"array","hash":{},"fn":container.program(2, data, 0, blockParams, depths),"inverse":container.noop,"data":data}),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),options) : helper));
  if (!helpers.array) { stack1 = helpers.blockHelperMissing.call(depth0,stack1,options)}
  if (stack1 != null) { buffer += stack1; }
  return buffer;
},"2":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<div class=\"swoosh-briefingPanel\" swoosh-object-id=\""
    + alias4(((helper = (helper = helpers.objectid || (depth0 != null ? depth0.objectid : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"objectid","hash":{},"data":data}) : helper)))
    + "\" swoosh-object-type=\"curation\" banana-type=\"popover\" banana-status=\"0\" banana-option=\"base\">\n    <div class=\"bfP-focus\">\n        <div class=\"view-bar\" swoosh-current=\"textonly\">\n            <div class=\"view-head\">\n                <div class=\"view-action-close\" banana-tap=\"1\" banana-type=\"headControlButtons\">\n                    <div class=\"actionicon\"><div class=\"obj\"></div></div>\n                </div>\n\n                <div class=\"view-title\" banana-status=\"1\">\n                    <p class=\"textSize7 textWeightMid\">"
    + alias4(((helper = (helper = helpers.tag || (depth0 != null ? depth0.tag : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"tag","hash":{},"data":data}) : helper)))
    + "</p>\n                </div>\n\n                <div class=\"view-action-addtag\" banana-tap=\"1\">\n                    <div class=\"actionicon\">\n                        <div class=\"obj\"></div>\n                        <p class=\"textSize4 textWeightMid\">Add</p>\n                    </div>\n                </div>\n            </div>\n        </div>\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.focusstories : depth0),{"name":"if","hash":{},"fn":container.program(3, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "    </div>\n\n</div>\n";
},"3":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1;

  return "        <div class=\"focusview-stories\" banana-status=\"0\" banana-option=\"base\">\n"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.focusstories : depth0),{"name":"each","hash":{},"fn":container.program(4, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "            <div class=\"focus-end\" banana-tap=\"1\">\n                <div class=\"actionicon\">\n                    <p class=\"textSize4 textWeightMid\">That's all!</p>\n                    <p class=\"textSize4 textWeightReg2\">Tap to close</p>\n                </div>\n            </div>\n        </div>\n";
},"4":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.url : depth0),{"name":"if","hash":{},"fn":container.program(5, data, 0, blockParams, depths),"inverse":container.program(7, data, 0, blockParams, depths),"data":data})) != null ? stack1 : "")
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.original_image : depth0),{"name":"if","hash":{},"fn":container.program(9, data, 0, blockParams, depths),"inverse":container.program(14, data, 0, blockParams, depths),"data":data})) != null ? stack1 : "")
    + "                    \n                    <div class=\"story-source\">\n                        <p class=\"textSize1 textWeightBold\">"
    + alias4(((helper = (helper = helpers.target || (depth0 != null ? depth0.target : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"target","hash":{},"data":data}) : helper)))
    + ", <span class=\"textWeightBold focusStoryTs\" swoosh-data=\""
    + alias4(((helper = (helper = helpers.ts || (depth0 != null ? depth0.ts : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"ts","hash":{},"data":data}) : helper)))
    + "\"></span></p>\n                    </div>\n                    <div class=\"story-action-share\">\n                        <div class=\"actionicon\"><div class=\"obj\"></div></div>\n                    </div>\n                </div>\n            </div>\n";
},"5":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "            <div class=\"focus-story\" swoosh-object-id=\""
    + alias4(((helper = (helper = helpers.tweet_id || (depth0 != null ? depth0.tweet_id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"tweet_id","hash":{},"data":data}) : helper)))
    + "\" swoosh-current=\"\" swoosh-object-type=\"briefingstory\" swoosh-object-link=\""
    + alias4(((helper = (helper = helpers.url || (depth0 != null ? depth0.url : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"url","hash":{},"data":data}) : helper)))
    + "\" swoosh-object-section=\""
    + alias4(((helper = (helper = helpers.section || (depth0 != null ? depth0.section : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"section","hash":{},"data":data}) : helper)))
    + "\" banana-status=\"1\" swoosh-object-array='"
    + alias4((helpers.toJSON || (depth0 && depth0.toJSON) || alias2).call(alias1,depths[1],{"name":"toJSON","hash":{},"data":data}))
    + "'>\n";
},"7":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "            <div class=\"focus-story\" swoosh-object-id=\""
    + alias4(((helper = (helper = helpers.tweet_id || (depth0 != null ? depth0.tweet_id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"tweet_id","hash":{},"data":data}) : helper)))
    + "\" swoosh-current=\"\" swoosh-object-type=\"briefingstory\" swoosh-object-link=\"none\" swoosh-object-section=\""
    + alias4(((helper = (helper = helpers.section || (depth0 != null ? depth0.section : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"section","hash":{},"data":data}) : helper)))
    + "\" banana-status=\"1\" swoosh-object-array='"
    + alias4((helpers.toJSON || (depth0 && depth0.toJSON) || alias2).call(alias1,depths[1],{"name":"toJSON","hash":{},"data":data}))
    + "'>\n";
},"9":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {});

  return "                <div class=\"story-photo\">\n                    <div class=\"obj\" style=\"background-image: url('"
    + container.escapeExpression(((helper = (helper = helpers.original_image || (depth0 != null ? depth0.original_image : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(alias1,{"name":"original_image","hash":{},"data":data}) : helper)))
    + "');\"></div>\n                </div>\n                <div class=\"story-head\" swoosh-object-type=\"photo\">\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.descriptionfocus : depth0),{"name":"if","hash":{},"fn":container.program(10, data, 0),"inverse":container.program(12, data, 0),"data":data})) != null ? stack1 : "");
},"10":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "                    <p class=\"textSize4 textWeightMid storyHeadTitle\" swoosh-object-origin=\""
    + alias4(((helper = (helper = helpers.target || (depth0 != null ? depth0.target : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"target","hash":{},"data":data}) : helper)))
    + "\">"
    + alias4(((helper = (helper = helpers.titleonly || (depth0 != null ? depth0.titleonly : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"titleonly","hash":{},"data":data}) : helper)))
    + "</p>\n                    <p class=\"textSize2 textWeightReg2 storyHeadTitle\" swoosh-object-origin=\""
    + alias4(((helper = (helper = helpers.target || (depth0 != null ? depth0.target : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"target","hash":{},"data":data}) : helper)))
    + "\">"
    + alias4(((helper = (helper = helpers.descriptionfocus || (depth0 != null ? depth0.descriptionfocus : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"descriptionfocus","hash":{},"data":data}) : helper)))
    + "</p>\n";
},"12":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "                    <p class=\"textSize4 textWeightMid storyHeadTitle\" swoosh-object-origin=\""
    + alias4(((helper = (helper = helpers.target || (depth0 != null ? depth0.target : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"target","hash":{},"data":data}) : helper)))
    + "\">"
    + alias4(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"title","hash":{},"data":data}) : helper)))
    + "</p>\n";
},"14":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers["if"].call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.photo : depth0),{"name":"if","hash":{},"fn":container.program(15, data, 0),"inverse":container.program(17, data, 0),"data":data})) != null ? stack1 : "");
},"15":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {});

  return "                <div class=\"story-photo\">\n                    <div class=\"obj\" style=\"background-image: url('"
    + container.escapeExpression(((helper = (helper = helpers.photo || (depth0 != null ? depth0.photo : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(alias1,{"name":"photo","hash":{},"data":data}) : helper)))
    + "');\"></div>\n                </div>\n                <div class=\"story-head\" swoosh-object-type=\"photo\">\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.descriptionfocus : depth0),{"name":"if","hash":{},"fn":container.program(10, data, 0),"inverse":container.program(12, data, 0),"data":data})) != null ? stack1 : "");
},"17":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "                <div class=\"story-head\">\n"
    + ((stack1 = helpers["if"].call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.descriptionfocus : depth0),{"name":"if","hash":{},"fn":container.program(10, data, 0),"inverse":container.program(12, data, 0),"data":data})) != null ? stack1 : "");
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1;

  return ((stack1 = helpers["if"].call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.array : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"useData":true,"useDepths":true});