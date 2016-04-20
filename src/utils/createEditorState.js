import { EditorState, ContentState, convertFromHTML } from 'draft-js';

export default function createEditorState(htmlString, decorator = null) {
  return htmlString ?
    EditorState.createWithContent(
      ContentState.createFromBlockArray(convertFromHTML(htmlString)),
      decorator
    ) :
    EditorState.createEmpty(decorator);
}
