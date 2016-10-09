import { EditorState } from 'draft-js';

export default function moveSelectionTo(editorState, targetBlock, offset0 = false) {
  if (!targetBlock) return null;

  const contentState = editorState.getCurrentContent();
  const selection = editorState.getSelection();
  const targetKey = targetBlock.getKey();
  const targetLength = offset0 ? 0 : targetBlock.getLength();

  // Move the focus offset to the end of the previous line
  let selectionChanges = {
    focusKey: targetKey,
    focusOffset: targetLength
  };

  // If the selection is collapsed, keep it collapsed by also moving the anchor
  if (selection.isCollapsed()) {
    selectionChanges = {
      ...selectionChanges,
      anchorKey: targetKey,
      anchorOffset: targetLength
    };
  }

  const nextSelection = selection.merge(selectionChanges);

  // Update the selection state.
  const updatedEditorState = EditorState.forceSelection(editorState, nextSelection);
  return EditorState.push(updatedEditorState, contentState, 'move-selection-to-target-block');
}
