'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = toggleBlockType;

var _draftJs = require('draft-js');

function toggleBlockType(editorState, blockType) {
  return _draftJs.RichUtils.toggleBlockType(editorState, blockType);
}