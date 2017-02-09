'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = toggleLink;

var _draftJs = require('draft-js');

var _constants = require('draft-js-oneteam-rte-plugin/lib/constants');

function toggleLink(editorState) {
  var url = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

  var selection = editorState.getSelection();
  if (selection.isCollapsed()) {
    return editorState;
  }
  var entityKey = url ? _draftJs.Entity.create(_constants.LINK, 'MUTABLE', { url: url }) : null;
  return _draftJs.RichUtils.toggleLink(editorState, selection, entityKey);
}