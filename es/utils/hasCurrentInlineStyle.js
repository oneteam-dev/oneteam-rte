export default function hasCurrentInlineStyle(editorState, type) {
  return editorState.getCurrentInlineStyle().has(type);
}