'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = wrappedToggleBlockType;

var _toggleBlockType = require('draft-js-oneteam-rte-plugin/lib/modifiers/toggleBlockType');

var _toggleBlockType2 = _interopRequireDefault(_toggleBlockType);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function wrappedToggleBlockType(editorState, blockType) {
  return (0, _toggleBlockType2.default)(editorState, blockType);
}