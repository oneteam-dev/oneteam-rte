import { EditorState } from 'draft-js';
import { htmlToContent } from '../encoding';

export default function updateEditorState(editorState, html) {
  return EditorState.push(
    editorState,
    htmlToContent(html)
  );
}
