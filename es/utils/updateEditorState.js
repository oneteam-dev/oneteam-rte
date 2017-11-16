import { EditorState } from 'draft-js';
import { htmlToContent } from '../encoding';

export default function updateEditorState(editorState, html, mentionSuggestions) {
  return EditorState.push(editorState, htmlToContent(html, undefined, // NOTE: use default DOMBuilder
  { mentions: mentionSuggestions }));
}