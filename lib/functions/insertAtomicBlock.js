'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = insertAtomicBlock;

var _draftJs = require('draft-js');

/**
 * @param {EditorState} editorState
 * @param {String} entityType
 * @param {String} mutability `IMMUTABLE`, `MUTABLE` or `SEGMENTED`
 * @param {Object} data
 * @param {String} character [character = ' ']
 * @returns {EditorState}
 */
function insertAtomicBlock(editorState, entityType, mutability, data) {
  var character = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : ' ';

  var entityKey = _draftJs.Entity.create(entityType, mutability, data);
  return _draftJs.AtomicBlockUtils.insertAtomicBlock(editorState, entityKey, character);
}
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(insertAtomicBlock, 'insertAtomicBlock', 'src/functions/insertAtomicBlock.js');
}();

;