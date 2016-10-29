'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = createCheckedState;

var _oneteamRteUtils = require('oneteam-rte-utils');

function createCheckedState(blocksAsArray) {
  return blocksAsArray.reduce(function (result, block) {
    if (block.getType() === _oneteamRteUtils.BLOCK_TYPES.CHECKABLE_LIST_ITEM) {
      result[block.getKey()] = block.getChecked();
    }
    return result;
  }, {});
}
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(createCheckedState, 'createCheckedState', 'src/utils/createCheckedState.js');
}();

;