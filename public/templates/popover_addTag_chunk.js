var Handlebars = require("handlebars");module.exports = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    return "<li>\n    <p class=\"textSize8 textWeightBold pendingTagContainer\">"
    + container.escapeExpression(container.lambda(depth0, depth0))
    + "</p>\n    <div class=\"addTag-action-pendingTagChunkDelete\">\n        <div class=\"actionicon\"><div class=\"obj\"></div></div>\n    </div>\n</li>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, options;

  stack1 = ((helper = (helper = helpers.keyword || (depth0 != null ? depth0.keyword : depth0)) != null ? helper : helpers.helperMissing),(options={"name":"keyword","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data}),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),options) : helper));
  if (!helpers.keyword) { stack1 = helpers.blockHelperMissing.call(depth0,stack1,options)}
  if (stack1 != null) { return stack1; }
  else { return ''; }
},"useData":true});