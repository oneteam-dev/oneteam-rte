import { stateToHTML } from 'draft-js-export-html';

export default function getHTML(editorState, checkedState) {
  const contentState = editorState.getCurrentContent();
  return stateToHTML(contentState, checkedState);
}
