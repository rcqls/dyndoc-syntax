/* ***** BEGIN LICENSE BLOCK *****
 * Version: MPL 1.1/GPL 2.0/LGPL 2.1
 *
 * The contents of this file are subject to the Mozilla Public License Version
 * 1.1 (the "License"); you may not use this file except in compliance with
 * the License. You may obtain a copy of the License at
 * http://www.mozilla.org/MPL/
 *
 * Software distributed under the License is distributed on an "AS IS" basis,
 * WITHOUT WARRANTY OF ANY KIND, either express or implied. See the License
 * for the specific language governing rights and limitations under the
 * License.
 *
 * The Original Code is Ajax.org Code Editor (ACE).
 *
 * The Initial Developer of the Original Code is
 * Ajax.org B.V.
 * Portions created by the Initial Developer are Copyright (C) 2010
 * the Initial Developer. All Rights Reserved.
 *
 * Contributor(s):
 *      Fabian Jakobs <fabian AT ajax DOT org>
 *
 * Alternatively, the contents of this file may be used under the terms of
 * either the GNU General Public License Version 2 or later (the "GPL"), or
 * the GNU Lesser General Public License Version 2.1 or later (the "LGPL"),
 * in which case the provisions of the GPL or the LGPL are applicable instead
 * of those above. If you wish to allow use of your version of this file only
 * under the terms of either the GPL or the LGPL, and not to allow others to
 * use your version of this file under the terms of the MPL, indicate your
 * decision by deleting the provisions above and replace them with the notice
 * and other provisions required by the GPL or the LGPL. If you do not delete
 * the provisions above, a recipient may use your version of this file under
 * the terms of any one of the MPL, the GPL or the LGPL.
 *
 * ***** END LICENSE BLOCK ***** */

define('ace/mode/dyndoc', ['require', 'exports', 'module' , 'ace/lib/oop', 'ace/mode/text', 'ace/mode/latex', 'ace/mode/ruby', 'ace/tokenizer', 'ace/mode/html'], function(require, exports, module) {
"use strict";

var oop = require("../lib/oop");
var TextMode = require("./text").Mode;
var Tokenizer = require("../tokenizer").Tokenizer;
var DyndocHighlightRules = require("./dyndoc_highlight_rules").DyndocHighlightRules;

//var HtmlMode = require("ace/mode/html").Mode;
//var LatexMode = require("ace/mode/latex").Mode;
//var RubyMode = require("ace/mode/ruby").Mode;

var Mode = function() {
    var highlighter = new DyndocHighlightRules();
    this.$tokenizer = new Tokenizer(highlighter.getRules());
    
    this.$embeds = highlighter.getEmbeds();
    /**this.createModeDelegates({
        "html-": HtmlMode,
        "latex-": JavaScriptMode,
        "rb-": RubyMode
    });**/
    
};
oop.inherits(Mode, TextMode);

(function() {

   /*** 
    this.toggleCommentLines = function(state, doc, startRow, endRow) {
        return 0;
    };

    this.getNextLineIndent = function(state, line, tab) {
        return this.$getIndent(line);
    };

    this.checkOutdent = function(state, line, input) {
        return false;
    };
    ***/

}).call(Mode.prototype);

exports.Mode = Mode;
});
 
  
/* ***** BEGIN LICENSE BLOCK *****
 * Version: MPL 1.1/GPL 2.0/LGPL 2.1
 *
 * The contents of this file are subject to the Mozilla Public License Version
 * 1.1 (the "License"); you may not use this file except in compliance with
 * the License. You may obtain a copy of the License at
 * http://www.mozilla.org/MPL/
 *
 * Software distributed under the License is distributed on an "AS IS" basis,
 * WITHOUT WARRANTY OF ANY KIND, either express or implied. See the License
 * for the specific language governing rights and limitations under the
 * License.
 *
 * The Original Code is Ajax.org Code Editor (ACE).
 *
 * The Initial Developer of the Original Code is
 * Ajax.org B.V.
 * Portions created by the Initial Developer are Copyright (C) 2010
 * the Initial Developer. All Rights Reserved.
 *
 * Contributor(s):
 *      Fabian Jakobs <fabian AT ajax DOT org>
 *
 * Alternatively, the contents of this file may be used under the terms of
 * either the GNU General Public License Version 2 or later (the "GPL"), or
 * the GNU Lesser General Public License Version 2.1 or later (the "LGPL"),
 * in which case the provisions of the GPL or the LGPL are applicable instead
 * of those above. If you wish to allow use of your version of this file only
 * under the terms of either the GPL or the LGPL, and not to allow others to
 * use your version of this file under the terms of the MPL, indicate your
 * decision by deleting the provisions above and replace them with the notice
 * and other provisions required by the GPL or the LGPL. If you do not delete
 * the provisions above, a recipient may use your version of this file under
 * the terms of any one of the MPL, the GPL or the LGPL.
 *
 * ***** END LICENSE BLOCK ***** */

define('ace/mode/dyndoc_highlight_rules', ['require', 'exports', 'module' , 'ace/lib/oop', 'ace/mode/text_highlight_rules'], function(require, exports, module) {
"use strict";

var oop = require("../lib/oop");
var TextHighlightRules = require("./text_highlight_rules").TextHighlightRules;

var DyndocHighlightRules = function() {

    // regexp must not have capturing parentheses
    // regexps are ordered -> the first match is used
    this.$rules = {
        start : [ {
            token : ["support.function","support.buildin","support.function",],
            merge : true,
            regex : "(\\{#)(hide)(\\])",
            next : "comment"
        }, {
            token : ["support.function","keyword.constant","support.function"], // opening blck-tag
            regex : "(\\[#)([^\\]]*)(\\])",
            next : "start"
        }, {
            token : ["support.function","support.buildin","support.function"], // opening tag
            regex : "(\\{#)([^\\]]+)(\\])",
            next : "start"
        } , {
            token : ["support.function","support.buildin","support.function"], // closing tag
            regex : "(\\[#)([^\\}]*)(\\})",
            next : "start"
        } ],

        comment : [ {
            token : ["support.function","support.buildin","support.function",],
            regex : "(\\[#)((?:hide)?)(\\})",
            next : "start"
        },
        {
            token : "comment",
            merge : true,
            regex : ".+(?=\\[#(?:hide)?\\})"
        },{
            token : "comment",
            merge : true,
            regex : ".+"
        } ]
    };
    
    /***    
    this.embedRules(RubyHighlightRules, "rb-", [{
        token: "comment",
        regex: "\\/\\/.*(?=<\\/script>)",
        next: "tag"
    }, {
        token: "meta.tag",
        regex: "<\\/(?=script)",
        next: "tag"
    }]);
    
    this.embedRules(HtmlHighlightRules, "html-", [{
        token: "meta.tag",
        regex: "<\\/(?=style)",
        next: "tag"
    }]);

    this.embedRules(LatexHighlightRules, "latex-", [{
        token: "meta.tag",
        regex: "<\\/(?=style)",
        next: "tag"
    }]); 
    ***/

};

oop.inherits(DyndocHighlightRules, TextHighlightRules);

exports.DyndocHighlightRules = DyndocHighlightRules;
});