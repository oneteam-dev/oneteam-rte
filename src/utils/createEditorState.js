import { EditorState, ContentState } from 'draft-js';
import convertFromHTML from 'oneteam-rte-converter/lib/convertFromHTML';

export default function createEditorState(htmlString, decorator = null) {
  return htmlString ?
    EditorState.createWithContent(
      ContentState.createFromBlockArray(convertFromHTML(htmlString)),
      decorator
    ) :
    EditorState.createEmpty(decorator);
}
