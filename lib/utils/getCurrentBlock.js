"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getCurrentBlock;
function getCurrentBlock(editorState) {
  var selection = editorState.getSelection();
  return editorState.getCurrentContent().getBlockForKey(selection.getStartKey());
}
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(getCurrentBlock, "getCurrentBlock", "src/utils/getCurrentBlock.js");
}();

;