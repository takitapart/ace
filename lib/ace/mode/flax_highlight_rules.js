define(function(require, exports, module) {
"use strict";

var oop = require("../lib/oop");
var lang = require("../lib/lang");
var MarkdownHighlightRules = require("./markdown_highlight_rules").MarkdownHighlightRules;
var YamlHighlightRules = require("./yaml_highlight_rules").YamlHighlightRules;

vvar FlaxHighlightRules = function() {
    this.$rules = new MarkdownHighlightRules().getRules();

    for (var i in this.$rules) {
        this.$rules[i].unshift({
            token: "keyword",
            regex: "---",
            next: "yaml-start"
        };
    }
    this.embedRules(YamlHighlightRules, "yaml-", [
        {
            token: "keyword",
            regex: "---",
            next: "start"
        }
    ]);
};

exports.FlaxHighlightRules = FlaxHighlightRules;
});
