import { BLOCK_TYPES } from 'oneteam-rte-constants';

export default function isListItem(block) {
  const blockType = block.getType();
  return (
    blockType === BLOCK_TYPES.UNORDERED_LIST_ITEM ||
    blockType === BLOCK_TYPES.ORDERED_LIST_ITEM ||
    blockType === BLOCK_TYPES.CHECKABLE_LIST_ITEM
  );
}
