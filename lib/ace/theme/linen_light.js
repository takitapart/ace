define(function(require, exports, module) {

exports.isDark = false;
exports.cssClass = "ace-linen_light";
exports.cssText = require("../requirejs/text!./linen_light.css");

    var dom = require("../lib/dom");
    dom.importCssString(exports.cssText, exports.cssClass);
});
