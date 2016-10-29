'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = moveSelectionTo;

var _draftJs = require('draft-js');

function moveSelectionTo(editorState, targetBlock) {
  var offset0 = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

  if (!targetBlock) return null;

  var contentState = editorState.getCurrentContent();
  var selection = editorState.getSelection();
  var targetKey = targetBlock.getKey();
  var targetLength = offset0 ? 0 : targetBlock.getLength();

  // Move the focus offset to the end of the previous line
  var selectionChanges = {
    focusKey: targetKey,
    focusOffset: targetLength
  };

  // If the selection is collapsed, keep it collapsed by also moving the anchor
  if (selection.isCollapsed()) {
    selectionChanges = _extends({}, selectionChanges, {
      anchorKey: targetKey,
      anchorOffset: targetLength
    });
  }

  var nextSelection = selection.merge(selectionChanges);

  // Update the selection state.
  var updatedEditorState = _draftJs.EditorState.forceSelection(editorState, nextSelection);
  return _draftJs.EditorState.push(updatedEditorState, contentState, 'move-selection-to-target-block');
}
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(moveSelectionTo, 'moveSelectionTo', 'src/functions/moveSelectionTo.js');
}();

;