'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = toggleInlineStyle;

var _draftJs = require('draft-js');

function toggleInlineStyle(editorState, inlineStyle) {
  return _draftJs.RichUtils.toggleInlineStyle(editorState, inlineStyle);
}