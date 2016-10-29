'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isListItem;

var _oneteamRteUtils = require('oneteam-rte-utils');

function isListItem(block) {
  var blockType = block.getType();
  return blockType === _oneteamRteUtils.BLOCK_TYPES.UNORDERED_LIST_ITEM || blockType === _oneteamRteUtils.BLOCK_TYPES.ORDERED_LIST_ITEM || blockType === _oneteamRteUtils.BLOCK_TYPES.CHECKABLE_LIST_ITEM;
}
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(isListItem, 'isListItem', 'src/utils/isListItem.js');
}();

;