import { EditorState } from 'draft-js';
import { htmlToContent } from '../encoding';
export default function createEditorState(html) {
  var decorator = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
  var options = arguments.length > 2 ? arguments[2] : undefined;
  return html ? EditorState.createWithContent(htmlToContent(html, undefined, options), decorator) : EditorState.createEmpty(decorator);
}