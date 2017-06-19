'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = updateEditorState;

var _draftJs = require('draft-js');

var _encoding = require('../encoding');

function updateEditorState(editorState, html) {
  return _draftJs.EditorState.push(editorState, (0, _encoding.htmlToContent)(html));
}