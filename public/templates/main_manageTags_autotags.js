var Handlebars = require("handlebars");module.exports = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, helper, options, buffer = "";

  stack1 = ((helper = (helper = helpers.array || (depth0 != null ? depth0.array : depth0)) != null ? helper : helpers.helperMissing),(options={"name":"array","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data}),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),options) : helper));
  if (!helpers.array) { stack1 = helpers.blockHelperMissing.call(depth0,stack1,options)}
  if (stack1 != null) { buffer += stack1; }
  return buffer;
},"2":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {});

  return ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.storiescount : depth0),{"name":"if","hash":{},"fn":container.program(3, data, 0),"inverse":container.program(5, data, 0),"data":data})) != null ? stack1 : "")
    + "    <div>\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.mainphoto : depth0),{"name":"if","hash":{},"fn":container.program(7, data, 0),"inverse":container.program(9, data, 0),"data":data})) != null ? stack1 : "")
    + "    </div>\n</li>\n";
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
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "        <p class=\"textSize4 textWeightMid tagContainer tagWithPhoto\" style=\"background-image: linear-gradient(to top, rgba(0,0,0,0.7) 0%,rgba(0,0,0,0.2) 100%), url('"
    + alias4(((helper = (helper = helpers.mainphoto || (depth0 != null ? depth0.mainphoto : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"mainphoto","hash":{},"data":data}) : helper)))
    + "');\">"
    + alias4(((helper = (helper = helpers.tag || (depth0 != null ? depth0.tag : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"tag","hash":{},"data":data}) : helper)))
    + "</p>\n";
},"9":function(container,depth0,helpers,partials,data) {
    var helper;

  return "        <p class=\"textSize4 textWeightMid tagContainer\">"
    + container.escapeExpression(((helper = (helper = helpers.tag || (depth0 != null ? depth0.tag : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"tag","hash":{},"data":data}) : helper)))
    + "</p>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers["if"].call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.array : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"useData":true});