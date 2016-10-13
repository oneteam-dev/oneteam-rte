// Patch https://github.com/facebook/draft-js/blob/master/src/model/transaction/splitBlockInContentState.js

import { EditorState } from 'draft-js';
import generateRandomKey from 'draft-js/lib/generateRandomKey';
import { Map } from 'immutable';

/**
 * @param {EditorState} editorState
 * @returns {EditorState}
 */
export default function splitBlockInContentStateIfCursorAtStart(editorState) {
  const contentState = editorState.getCurrentContent();
  const selectionState = editorState.getSelection();

  const key = selectionState.getAnchorKey();
  const offset = selectionState.getAnchorOffset();
  const blockMap = contentState.getBlockMap();
  const blockToSplit = blockMap.get(key);

  const text = blockToSplit.getText();
  const chars = blockToSplit.getCharacterList();

  const blockAbove = blockToSplit.merge({
    text: text.slice(0, offset),
    characterList: chars.slice(0, offset),
    data: Map()
  });

  const keyBelow = generateRandomKey();
  const blockBelow = blockAbove.merge({
    key: keyBelow,
    text: text.slice(offset),
    characterList: chars.slice(offset),
    data: blockToSplit.getData()
  });

  const blocksBefore = blockMap.toSeq().takeUntil(v => v === blockToSplit);
  const blocksAfter = blockMap.toSeq().skipUntil(v => v === blockToSplit).rest();
  const newBlocks = blocksBefore.concat([[blockAbove.getKey(), blockAbove], [blockBelow.getKey(), blockBelow]], blocksAfter).toOrderedMap();

  const newContentState = contentState.merge({
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

  return EditorState.push(editorState, newContentState, 'split-block');
}
