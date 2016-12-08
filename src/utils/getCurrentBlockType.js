import getCurrentBlock from './getCurrentBlock';

export default function getCurrentBlockType(editorState) {
  return getCurrentBlock(editorState).getType();
}
