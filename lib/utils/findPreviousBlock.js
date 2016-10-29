"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = findPreviousBlock;
function findPreviousBlock(contentState, blockKey, predicate) {
  var block = contentState.getBlockBefore(blockKey);
  return !block ? null : predicate(block) ? block : findPreviousBlock(contentState, block.getKey(), predicate);
}
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(findPreviousBlock, "findPreviousBlock", "src/utils/findPreviousBlock.js");
}();

;