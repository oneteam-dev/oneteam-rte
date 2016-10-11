import { EditorState, Entity } from 'draft-js';

/**
 * @param {EditorState} editorState
 * @param {String} entityKey
 * @param {} data
 * @returns {EditorState} New editorState.
 */
export default function mergeEntityData(editorState, entityKey, data) {
  Entity.mergeData(entityKey, data);
  // `Entity.mergeData` does not mutate contentState in any way
  // https://github.com/facebook/draft-js/issues/399
  return EditorState.forceSelection(editorState, editorState.getSelection());
}
