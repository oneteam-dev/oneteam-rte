export default function findPreviousBlock(contentState, blockKey, predicate) {
  const block = contentState.getBlockBefore(blockKey);
  return !block ? null : predicate(block) ? block : findPreviousBlock(contentState, block.getKey(), predicate)
}
