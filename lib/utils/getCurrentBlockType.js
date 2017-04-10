'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getCurrentBlockType;

var _draftJs = require('draft-js');

function getCurrentBlockType(editorState) {
  return _draftJs.RichUtils.getCurrentBlockType(editorState);
}