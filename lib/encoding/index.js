'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.htmlToContent = exports.contentToHTML = exports.markdownToHTML = exports.htmlToMarkdown = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _emojione = require('emojione');

var _emojione2 = _interopRequireDefault(_emojione);

var _convertHTMLToContentState = require('draft-js-oneteam-rte-plugin/lib/encoding/convertHTMLToContentState');

var _convertHTMLToContentState2 = _interopRequireDefault(_convertHTMLToContentState);

var _convertContentStateToHTML = require('draft-js-oneteam-rte-plugin/lib/encoding/convertContentStateToHTML');

var _convertContentStateToHTML2 = _interopRequireDefault(_convertContentStateToHTML);

var _htmlToMarkdown = require('draft-js-oneteam-rte-plugin/lib/encoding/htmlToMarkdown');

var _htmlToMarkdown2 = _interopRequireDefault(_htmlToMarkdown);

var _markdownToHTML = require('draft-js-oneteam-rte-plugin/lib/encoding/markdownToHTML');

var _markdownToHTML2 = _interopRequireDefault(_markdownToHTML);

var _createToContentOptions = require('./helpers/createToContentOptions');

var _createToContentOptions2 = _interopRequireDefault(_createToContentOptions);

var _normalizeContentState = require('./helpers/normalizeContentState');

var _normalizeContentState2 = _interopRequireDefault(_normalizeContentState);

var _mention = require('../plugins/mention');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var htmlToMarkdown = function htmlToMarkdown(html) {
  return (0, _htmlToMarkdown2.default)(html);
};

var markdownToHTML = function markdownToHTML(md) {
  return (0, _markdownToHTML2.default)(md);
};

var defaultToHTMLOptions = {
  entityRenderers: _defineProperty({}, _mention.entityType, function (entity) {
    var _entity$getData = entity.getData(),
        mention = _entity$getData.mention;

    var name = mention.get('userName') || mention.get('groupName');
    return '@' + name;
  })
};

var contentToHTML = function contentToHTML(content, options) {
  return _emojione2.default.toShort((0, _convertContentStateToHTML2.default)(content, _extends({}, defaultToHTMLOptions, options)));
};

var htmlToContent = function htmlToContent(html, DOMBuilder, options) {
  var content = (0, _convertHTMLToContentState2.default)(_emojione2.default.shortnameToUnicode(html), DOMBuilder, (0, _createToContentOptions2.default)(options));
  return (0, _normalizeContentState2.default)(content);
};

exports.htmlToMarkdown = htmlToMarkdown;
exports.markdownToHTML = markdownToHTML;
exports.contentToHTML = contentToHTML;
exports.htmlToContent = htmlToContent;