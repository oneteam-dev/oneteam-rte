import { EditorState, Modifier } from 'draft-js';
import { Map } from 'immutable';
import { ENTITY_TYPES } from 'oneteam-rte-utils';
import insertAtomicBlock from './insertAtomicBlock';

/**
 * @param {EditorState} editorState
 * @param {String[]} urls
 * @returns {EditorState}
 */
export default function insertWebCards(editorState, urls) {
  const content = editorState.getCurrentContent();
  const selection = editorState.getSelection();
  const newContent = Modifier.setBlockData(content, selection, Map({ webcardRendered: true }));
  return urls.reduce(
    (state, url) => insertAtomicBlock(state, ENTITY_TYPES.WEB_CARD, 'IMMUTABLE', { url }),
    EditorState.push(editorState, newContent, 'change-block-data')
  );
}
