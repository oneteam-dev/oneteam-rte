'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = createCheckedState;

var _constants = require('../constants');

function createCheckedState(blocksAsArray) {
  return blocksAsArray.reduce(function (result, block) {
    if (block.getType() === _constants.BLOCK_TYPES.CHECKABLE_LIST_ITEM) {
      result[block.getKey()] = block.getChecked();
    }
    return result;
  }, {});
}