'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _immutable = require('immutable');

var _draftJs = require('draft-js');

var _constants = require('draft-js-oneteam-rte-plugin/lib/constants');

// NOTE: add an empty block behind because will be impossible to edit if only atomic blocks
var normalizeContentState = function normalizeContentState(content) {
  var blockMap = content.getBlockMap().toList().reduce(function (orderedMap, block, i, list) {
    if (block.getType() === _constants.ATOMIC) {
      var next = list.get(i + 1);
      if (!next || next.getType() === _constants.ATOMIC) {
        var key = (0, _draftJs.genKey)();
        return orderedMap.set(block.getKey(), block).set(key, new _draftJs.ContentBlock({ key: key }));
      }
    }
    return orderedMap.set(block.getKey(), block);
  }, (0, _immutable.OrderedMap)());
  return content.merge({ blockMap: blockMap });
};

exports.default = normalizeContentState;