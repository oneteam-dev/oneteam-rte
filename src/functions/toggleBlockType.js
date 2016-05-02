import { RichUtils } from 'draft-js';

export default function toggleBlockType(editorState, blockType) {
  return RichUtils.toggleBlockType(editorState, blockType);
}
