import { EditorState, Entity } from 'draft-js';

/**
 * @param {EditorState} editorState
 * @param {string} entityKey
 * @param {*} data
 * @returns {EditorState} Next `editorState`
 */
export default function mergeEntityData(editorState, entityKey, data) {
  Entity.mergeData(entityKey, data);
  // `Entity.mergeData` does not mutate contentState in any way
  // https://github.com/facebook/draft-js/issues/399
  // `EditorState.forceSelection` will be forcibly focus on the editor
  return EditorState.createWithContent(editorState.getCurrentContent(), editorState.getDecorator());
}
