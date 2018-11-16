import getCurrentBlockType from './getCurrentBlockType';
export default function checkCurrentBlockType(editorState, type) {
  return getCurrentBlockType(editorState) === type;
}