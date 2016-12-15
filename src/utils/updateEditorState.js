import { EditorState, ContentState } from 'draft-js';
import convertFromHTML from 'oneteam-rte-converter/lib/convertFromHTML';

export default function updateEditorState(editorState, html) {
  return EditorState.push(
    editorState,
    ContentState.createFromBlockArray(convertFromHTML(html))
  );
}
