export default function findNextBlock(contentState, blockKey, predicate) {
  const block = contentState.getBlockAfter(blockKey);
  return !block ? null : predicate(block) ? block : findNextBlock(contentState, block.getKey(), predicate)
}
