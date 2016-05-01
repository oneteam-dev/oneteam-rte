import getCurrentBlockType from './getCurrentBlockType';

export default function isCurrentBlockType(editorState, type) {
  return getCurrentBlockType(editorState) === type;
}
