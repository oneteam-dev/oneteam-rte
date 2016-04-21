'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = findLinkEntities;

var _draftJs = require('draft-js');

var _constants = require('../constants');

function findLinkEntities(contentBlock, callback) {
  contentBlock.findEntityRanges(function (character) {
    var entityKey = character.getEntity();
    return entityKey !== null && _draftJs.Entity.get(entityKey).getType() === _constants.ENTITY_TYPES.LINK;
  }, callback);
}