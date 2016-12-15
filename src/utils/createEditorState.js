import { EditorState } from 'draft-js';
import { htmlToContent } from '../encoding';

export default function createEditorState(html, decorator = null) {
  return html ?
    EditorState.createWithContent(
      htmlToContent(html),
      decorator
    ) :
    EditorState.createEmpty(decorator);
}
