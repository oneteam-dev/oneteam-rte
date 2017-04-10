'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = wrappedToggleInlineStyle;

var _toggleInlineStyle = require('draft-js-oneteam-rte-plugin/lib/modifiers/toggleInlineStyle');

var _toggleInlineStyle2 = _interopRequireDefault(_toggleInlineStyle);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function wrappedToggleInlineStyle(editorState, inlineStyle) {
  return (0, _toggleInlineStyle2.default)(editorState, inlineStyle);
}