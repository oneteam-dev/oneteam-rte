'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isListItem;

var _constants = require('../constants');

function isListItem(block) {
  var blockType = block.getType();
  return blockType === _constants.BLOCK_TYPES.UNORDERED_LIST_ITEM || blockType === _constants.BLOCK_TYPES.ORDERED_LIST_ITEM || blockType === _constants.BLOCK_TYPES.CHECKABLE_LIST_ITEM;
}