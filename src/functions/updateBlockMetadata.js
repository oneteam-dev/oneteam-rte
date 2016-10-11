import { EditorState } from 'draft-js';

/**
 * @param {EditorState} editorState
 * @param {String} blockKey
 * @param {} metadata
 * @returns {EditorState} New editorState.
 */
export default function updateBlockMetadata(editorState, blockKey, metadata) {
  const contentState = editorState.getCurrentContent();
  const updatedBlock = contentState
    .getBlockForKey(blockKey)
    .mergeIn(['data'], metadata);
  const blockMap = contentState.getBlockMap().merge({ [blockKey]: updatedBlock });
  return EditorState.push(editorState, contentState.merge({ blockMap }), 'metadata-update');
}
