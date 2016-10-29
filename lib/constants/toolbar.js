'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _default2;

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

var _default = (_default2 = {}, _defineProperty(_default2, INSERT_IMAGE, {
  description: 'Insert image',
  iconNode: 'Insert image'
}), _defineProperty(_default2, UPLOAD_FILE, {
  description: 'Upload file',
  iconNode: 'Upload file'
}), _defineProperty(_default2, EMBED_IFRAME, {
  description: 'Embed iframe',
  iconNode: 'Embed iframe'
}), _defineProperty(_default2, INSERT_LINK, {
  description: 'Insert link',
  iconNode: 'Insert link',
  validationErrorMessage: 'Error',
  placeholder: 'url here...'
}), _defineProperty(_default2, REMOVE_LINK, {
  description: 'Remove link',
  iconNode: 'Remove link'
}), _defineProperty(_default2, HEADING, {
  description: null,
  name: 'Heading',
  closeButtonNode: 'x'
}), _defineProperty(_default2, BOLD, {
  description: 'Bold',
  iconNode: 'Bold'
}), _defineProperty(_default2, ITALIC, {
  description: 'Italic',
  iconNode: 'Italic'
}), _defineProperty(_default2, STRIKETHROUGH, {
  description: 'Strikethrough',
  iconNode: 'Strikethrough'
}), _defineProperty(_default2, BLOCKQUOTE, {
  description: 'Blockquote',
  iconNode: 'Blockquote'
}), _defineProperty(_default2, CHECKABLE_LIST, {
  description: 'Check box',
  iconNode: 'Check box'
}), _defineProperty(_default2, UNOERDERD_LIST, {
  description: 'Unoerderd list',
  iconNode: 'Unoerderd list'
}), _defineProperty(_default2, OERDERD_LIST, {
  description: 'Oerderd list',
  iconNode: 'Oerderd list'
}), _default2);

exports.default = _default;
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(INSERT_IMAGE, 'INSERT_IMAGE', 'src/constants/toolbar.js');

  __REACT_HOT_LOADER__.register(UPLOAD_FILE, 'UPLOAD_FILE', 'src/constants/toolbar.js');

  __REACT_HOT_LOADER__.register(EMBED_IFRAME, 'EMBED_IFRAME', 'src/constants/toolbar.js');

  __REACT_HOT_LOADER__.register(INSERT_LINK, 'INSERT_LINK', 'src/constants/toolbar.js');

  __REACT_HOT_LOADER__.register(REMOVE_LINK, 'REMOVE_LINK', 'src/constants/toolbar.js');

  __REACT_HOT_LOADER__.register(DIVIDER, 'DIVIDER', 'src/constants/toolbar.js');

  __REACT_HOT_LOADER__.register(HEADING, 'HEADING', 'src/constants/toolbar.js');

  __REACT_HOT_LOADER__.register(BOLD, 'BOLD', 'src/constants/toolbar.js');

  __REACT_HOT_LOADER__.register(ITALIC, 'ITALIC', 'src/constants/toolbar.js');

  __REACT_HOT_LOADER__.register(STRIKETHROUGH, 'STRIKETHROUGH', 'src/constants/toolbar.js');

  __REACT_HOT_LOADER__.register(BLOCKQUOTE, 'BLOCKQUOTE', 'src/constants/toolbar.js');

  __REACT_HOT_LOADER__.register(CHECKABLE_LIST, 'CHECKABLE_LIST', 'src/constants/toolbar.js');

  __REACT_HOT_LOADER__.register(UNOERDERD_LIST, 'UNOERDERD_LIST', 'src/constants/toolbar.js');

  __REACT_HOT_LOADER__.register(OERDERD_LIST, 'OERDERD_LIST', 'src/constants/toolbar.js');

  __REACT_HOT_LOADER__.register(_default, 'default', 'src/constants/toolbar.js');
}();

;