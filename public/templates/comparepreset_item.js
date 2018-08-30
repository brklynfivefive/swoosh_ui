var Handlebars = require("handlebars");module.exports = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<li swoosh-object-id=\""
    + alias4(((helper = (helper = helpers.presetid || (depth0 != null ? depth0.presetid : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"presetid","hash":{},"data":data}) : helper)))
    + "\" swoosh-object-array=\""
    + alias4((helpers.toJSON || (depth0 && depth0.toJSON) || alias2).call(alias1,(depth0 != null ? depth0.sources : depth0),{"name":"toJSON","hash":{},"data":data}))
    + "\" banana-tap=\"1\">\n    <p class=\"textSize4 textWeightMid\">"
    + alias4(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"title","hash":{},"data":data}) : helper)))
    + "</p>\n</li>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, options;

  stack1 = ((helper = (helper = helpers.presets || (depth0 != null ? depth0.presets : depth0)) != null ? helper : helpers.helperMissing),(options={"name":"presets","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data}),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),options) : helper));
  if (!helpers.presets) { stack1 = helpers.blockHelperMissing.call(depth0,stack1,options)}
  if (stack1 != null) { return stack1; }
  else { return ''; }
},"useData":true});