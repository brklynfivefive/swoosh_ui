var Handlebars = require("handlebars");module.exports = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, helper, options, buffer = "";

  stack1 = ((helper = (helper = helpers.array || (depth0 != null ? depth0.array : depth0)) != null ? helper : helpers.helperMissing),(options={"name":"array","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data}),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),options) : helper));
  if (!helpers.array) { stack1 = helpers.blockHelperMissing.call(depth0,stack1,options)}
  if (stack1 != null) { buffer += stack1; }
  return buffer;
},"2":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {});

  return ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.storiescount : depth0),{"name":"if","hash":{},"fn":container.program(3, data, 0),"inverse":container.program(5, data, 0),"data":data})) != null ? stack1 : "")
    + "    <div>\n        <div class=\"deskfocus-item\">\n            <div class=\"item-head\">\n                <p class=\"textSize4 textWeightMid deskfocusTag\">"
    + container.escapeExpression(((helper = (helper = helpers.tag || (depth0 != null ? depth0.tag : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(alias1,{"name":"tag","hash":{},"data":data}) : helper)))
    + "</p>\n            </div>\n            <div class=\"deskfocus-story-preview\">\n"
    + ((stack1 = helpers["with"].call(alias1,((stack1 = (depth0 != null ? depth0.focusstories : depth0)) != null ? stack1["0"] : stack1),{"name":"with","hash":{},"fn":container.program(7, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "            </div>\n        </div>\n    </div>\n</li>\n";
},"3":function(container,depth0,helpers,partials,data) {
    var helper;

  return "<li swoosh-object-id=\""
    + container.escapeExpression(((helper = (helper = helpers.objectid || (depth0 != null ? depth0.objectid : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"objectid","hash":{},"data":data}) : helper)))
    + "\" banana-tap=\"1\">\n";
},"5":function(container,depth0,helpers,partials,data) {
    var helper;

  return "<li swoosh-object-id=\""
    + container.escapeExpression(((helper = (helper = helpers.objectid || (depth0 != null ? depth0.objectid : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"objectid","hash":{},"data":data}) : helper)))
    + "\" swoosh-object=\"nobriefing\" banana-tap=\"1\">\n";
},"7":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {});

  return ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.url : depth0),{"name":"if","hash":{},"fn":container.program(8, data, 0),"inverse":container.program(8, data, 0),"data":data})) != null ? stack1 : "")
    + "                    <div class=\"storyContent\">\n                        <div class=\"contentContainer\">\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.titleonly : depth0),{"name":"if","hash":{},"fn":container.program(16, data, 0),"inverse":container.program(18, data, 0),"data":data})) != null ? stack1 : "")
    + "                            <p class=\"textSize0 textWeightReg2 storySource\">"
    + container.escapeExpression(((helper = (helper = helpers.target || (depth0 != null ? depth0.target : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(alias1,{"name":"target","hash":{},"data":data}) : helper)))
    + "</p>\n                        </div>\n                    </div>\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.original_image : depth0),{"name":"if","hash":{},"fn":container.program(20, data, 0),"inverse":container.program(22, data, 0),"data":data})) != null ? stack1 : "")
    + "                </div>\n";
},"8":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers["if"].call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.original_image : depth0),{"name":"if","hash":{},"fn":container.program(9, data, 0),"inverse":container.program(11, data, 0),"data":data})) != null ? stack1 : "");
},"9":function(container,depth0,helpers,partials,data) {
    return "                    <div class=\"storyObj\" swoosh-object-data=\"photo\">\n";
},"11":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers["if"].call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.photo : depth0),{"name":"if","hash":{},"fn":container.program(12, data, 0),"inverse":container.program(14, data, 0),"data":data})) != null ? stack1 : "");
},"12":function(container,depth0,helpers,partials,data) {
    return "                        <div class=\"storyObj\" swoosh-object-data=\"photo\">\n";
},"14":function(container,depth0,helpers,partials,data) {
    return "                        <div class=\"storyObj\">\n";
},"16":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "                            <p class=\"textSize3 textWeightMid storyHeadTitle\" swoosh-object-origin=\""
    + alias4(((helper = (helper = helpers.target || (depth0 != null ? depth0.target : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"target","hash":{},"data":data}) : helper)))
    + "\">"
    + alias4(((helper = (helper = helpers.titleonly || (depth0 != null ? depth0.titleonly : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"titleonly","hash":{},"data":data}) : helper)))
    + "</p>\n";
},"18":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "                            <p class=\"textSize3 textWeightMid storyHeadTitle\" swoosh-object-origin=\""
    + alias4(((helper = (helper = helpers.target || (depth0 != null ? depth0.target : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"target","hash":{},"data":data}) : helper)))
    + "\">"
    + alias4(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"title","hash":{},"data":data}) : helper)))
    + "</p>\n";
},"20":function(container,depth0,helpers,partials,data) {
    var helper;

  return "                    <div class=\"storyPhoto\">\n                        <div class=\"obj\" style=\"background-image: url('"
    + container.escapeExpression(((helper = (helper = helpers.original_image || (depth0 != null ? depth0.original_image : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"original_image","hash":{},"data":data}) : helper)))
    + "');\"></div>\n                    </div>\n";
},"22":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers["if"].call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.photo : depth0),{"name":"if","hash":{},"fn":container.program(23, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"23":function(container,depth0,helpers,partials,data) {
    var helper;

  return "                    <div class=\"storyPhoto\">\n                        <div class=\"obj\" style=\"background-image: url('"
    + container.escapeExpression(((helper = (helper = helpers.photo || (depth0 != null ? depth0.photo : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"photo","hash":{},"data":data}) : helper)))
    + "');\"></div>\n                    </div>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers["if"].call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.array : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"useData":true});