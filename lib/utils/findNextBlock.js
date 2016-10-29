"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = findNextBlock;
function findNextBlock(contentState, blockKey, predicate) {
  var block = contentState.getBlockAfter(blockKey);
  return !block ? null : predicate(block) ? block : findNextBlock(contentState, block.getKey(), predicate);
}
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(findNextBlock, "findNextBlock", "src/utils/findNextBlock.js");
}();

;