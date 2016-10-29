'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _oneteamRteUtils = require('oneteam-rte-utils');

var _Link = require('./Link');

var _Link2 = _interopRequireDefault(_Link);

var _createFindEntitiesBy = require('../utils/createFindEntitiesBy');

var _createFindEntitiesBy2 = _interopRequireDefault(_createFindEntitiesBy);

var _findWithRegex = require('../utils/findWithRegex');

var _findWithRegex2 = _interopRequireDefault(_findWithRegex);

var _urlRegex = require('../helpers/urlRegex');

var _urlRegex2 = _interopRequireDefault(_urlRegex);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var findLinkEntity = (0, _createFindEntitiesBy2.default)(_oneteamRteUtils.ENTITY_TYPES.LINK);

var _default = {
  strategy: function strategy(contentBlock, callback) {
    findLinkEntity(contentBlock, callback);
    (0, _findWithRegex2.default)(_urlRegex2.default, contentBlock, callback);
  },

  component: _Link2.default
};
exports.default = _default;
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(findLinkEntity, 'findLinkEntity', 'src/decorators/LinkDecorator.js');

  __REACT_HOT_LOADER__.register(_default, 'default', 'src/decorators/LinkDecorator.js');
}();

;