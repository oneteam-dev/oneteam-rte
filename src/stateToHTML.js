import { stateToHTML } from 'draft-js-export-html';

export default function editorStateToHTML(editorState, checkedState) {
  const contentState = editorState.getCurrentContent();
  return stateToHTML(contentState, checkedState);
}
