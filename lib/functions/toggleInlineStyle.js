'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = toggleInlineStyle;

var _draftJs = require('draft-js');

function toggleInlineStyle(editorState, inlineStyle) {
  return _draftJs.RichUtils.toggleInlineStyle(editorState, inlineStyle);
}
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(toggleInlineStyle, 'toggleInlineStyle', 'src/functions/toggleInlineStyle.js');
}();

;