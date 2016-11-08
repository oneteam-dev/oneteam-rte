import { EditorState } from 'draft-js';
import adjustBlockDepthForContentState from 'draft-js/lib/adjustBlockDepthForContentState';
import { MAX_LIST_DEPTH } from 'oneteam-rte-constants';

export default function adjustBlockDepth(editorState, currentContent, selection, adjustment) {
  const withAdjustment = adjustBlockDepthForContentState(
    currentContent,
    selection,
    adjustment,
    MAX_LIST_DEPTH
  );
  return EditorState.push(editorState, withAdjustment, 'adjust-depth');
}
