import { EditorState, SelectionState, Modifier } from 'draft-js';
import getCurrentBlock from '../utils/getCurrentBlock';

export default function replaceTextToBlock(editorState, text) {
  // const selection = editorState.getSelection();
  const content = editorState.getCurrentContent();
  const block = getCurrentBlock(editorState);
  // const blockMap = editorState.getCurrentContent().getBlockMap();
  const key = block.getKey();
  const length = block.getLength();
  const newSelection = new SelectionState({
    anchorKey: key,
    anchorOffset: 0,
    focusKey: key,
    focusOffset: length
  });
  // let n = EditorState.acceptSelection(editorState, newSelection);

  const newContent = Modifier.replaceText(
    content,
    newSelection,
    text,
    editorState.getCurrentInlineStyle()
  );
  return EditorState.push(
    editorState,
    newContent,
    'insert-characters'
  );
}
