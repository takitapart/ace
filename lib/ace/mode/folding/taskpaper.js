define(function(require, exports, module) {
"use strict";

var oop = require("../../lib/oop");
var BaseFoldMode = require("./fold_mode").FoldMode;
var Range = require("../../range").Range;

var FoldMode = exports.FoldMode = function() {};
oop.inherits(FoldMode, BaseFoldMode);

(function() {
    this.foldingStartMarker = /^(.+:\s*)$/;

    this.getFoldWidget = function(session, foldStyle, row) {
        var line = session.getLine(row);
        if (!this.foldingStartMarker.test(line))
            return "";

        return "start";
    };

    this.getFoldWidgetRange = function(session, foldStyle, row) {
        var line = session.getLine(row);
        var startColumn = line.length;
        var maxRow = session.getLength();
        var startRow = row;
        var endRow = row;
        if (!line.match(this.foldingStartMarker))
            return;

        
        var project = "entity.project";
        var token;
        function isProject(row) {
            token = session.getTokens(row)[0];
            return token && token.type.lastIndexOf(project, 0) === 0;
        }
        
        // function getLevel() {
        //     var ch = token.value[0];
        //     if (ch == "=") return 6;
        //     if (ch == "-") return 5;
        //     return 7 - token.value.search(/[^#]/);
        // }

        if (isProject(row)) {
            // var startHeadingLevel = getLevel();
            while (++row < maxRow) {
                if (!isProject(row))
                    continue;
                // var level = getLevel();
                //if (level >= startHeadingLevel)
                    break;
            }

            endRow = row - (!token || ["=", "-"].indexOf(token.value[0]) == -1 ? 1 : 2);

            if (endRow > startRow) {
                while (endRow > startRow && /^\s*$/.test(session.getLine(endRow)))
                    endRow--;
            }

            if (endRow > startRow) {
                var endColumn = session.getLine(endRow).length;
                return new Range(startRow, startColumn, endRow, endColumn);
            }
        }
    };

}).call(FoldMode.prototype);

});
