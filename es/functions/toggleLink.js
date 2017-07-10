import toggleLink from 'draft-js-oneteam-rte-plugin/lib/modifiers/toggleLink';

export default function wrappedToggleLink(editorState, url) {
  return toggleLink(editorState, url);
}