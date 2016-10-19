import { Entity, AtomicBlockUtils } from 'draft-js';

/**
 * @param {EditorState} editorState
 * @param {String} entityType
 * @param {String} mutability `IMMUTABLE`, `MUTABLE` or `SEGMENTED`
 * @param {Object} data
 * @param {String} character [character = ' ']
 * @returns {EditorState}
 */
export default function insertAtomicBlock(editorState, entityType, mutability, data, character = ' ') {
  const entityKey = Entity.create(entityType, mutability, data);
  return AtomicBlockUtils.insertAtomicBlock(
    editorState,
    entityKey,
    character
  );
}
