import { Entity, RichUtils } from 'draft-js';
import { ENTITY_TYPES } from 'oneteam-rte-utils'

export default function toggleLink(editorState, url = null) {
  const selection = editorState.getSelection();
  if (selection.isCollapsed()) {
    return editorState;
  }
  const entityKey = url ? Entity.create(ENTITY_TYPES.LINK, 'MUTABLE', { url }) : null;
  return RichUtils.toggleLink(editorState, selection, entityKey);
}
