var Handlebars = require("handlebars");module.exports = Handlebars.template({"1":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1;

  return ((stack1 = helpers["if"].call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.headstory : depth0),{"name":"if","hash":{},"fn":container.program(2, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"2":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<li swoosh-object-id=\""
    + alias4(((helper = (helper = helpers.objectid || (depth0 != null ? depth0.objectid : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"objectid","hash":{},"data":data}) : helper)))
    + "\" swoosh-object-type=\"group\">\n    <div class=\"storyFocuspoints\">\n        <p class=\"textSize2 textWeightBold\">"
    + alias4(((helper = (helper = helpers.hotkeywordtext || (depth0 != null ? depth0.hotkeywordtext : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"hotkeywordtext","hash":{},"data":data}) : helper)))
    + "</p>\n    </div>\n\n    <div class=\"headStoryContainer\">\n"
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.headstory : depth0),{"name":"each","hash":{},"fn":container.program(3, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "    </div>\n</li>\n";
},"3":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {});

  return ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.url : depth0),{"name":"if","hash":{},"fn":container.program(4, data, 0, blockParams, depths),"inverse":container.program(12, data, 0, blockParams, depths),"data":data})) != null ? stack1 : "")
    + "\n            <div class=\"storyContent\">\n                <div class=\"contentContainer\">\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.titleonly : depth0),{"name":"if","hash":{},"fn":container.program(20, data, 0, blockParams, depths),"inverse":container.program(22, data, 0, blockParams, depths),"data":data})) != null ? stack1 : "")
    + "                    <p class=\"textSize0 textWeightReg2 storySource\">"
    + container.escapeExpression(((helper = (helper = helpers.target || (depth0 != null ? depth0.target : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(alias1,{"name":"target","hash":{},"data":data}) : helper)))
    + "</p>\n                </div>\n            </div>\n\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.original_image : depth0),{"name":"if","hash":{},"fn":container.program(24, data, 0, blockParams, depths),"inverse":container.program(26, data, 0, blockParams, depths),"data":data})) != null ? stack1 : "")
    + "\n            <div class=\"story-action-addtag\">\n                <p class=\"textSize2 textWeightMid\" banana-tap=\"1\">Add</p>\n            </div>\n\n            <div class=\"story-action-share\">\n                <div class=\"actionicon\"><div class=\"obj\"></div></div>\n            </div>\n        </div>\n";
},"4":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1;

  return ((stack1 = helpers["if"].call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.original_image : depth0),{"name":"if","hash":{},"fn":container.program(5, data, 0, blockParams, depths),"inverse":container.program(7, data, 0, blockParams, depths),"data":data})) != null ? stack1 : "");
},"5":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "            <div class=\"storyObj\" banana-tap=\"1\" swoosh-object-type=\"hotstory\" swoosh-object-id=\""
    + alias4(((helper = (helper = helpers.tweet_id || (depth0 != null ? depth0.tweet_id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"tweet_id","hash":{},"data":data}) : helper)))
    + "\" swoosh-object-link=\""
    + alias4(((helper = (helper = helpers.url || (depth0 != null ? depth0.url : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"url","hash":{},"data":data}) : helper)))
    + "\" swoosh-object-data=\"photo\" swoosh-object-array=\""
    + alias4((helpers.toJSON || (depth0 && depth0.toJSON) || alias2).call(alias1,depths[2],{"name":"toJSON","hash":{},"data":data}))
    + "\">\n";
},"7":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1;

  return ((stack1 = helpers["if"].call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.photo : depth0),{"name":"if","hash":{},"fn":container.program(8, data, 0, blockParams, depths),"inverse":container.program(10, data, 0, blockParams, depths),"data":data})) != null ? stack1 : "");
},"8":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "                <div class=\"storyObj\" banana-tap=\"1\" swoosh-object-type=\"hotstory\" swoosh-object-id=\""
    + alias4(((helper = (helper = helpers.tweet_id || (depth0 != null ? depth0.tweet_id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"tweet_id","hash":{},"data":data}) : helper)))
    + "\" swoosh-object-link=\""
    + alias4(((helper = (helper = helpers.url || (depth0 != null ? depth0.url : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"url","hash":{},"data":data}) : helper)))
    + "\" swoosh-object-data=\"photo\" swoosh-object-array=\""
    + alias4((helpers.toJSON || (depth0 && depth0.toJSON) || alias2).call(alias1,depths[3],{"name":"toJSON","hash":{},"data":data}))
    + "\">\n";
},"10":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "                <div class=\"storyObj\" banana-tap=\"1\" swoosh-object-type=\"hotstory\" swoosh-object-id=\""
    + alias4(((helper = (helper = helpers.tweet_id || (depth0 != null ? depth0.tweet_id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"tweet_id","hash":{},"data":data}) : helper)))
    + "\" swoosh-object-link=\""
    + alias4(((helper = (helper = helpers.url || (depth0 != null ? depth0.url : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"url","hash":{},"data":data}) : helper)))
    + "\" swoosh-object-array=\""
    + alias4((helpers.toJSON || (depth0 && depth0.toJSON) || alias2).call(alias1,depths[3],{"name":"toJSON","hash":{},"data":data}))
    + "\">\n";
},"12":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1;

  return ((stack1 = helpers["if"].call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.original_image : depth0),{"name":"if","hash":{},"fn":container.program(13, data, 0, blockParams, depths),"inverse":container.program(15, data, 0, blockParams, depths),"data":data})) != null ? stack1 : "");
},"13":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3=container.escapeExpression;

  return "            <div class=\"storyObj\" banana-tap=\"1\" swoosh-object-type=\"hotstory\" swoosh-object-id=\""
    + alias3(((helper = (helper = helpers.tweet_id || (depth0 != null ? depth0.tweet_id : depth0)) != null ? helper : alias2),(typeof helper === "function" ? helper.call(alias1,{"name":"tweet_id","hash":{},"data":data}) : helper)))
    + "\" swoosh-object-link=\"none\" swoosh-object-data=\"photo\" swoosh-object-array=\""
    + alias3((helpers.toJSON || (depth0 && depth0.toJSON) || alias2).call(alias1,depths[2],{"name":"toJSON","hash":{},"data":data}))
    + "\">\n";
},"15":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1;

  return ((stack1 = helpers["if"].call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.photo : depth0),{"name":"if","hash":{},"fn":container.program(16, data, 0, blockParams, depths),"inverse":container.program(18, data, 0, blockParams, depths),"data":data})) != null ? stack1 : "");
},"16":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3=container.escapeExpression;

  return "                <div class=\"storyObj\" banana-tap=\"1\" swoosh-object-type=\"hotstory\" swoosh-object-id=\""
    + alias3(((helper = (helper = helpers.tweet_id || (depth0 != null ? depth0.tweet_id : depth0)) != null ? helper : alias2),(typeof helper === "function" ? helper.call(alias1,{"name":"tweet_id","hash":{},"data":data}) : helper)))
    + "\" swoosh-object-link=\"none\" swoosh-object-data=\"photo\" swoosh-object-array=\""
    + alias3((helpers.toJSON || (depth0 && depth0.toJSON) || alias2).call(alias1,depths[3],{"name":"toJSON","hash":{},"data":data}))
    + "\">\n";
},"18":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3=container.escapeExpression;

  return "                <div class=\"storyObj\" banana-tap=\"1\" swoosh-object-type=\"hotstory\" swoosh-object-id=\""
    + alias3(((helper = (helper = helpers.tweet_id || (depth0 != null ? depth0.tweet_id : depth0)) != null ? helper : alias2),(typeof helper === "function" ? helper.call(alias1,{"name":"tweet_id","hash":{},"data":data}) : helper)))
    + "\" swoosh-object-link=\"none\" swoosh-object-array=\""
    + alias3((helpers.toJSON || (depth0 && depth0.toJSON) || alias2).call(alias1,depths[3],{"name":"toJSON","hash":{},"data":data}))
    + "\">\n";
},"20":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "                    <p class=\"textSize3 textWeightMid storyHeadTitle\" swoosh-object-origin=\""
    + alias4(((helper = (helper = helpers.target || (depth0 != null ? depth0.target : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"target","hash":{},"data":data}) : helper)))
    + "\">"
    + alias4(((helper = (helper = helpers.titleonly || (depth0 != null ? depth0.titleonly : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"titleonly","hash":{},"data":data}) : helper)))
    + "</p>\n";
},"22":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "                    <p class=\"textSize3 textWeightMid storyHeadTitle\" swoosh-object-origin=\""
    + alias4(((helper = (helper = helpers.target || (depth0 != null ? depth0.target : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"target","hash":{},"data":data}) : helper)))
    + "\">"
    + alias4(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"title","hash":{},"data":data}) : helper)))
    + "</p>\n";
},"24":function(container,depth0,helpers,partials,data) {
    var helper;

  return "            <div class=\"storyPhoto\">\n                <div class=\"obj\" style=\"background-image: url('"
    + container.escapeExpression(((helper = (helper = helpers.original_image || (depth0 != null ? depth0.original_image : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"original_image","hash":{},"data":data}) : helper)))
    + "');\"></div>\n            </div>\n";
},"26":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers["if"].call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.photo : depth0),{"name":"if","hash":{},"fn":container.program(27, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"27":function(container,depth0,helpers,partials,data) {
    var helper;

  return "            <div class=\"storyPhoto\">\n                <div class=\"obj\" style=\"background-image: url('"
    + container.escapeExpression(((helper = (helper = helpers.photo || (depth0 != null ? depth0.photo : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"photo","hash":{},"data":data}) : helper)))
    + "');\"></div>\n            </div>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, helper, options;

  stack1 = ((helper = (helper = helpers.array || (depth0 != null ? depth0.array : depth0)) != null ? helper : helpers.helperMissing),(options={"name":"array","hash":{},"fn":container.program(1, data, 0, blockParams, depths),"inverse":container.noop,"data":data}),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),options) : helper));
  if (!helpers.array) { stack1 = helpers.blockHelperMissing.call(depth0,stack1,options)}
  if (stack1 != null) { return stack1; }
  else { return ''; }
},"useData":true,"useDepths":true});