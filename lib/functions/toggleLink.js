'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = wrappedToggleLink;

var _toggleLink = require('draft-js-oneteam-rte-plugin/lib/modifiers/toggleLink');

var _toggleLink2 = _interopRequireDefault(_toggleLink);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function wrappedToggleLink(editorState, url) {
  return (0, _toggleLink2.default)(editorState, url);
}