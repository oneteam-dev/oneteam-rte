"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getCurrentBlockType;
function getCurrentBlockType(editorState) {
  var selection = editorState.getSelection();
  return editorState.getCurrentContent().getBlockForKey(selection.getStartKey()).getType();
}
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(getCurrentBlockType, "getCurrentBlockType", "src/utils/getCurrentBlockType.js");
}();

;