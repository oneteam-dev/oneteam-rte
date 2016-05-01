import { RichUtils } from 'draft-js';

export default function toggleInlineStyle(editorState, inlineStyle) {
  return RichUtils.toggleInlineStyle(editorState, inlineStyle);
}
