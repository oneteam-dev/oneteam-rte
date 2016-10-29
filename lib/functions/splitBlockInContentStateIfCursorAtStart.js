'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = splitBlockInContentStateIfCursorAtStart;

var _draftJs = require('draft-js');

var _generateRandomKey = require('draft-js/lib/generateRandomKey');

var _generateRandomKey2 = _interopRequireDefault(_generateRandomKey);

var _immutable = require('immutable');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @param {EditorState} editorState
 * @returns {EditorState}
 */
function splitBlockInContentStateIfCursorAtStart(editorState) {
  var contentState = editorState.getCurrentContent();
  var selectionState = editorState.getSelection();

  var key = selectionState.getAnchorKey();
  var offset = selectionState.getAnchorOffset();
  var blockMap = contentState.getBlockMap();
  var blockToSplit = blockMap.get(key);

  var text = blockToSplit.getText();
  var chars = blockToSplit.getCharacterList();

  var blockAbove = blockToSplit.merge({
    text: text.slice(0, offset),
    characterList: chars.slice(0, offset),
    data: (0, _immutable.Map)()
  });

  var keyBelow = (0, _generateRandomKey2.default)();
  var blockBelow = blockAbove.merge({
    key: keyBelow,
    text: text.slice(offset),
    characterList: chars.slice(offset),
    data: blockToSplit.getData()
  });

  var blocksBefore = blockMap.toSeq().takeUntil(function (v) {
    return v === blockToSplit;
  });
  var blocksAfter = blockMap.toSeq().skipUntil(function (v) {
    return v === blockToSplit;
  }).rest();
  var newBlocks = blocksBefore.concat([[blockAbove.getKey(), blockAbove], [blockBelow.getKey(), blockBelow]], blocksAfter).toOrderedMap();

  var newContentState = contentState.merge({
    blockMap: newBlocks,
    selectionBefore: selectionState,
    selectionAfter: selectionState.merge({
      anchorKey: keyBelow,
      anchorOffset: 0,
      focusKey: keyBelow,
      focusOffset: 0,
      isBackward: false
    })
  });

  return _draftJs.EditorState.push(editorState, newContentState, 'split-block');
} // Patch https://github.com/facebook/draft-js/blob/master/src/model/transaction/splitBlockInContentState.js

;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(splitBlockInContentStateIfCursorAtStart, 'splitBlockInContentStateIfCursorAtStart', 'src/functions/splitBlockInContentStateIfCursorAtStart.js');
}();

;