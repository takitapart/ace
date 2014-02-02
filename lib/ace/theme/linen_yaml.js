define(function(require, exports, module) {

exports.isDark = true;
exports.cssClass = "ace-linen_yaml";
exports.cssText = require("../requirejs/text!./linen_yaml.css");

    var dom = require("../lib/dom");
    dom.importCssString(exports.cssText, exports.cssClass);
});
