import { Entity, AtomicBlockUtils } from 'draft-js';

export default function insertAtomicBlock(editorState, entityType, mutability, data) {
  const entityKey = Entity.create(entityType, mutability, data);
  return AtomicBlockUtils.insertAtomicBlock(
    editorState,
    entityKey,
    ' '
  );
}
