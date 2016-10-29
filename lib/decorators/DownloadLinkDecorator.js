'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _oneteamRteUtils = require('oneteam-rte-utils');

var _createFindEntitiesBy = require('../utils/createFindEntitiesBy');

var _createFindEntitiesBy2 = _interopRequireDefault(_createFindEntitiesBy);

var _DownloadLink = require('./DownloadLink');

var _DownloadLink2 = _interopRequireDefault(_DownloadLink);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = {
  strategy: (0, _createFindEntitiesBy2.default)(_oneteamRteUtils.ENTITY_TYPES.DOWNLOAD_LINK),
  component: _DownloadLink2.default
};
exports.default = _default;
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(_default, 'default', 'src/decorators/DownloadLinkDecorator.js');
}();

;