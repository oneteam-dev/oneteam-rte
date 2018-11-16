function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import emojione from 'emojione';
import convertHTMLToContentState from 'draft-js-oneteam-rte-plugin/lib/encoding/convertHTMLToContentState';
import convertContentStateToHTML from 'draft-js-oneteam-rte-plugin/lib/encoding/convertContentStateToHTML';
import convertHTMLToMarkdown from 'draft-js-oneteam-rte-plugin/lib/encoding/htmlToMarkdown';
import convertMarkdownToHTML from 'draft-js-oneteam-rte-plugin/lib/encoding/markdownToHTML';
import editExceptOuterLink from 'draft-js-oneteam-rte-plugin/lib/utils/editExceptOuterLink';
import createToContentOptions from './helpers/createToContentOptions';
import normalizeContentState from './helpers/normalizeContentState';
import { entityType as mentionEntityType } from '../plugins/mention';

var htmlToMarkdown = function htmlToMarkdown(html) {
  return convertHTMLToMarkdown(html);
};

var markdownToHTML = function markdownToHTML(md) {
  return convertMarkdownToHTML(md);
};

var defaultToHTMLOptions = {
  entityRenderers: _defineProperty({}, mentionEntityType, function (entity) {
    var _entity$getData = entity.getData(),
        mention = _entity$getData.mention;

    var name = mention.userName || mention.groupName;
    return "@".concat(name);
  })
};

var contentToHTML = function contentToHTML(content, options) {
  return emojione.toShort(convertContentStateToHTML(content, _extends({}, defaultToHTMLOptions, options)));
};

var htmlToContent = function htmlToContent(html, DOMBuilder, options) {
  var content = convertHTMLToContentState(editExceptOuterLink({
    string: html,
    fn: emojione.shortnameToUnicode
  }), DOMBuilder, createToContentOptions(options));
  return normalizeContentState(content);
};

export { htmlToMarkdown, markdownToHTML, contentToHTML, htmlToContent };