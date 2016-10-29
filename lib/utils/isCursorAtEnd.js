"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isCursorAtEnd;
function isCursorAtEnd(block, selection) {
  return block.getLength() === selection.getStartOffset();
}
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(isCursorAtEnd, "isCursorAtEnd", "src/utils/isCursorAtEnd.js");
}();

;