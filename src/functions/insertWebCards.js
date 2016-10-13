import { ENTITY_TYPES } from 'oneteam-rte-utils';
import insertAtomicBlock from './insertAtomicBlock';

/**
 * @param {EditorState} editorState
 * @param {String[]} urls
 * @returns {EditorState}
 */
export default function insertWebCards(editorState, urls) {
  return urls.reduce(
    (state, url) => insertAtomicBlock(state, ENTITY_TYPES.WEB_CARD, 'IMMUTABLE', { url }),
    editorState
  );
}
