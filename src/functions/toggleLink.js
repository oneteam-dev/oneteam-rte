import { Entity, RichUtils } from 'draft-js';
import { LINK } from 'draft-js-oneteam-rte-plugin/lib/constants'

export default function toggleLink(editorState, url = null) {
  const selection = editorState.getSelection();
  if (selection.isCollapsed()) {
    return editorState;
  }
  const entityKey = url ? Entity.create(LINK, 'MUTABLE', { url }) : null;
  return RichUtils.toggleLink(editorState, selection, entityKey);
}
