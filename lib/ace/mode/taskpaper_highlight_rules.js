define(function(require, exports, module) {
"use strict";

var oop = require("../lib/oop");
var TextHighlightRules = require("./text_highlight_rules").TextHighlightRules;


var TaskpaperHighlightRules = function() {

    // regexp must not have capturing parentheses. Use (?:) instead.
    // regexps are ordered -> the first match is used
   this.$rules = {
        "start" : [
            { // Empty line
                token : "empty_line",
                regex : "^(?:\\s*)$",
                next  : "start"
            }, { // Project
                token : "entity.project",
                regex : "^(?:.+:\\s*)$",
                next  : "start"
            }, { // done
                token : "string",
                regex: "^\\s*(?:[*+-]|\\d+\\.)\\s*(?=.+@done)",
                next  : "done"
            }, { // task
                token : "markup.list",
                regex : "^\\s*(?:[*+-]|\\d+\\.)\\s+",
                next  : "task"
            }, { // notes
                token : "string",
                regex : "^\\s*",
                next  : "note"
            }, {
                include : "basic"
            }, {
                // defaultToken : "entity.note"
            }
        ]
    };
    
    this.addRules({
        "note" : [
            {
                token : "entity.note",
                regex: "$",
                next  : "start"
            }, {
                include : "basic"
            }, {
                defaultToken : "entity.note"
            }
        ],
        
        "task" : [ 
            { // Empty line, back to start.
                token : "empty_line",
                regex : "^\\s*$",
                next  : "start",
            }, { 
                token : "empty_line",
                regex : "$",
                next  : "task",
            }, { // Project
                token : "entity.project",
                regex : "^(?:.+:\\s*)$",
                next  : "start"
            }, { // done
                token : "string",
                regex: "^\\s*(?:[*+-]|\\d+\\.)\\s*(?=.+@done)",
                next  : "done"
            }, { // task
                token : "markup.list",
                regex : "^\\s*(?:[*+-]|\\d+\\.)\\s+",
                next  : "task"
            }, { // notes
                token : "string",
                regex : "^\\s*",
                next  : "note"
            }, {
                include : "basic", noEscape: true
            }, {
                defaultToken : "list" //do not use markup.list to allow styling leading `*` differently
            } 
        ],
        
        "done" : [
            {
                token : "entity.task.done",
                regex: "$",
                next  : "start"
            }, {
                include : "basic"
            }, {
                defaultToken : "entity.task.done"
            }
        ],
        
        "basic" : [
            { // Tags
                token: 'entity.name.tag', 
                regex: '@(?:.+?)\\b'
            }, { // strong ** __
                token : "string.strong",
                regex : "([*]{2}|[_]{2}(?=\\S))(.*?\\S[*_]*)(\\1)"
            }, { // emphasis * _
                token : "string.emphasis",
                regex : "([*]|[_](?=\\S))(.*?\\S[*_]*)(\\1)"
            }
        ]

        
        
    });
    
    this.normalizeRules();
        
};

oop.inherits(TaskpaperHighlightRules, TextHighlightRules);

exports.TaskpaperHighlightRules = TaskpaperHighlightRules;

});