import { RichUtils } from 'draft-js';
export default function getCurrentBlockType(editorState) {
  return RichUtils.getCurrentBlockType(editorState);
}