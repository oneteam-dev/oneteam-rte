'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = insertWebCards;

var _oneteamRteUtils = require('oneteam-rte-utils');

var _insertAtomicBlock = require('./insertAtomicBlock');

var _insertAtomicBlock2 = _interopRequireDefault(_insertAtomicBlock);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @param {EditorState} editorState
 * @param {String[]} urls
 * @returns {EditorState}
 */
function insertWebCards(editorState, urls) {
  return urls.reduce(function (state, url) {
    return (0, _insertAtomicBlock2.default)(state, _oneteamRteUtils.ENTITY_TYPES.WEB_CARD, 'IMMUTABLE', { url: url });
  }, editorState);
}
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(insertWebCards, 'insertWebCards', 'src/functions/insertWebCards.js');
}();

;