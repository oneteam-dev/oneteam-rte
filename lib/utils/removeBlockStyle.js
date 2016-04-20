'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = removeBlockStyle;

var _draftJs = require('draft-js');

function removeBlockStyle(editorState) {
  var withoutBlockStyle = _draftJs.RichUtils.tryToRemoveBlockStyle(editorState);
  return withoutBlockStyle ? _draftJs.EditorState.push(editorState, withoutBlockStyle, 'change-block-type') : null;
}