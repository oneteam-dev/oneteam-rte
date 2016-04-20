import { EditorState, RichUtils } from 'draft-js';

export default function removeBlockStyle(editorState) {
  const withoutBlockStyle = RichUtils.tryToRemoveBlockStyle(editorState);
  return withoutBlockStyle ? EditorState.push(
    editorState,
    withoutBlockStyle,
    'change-block-type'
  ) : null;
}
