export default function isCursorAtEnd(block, selection) {
  return block.getLength() === selection.getStartOffset();
}
