define(function(require, exports, module) {

exports.isDark = true;
exports.cssClass = "ace-linen_dark";
exports.cssText = require("../requirejs/text!./linen_dark.css");

    var dom = require("../lib/dom");
    dom.importCssString(exports.cssText, exports.cssClass);
});
