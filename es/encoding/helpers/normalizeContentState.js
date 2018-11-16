import { OrderedMap } from 'immutable';
import { ContentBlock, genKey } from 'draft-js';
import { ATOMIC } from 'draft-js-oneteam-rte-plugin/lib/constants'; // NOTE: add an empty block behind because will be impossible to edit if only atomic blocks

var normalizeContentState = function normalizeContentState(content) {
  var blockMap = content.getBlockMap().toList().reduce(function (orderedMap, block, i, list) {
    if (block.getType() === ATOMIC) {
      var next = list.get(i + 1);

      if (!next || next.getType() === ATOMIC) {
        var key = genKey();
        return orderedMap.set(block.getKey(), block).set(key, new ContentBlock({
          key: key
        }));
      }
    }

    return orderedMap.set(block.getKey(), block);
  }, OrderedMap());
  return content.merge({
    blockMap: blockMap
  });
};

export default normalizeContentState;