'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = insertText;

var _draftJs = require('draft-js');

function insertText(editorState, text) {
  var selection = editorState.getSelection();
  var content = editorState.getCurrentContent();
  var newContentState = _draftJs.Modifier.insertText(content, selection, text, editorState.getCurrentInlineStyle());
  return _draftJs.EditorState.push(editorState, newContentState, 'insert-fragment');
}