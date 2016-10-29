'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = mergeEntityData;

var _draftJs = require('draft-js');

/**
 * @param {EditorState} editorState
 * @param {String} entityKey
 * @param {} data
 * @returns {EditorState} New editorState.
 */
function mergeEntityData(editorState, entityKey, data) {
  _draftJs.Entity.mergeData(entityKey, data);
  // `Entity.mergeData` does not mutate contentState in any way
  // https://github.com/facebook/draft-js/issues/399
  return _draftJs.EditorState.forceSelection(editorState, editorState.getSelection());
}
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(mergeEntityData, 'mergeEntityData', 'src/functions/mergeEntityData.js');
}();

;