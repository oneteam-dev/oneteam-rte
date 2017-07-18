import { OrderedMap } from 'immutable';
import { ContentBlock, genKey } from 'draft-js';
import { ATOMIC } from 'draft-js-oneteam-rte-plugin/lib/constants';

// NOTE: add an empty block behind because will be impossible to edit if only atomic blocks
const normalizeContentState = content => {
  const blockMap = content.getBlockMap().toList().reduce((orderedMap, block, i, list) => {
    if (block.getType() === ATOMIC) {
      const next = list.get(i + 1);
      if (!next || next.getType() === ATOMIC) {
        const key = genKey();
        return orderedMap.set(block.getKey(), block).set(key, new ContentBlock({ key }));
      }
    }
    return orderedMap.set(block.getKey(), block);
  }, OrderedMap());
  return content.merge({ blockMap });
};

export default normalizeContentState;
