"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = hasCurrentInlineStyle;
function hasCurrentInlineStyle(editorState, type) {
  return editorState.getCurrentInlineStyle().has(type);
}