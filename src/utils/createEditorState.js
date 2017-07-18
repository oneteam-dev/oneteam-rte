import { EditorState } from 'draft-js';
import { htmlToContent } from '../encoding';

export default function createEditorState(html, decorator = null, options) {
  return html ?
    EditorState.createWithContent(
      htmlToContent(html, undefined, options),
      decorator
    ) :
    EditorState.createEmpty(decorator);
}
