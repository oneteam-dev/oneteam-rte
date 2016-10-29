'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = adjustBlockDepth;

var _draftJs = require('draft-js');

var _adjustBlockDepthForContentState = require('draft-js/lib/adjustBlockDepthForContentState');

var _adjustBlockDepthForContentState2 = _interopRequireDefault(_adjustBlockDepthForContentState);

var _oneteamRteUtils = require('oneteam-rte-utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function adjustBlockDepth(editorState, currentContent, selection, adjustment) {
  var withAdjustment = (0, _adjustBlockDepthForContentState2.default)(currentContent, selection, adjustment, _oneteamRteUtils.MAX_LIST_DEPTH);
  return _draftJs.EditorState.push(editorState, withAdjustment, 'adjust-depth');
}
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(adjustBlockDepth, 'adjustBlockDepth', 'src/functions/adjustBlockDepth.js');
}();

;