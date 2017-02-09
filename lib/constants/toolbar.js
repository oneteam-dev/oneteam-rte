'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _INSERT_IMAGE$UPLOAD_;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var INSERT_IMAGE = exports.INSERT_IMAGE = 'INSERT_IMAGE';
var UPLOAD_FILE = exports.UPLOAD_FILE = 'UPLOAD_FILE';
var EMBED_IFRAME = exports.EMBED_IFRAME = 'EMBED_IFRAME';
var INSERT_LINK = exports.INSERT_LINK = 'INSERT_LINK';
var REMOVE_LINK = exports.REMOVE_LINK = 'REMOVE_LINK';
var DIVIDER = exports.DIVIDER = 'DIVIDER';
var HEADING = exports.HEADING = 'HEADING';
var BOLD = exports.BOLD = 'BOLD';
var ITALIC = exports.ITALIC = 'ITALIC';
var STRIKETHROUGH = exports.STRIKETHROUGH = 'STRIKETHROUGH';
var BLOCKQUOTE = exports.BLOCKQUOTE = 'BLOCKQUOTE';
var CHECKABLE_LIST = exports.CHECKABLE_LIST = 'CHECKABLE_LIST';
var UNOERDERD_LIST = exports.UNOERDERD_LIST = 'UNOERDERD_LIST';
var OERDERD_LIST = exports.OERDERD_LIST = 'OERDERD_LIST';
var CODE_BLOCK = exports.CODE_BLOCK = 'CODE_BLOCK';
var CODE = exports.CODE = 'CODE';

exports.default = (_INSERT_IMAGE$UPLOAD_ = {}, _defineProperty(_INSERT_IMAGE$UPLOAD_, INSERT_IMAGE, {
  description: 'Insert image',
  iconNode: 'Insert image'
}), _defineProperty(_INSERT_IMAGE$UPLOAD_, UPLOAD_FILE, {
  description: 'Upload file',
  iconNode: 'Upload file'
}), _defineProperty(_INSERT_IMAGE$UPLOAD_, EMBED_IFRAME, {
  description: 'Embed iframe',
  iconNode: 'Embed iframe'
}), _defineProperty(_INSERT_IMAGE$UPLOAD_, INSERT_LINK, {
  description: 'Insert link',
  iconNode: 'Insert link',
  validationErrorMessage: 'Error',
  placeholder: 'url here...'
}), _defineProperty(_INSERT_IMAGE$UPLOAD_, REMOVE_LINK, {
  description: 'Remove link',
  iconNode: 'Remove link'
}), _defineProperty(_INSERT_IMAGE$UPLOAD_, HEADING, {
  description: null,
  name: 'Heading',
  closeButtonNode: 'x'
}), _defineProperty(_INSERT_IMAGE$UPLOAD_, BOLD, {
  description: 'Bold',
  iconNode: 'Bold'
}), _defineProperty(_INSERT_IMAGE$UPLOAD_, ITALIC, {
  description: 'Italic',
  iconNode: 'Italic'
}), _defineProperty(_INSERT_IMAGE$UPLOAD_, STRIKETHROUGH, {
  description: 'Strikethrough',
  iconNode: 'Strikethrough'
}), _defineProperty(_INSERT_IMAGE$UPLOAD_, BLOCKQUOTE, {
  description: 'Blockquote',
  iconNode: 'Blockquote'
}), _defineProperty(_INSERT_IMAGE$UPLOAD_, CHECKABLE_LIST, {
  description: 'Check box',
  iconNode: 'Check box'
}), _defineProperty(_INSERT_IMAGE$UPLOAD_, UNOERDERD_LIST, {
  description: 'Unoerderd list',
  iconNode: 'Unoerderd list'
}), _defineProperty(_INSERT_IMAGE$UPLOAD_, OERDERD_LIST, {
  description: 'Oerderd list',
  iconNode: 'Oerderd list'
}), _defineProperty(_INSERT_IMAGE$UPLOAD_, CODE_BLOCK, {
  description: 'Code block',
  iconNode: 'Code block'
}), _defineProperty(_INSERT_IMAGE$UPLOAD_, CODE, {
  description: 'Inline code',
  iconNode: 'Inline code'
}), _INSERT_IMAGE$UPLOAD_);