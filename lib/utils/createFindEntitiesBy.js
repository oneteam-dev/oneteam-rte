'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = createFindEntitiesBy;

var _draftJs = require('draft-js');

function createFindEntitiesBy(entityType) {
  return function (contentBlock, callback) {
    contentBlock.findEntityRanges(function (character) {
      var entityKey = character.getEntity();
      return entityKey !== null && _draftJs.Entity.get(entityKey).getType() === entityType;
    }, callback);
  };
}
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(createFindEntitiesBy, 'createFindEntitiesBy', 'src/utils/createFindEntitiesBy.js');
}();

;