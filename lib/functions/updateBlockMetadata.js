'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = updateBlockMetadata;

var _draftJs = require('draft-js');

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * @param {EditorState} editorState
 * @param {String} blockKey
 * @param {} metadata
 * @returns {EditorState} New editorState.
 */
function updateBlockMetadata(editorState, blockKey, metadata) {
  var contentState = editorState.getCurrentContent();
  var updatedBlock = contentState.getBlockForKey(blockKey).mergeIn(['data'], metadata);
  var blockMap = contentState.getBlockMap().merge(_defineProperty({}, blockKey, updatedBlock));
  return _draftJs.EditorState.push(editorState, contentState.merge({ blockMap: blockMap }), 'metadata-update');
}
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(updateBlockMetadata, 'updateBlockMetadata', 'src/functions/updateBlockMetadata.js');
}();

;