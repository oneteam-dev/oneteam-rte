'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = checkCurrentBlockType;

var _getCurrentBlockType = require('./getCurrentBlockType');

var _getCurrentBlockType2 = _interopRequireDefault(_getCurrentBlockType);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function checkCurrentBlockType(editorState, type) {
  return (0, _getCurrentBlockType2.default)(editorState) === type;
}
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(checkCurrentBlockType, 'checkCurrentBlockType', 'src/utils/checkCurrentBlockType.js');
}();

;