/**
 * @param {SelectionState} selection
 * @returns {Boolean}
 */
export default function isCursorAtStart(selection) {
  return selection.getStartOffset() === 0;
}
