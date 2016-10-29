'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = moveSelectionToEnd;

var _draftJs = require('draft-js');

function moveSelectionToEnd(editorState) {
  var blockMap = editorState.getCurrentContent().getBlockMap();
  var key = blockMap.last().getKey();
  var length = blockMap.last().getLength();
  var selection = new _draftJs.SelectionState({
    anchorKey: key,
    anchorOffset: length,
    focusKey: key,
    focusOffset: length
  });
  return _draftJs.EditorState.acceptSelection(editorState, selection);
}
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(moveSelectionToEnd, 'moveSelectionToEnd', 'src/functions/moveSelectionToEnd.js');
}();

;