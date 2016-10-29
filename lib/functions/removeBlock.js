'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = removeBlock;

var _draftJs = require('draft-js');

function removeBlock(editorState, block) {
  var content = editorState.getCurrentContent();
  var key = block.getKey();
  var targetRange = new _draftJs.SelectionState({
    anchorKey: key,
    anchorOffset: 0,
    focusKey: key,
    focusOffset: block.getLength()
  });
  var withoutTargetContent = _draftJs.Modifier.removeRange(content, targetRange, 'backward');
  var resetBlock = _draftJs.Modifier.setBlockType(withoutTargetContent, withoutTargetContent.getSelectionAfter(), 'unstyled');
  var newState = _draftJs.EditorState.push(editorState, resetBlock, 'remove-range');
  return _draftJs.EditorState.forceSelection(newState, resetBlock.getSelectionAfter());
}
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(removeBlock, 'removeBlock', 'src/functions/removeBlock.js');
}();

;