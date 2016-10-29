'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = toggleLink;

var _draftJs = require('draft-js');

var _oneteamRteUtils = require('oneteam-rte-utils');

function toggleLink(editorState) {
  var url = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

  var selection = editorState.getSelection();
  if (selection.isCollapsed()) {
    return editorState;
  }
  var entityKey = url ? _draftJs.Entity.create(_oneteamRteUtils.ENTITY_TYPES.LINK, 'MUTABLE', { url: url }) : null;
  return _draftJs.RichUtils.toggleLink(editorState, selection, entityKey);
}
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(toggleLink, 'toggleLink', 'src/functions/toggleLink.js');
}();

;