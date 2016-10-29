"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = hasCurrentInlineStyle;
function hasCurrentInlineStyle(editorState, type) {
  return editorState.getCurrentInlineStyle().has(type);
}
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(hasCurrentInlineStyle, "hasCurrentInlineStyle", "src/utils/hasCurrentInlineStyle.js");
}();

;