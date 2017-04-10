'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.htmlToContent = exports.contentToHTML = exports.markdownToHTML = exports.htmlToMarkdown = undefined;

var _convertHTMLToContentState = require('draft-js-oneteam-rte-plugin/lib/encoding/convertHTMLToContentState');

var _convertHTMLToContentState2 = _interopRequireDefault(_convertHTMLToContentState);

var _convertContentStateToHTML = require('draft-js-oneteam-rte-plugin/lib/encoding/convertContentStateToHTML');

var _convertContentStateToHTML2 = _interopRequireDefault(_convertContentStateToHTML);

var _htmlToMarkdown = require('draft-js-oneteam-rte-plugin/lib/encoding/htmlToMarkdown');

var _htmlToMarkdown2 = _interopRequireDefault(_htmlToMarkdown);

var _markdownToHTML = require('draft-js-oneteam-rte-plugin/lib/encoding/markdownToHTML');

var _markdownToHTML2 = _interopRequireDefault(_markdownToHTML);

var _emojione = require('emojione');

var _emojione2 = _interopRequireDefault(_emojione);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var htmlToMarkdown = function htmlToMarkdown(html) {
  return (0, _htmlToMarkdown2.default)(html);
};

var markdownToHTML = function markdownToHTML(md) {
  return (0, _markdownToHTML2.default)(md);
};

var contentToHTML = function contentToHTML(content, options) {
  return (0, _convertContentStateToHTML2.default)(content, options);
};

var htmlToContent = function htmlToContent(html, DOMBuilder) {
  return (0, _convertHTMLToContentState2.default)(_emojione2.default.shortnameToUnicode(html), DOMBuilder);
};

exports.htmlToMarkdown = htmlToMarkdown;
exports.markdownToHTML = markdownToHTML;
exports.contentToHTML = contentToHTML;
exports.htmlToContent = htmlToContent;