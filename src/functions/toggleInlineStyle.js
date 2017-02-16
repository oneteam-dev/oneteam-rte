import toggleInlineStyle from 'draft-js-oneteam-rte-plugin/lib/modifiers/toggleInlineStyle';

export default function wrappedToggleInlineStyle(editorState, inlineStyle) {
  return toggleInlineStyle(editorState, inlineStyle);
}
