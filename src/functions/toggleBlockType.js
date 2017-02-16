import toggleBlockType from 'draft-js-oneteam-rte-plugin/lib/modifiers/toggleBlockType';

export default function wrappedToggleBlockType(editorState, blockType) {
  return toggleBlockType(editorState, blockType);
}
