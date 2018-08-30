var Handlebars = require("handlebars");module.exports = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {});

  return "<li swoosh-object-id=\""
    + container.escapeExpression(((helper = (helper = helpers.objectid || (depth0 != null ? depth0.objectid : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(alias1,{"name":"objectid","hash":{},"data":data}) : helper)))
    + "\">\n    <div class=\"headStoryContainer\">\n"
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.hotstories : depth0),{"name":"each","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "    </div>\n</li>\n";
},"2":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "        <div class=\"storyObj\" swoosh-object-type=\"hotstory\">\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.original_image : depth0),{"name":"if","hash":{},"fn":container.program(3, data, 0),"inverse":container.program(5, data, 0),"data":data})) != null ? stack1 : "")
    + "            <div class=\"storyContent\">\n                <p class=\"textSize3 textWeightReg2 storyHeadTitle\" swoosh-object-origin=\""
    + alias4(((helper = (helper = helpers.target || (depth0 != null ? depth0.target : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"target","hash":{},"data":data}) : helper)))
    + "\">"
    + alias4(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"title","hash":{},"data":data}) : helper)))
    + "</p>\n            </div>\n        </div>\n";
},"3":function(container,depth0,helpers,partials,data) {
    var helper;

  return "            <div class=\"storyPhoto\">\n                <div class=\"obj\" style=\"background-image: url('"
    + container.escapeExpression(((helper = (helper = helpers.original_image || (depth0 != null ? depth0.original_image : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"original_image","hash":{},"data":data}) : helper)))
    + "');\"></div>\n            </div>\n";
},"5":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers["if"].call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.photo : depth0),{"name":"if","hash":{},"fn":container.program(6, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"6":function(container,depth0,helpers,partials,data) {
    var helper;

  return "            <div class=\"storyPhoto\">\n                <div class=\"obj\" style=\"background-image: url('"
    + container.escapeExpression(((helper = (helper = helpers.photo || (depth0 != null ? depth0.photo : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"photo","hash":{},"data":data}) : helper)))
    + "');\"></div>\n            </div>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, options;

  stack1 = ((helper = (helper = helpers.array || (depth0 != null ? depth0.array : depth0)) != null ? helper : helpers.helperMissing),(options={"name":"array","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data}),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),options) : helper));
  if (!helpers.array) { stack1 = helpers.blockHelperMissing.call(depth0,stack1,options)}
  if (stack1 != null) { return stack1; }
  else { return ''; }
},"useData":true});