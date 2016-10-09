import { BLOCK_TYPES } from 'oneteam-rte-utils';

export default function createCheckedState(blocksAsArray) {
  return blocksAsArray.reduce((result, block) => {
    if (block.getType() === BLOCK_TYPES.CHECKABLE_LIST_ITEM) {
      result[block.getKey()] = block.getChecked();
    }
    return result;
  }, {});
}
