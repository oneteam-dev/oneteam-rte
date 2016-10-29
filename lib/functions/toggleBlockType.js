'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = toggleBlockType;

var _draftJs = require('draft-js');

function toggleBlockType(editorState, blockType) {
  return _draftJs.RichUtils.toggleBlockType(editorState, blockType);
}
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(toggleBlockType, 'toggleBlockType', 'src/functions/toggleBlockType.js');
}();

;