'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var BLOCK_TYPES = exports.BLOCK_TYPES = {
  UNSTYLED: 'unstyled',
  H1: 'header-one',
  H2: 'header-two',
  H3: 'header-three',
  H4: 'header-four',
  H5: 'header-five',
  BLOCKQUOTE: 'blockquote',
  ORDERED_LIST_ITEM: 'ordered-list-item',
  UNORDERED_LIST_ITEM: 'unordered-list-item',
  CHECKABLE_LIST_ITEM: 'checkable-list-item',
  ATOMIC: 'atomic'
};

var INLINE_STYLES = exports.INLINE_STYLES = {
  BOLD: 'BOLD',
  ITALIC: 'ITALIC',
  STRIKETHROUGH: 'STRIKETHROUGH'
};

var ENTITY_TYPES = exports.ENTITY_TYPES = {
  LINK: 'LINK',
  IMAGE: 'IMAGE'
};

var ORDERED_BLOCK_TYPES = exports.ORDERED_BLOCK_TYPES = [BLOCK_TYPES.H1, BLOCK_TYPES.H2, BLOCK_TYPES.H3, BLOCK_TYPES.H4, BLOCK_TYPES.H5, BLOCK_TYPES.BLOCKQUOTE, BLOCK_TYPES.CHECKABLE_LIST_ITEM, BLOCK_TYPES.UNORDERED_LIST_ITEM, BLOCK_TYPES.ORDERED_LIST_ITEM];

var ORDERED_INLINE_STYLES = exports.ORDERED_INLINE_STYLES = [INLINE_STYLES.BOLD, INLINE_STYLES.ITALIC, INLINE_STYLES.STRIKETHROUGH];

var HEADER_BLOCK_TYPES = exports.HEADER_BLOCK_TYPES = [BLOCK_TYPES.H1, BLOCK_TYPES.H2, BLOCK_TYPES.H3, BLOCK_TYPES.H4, BLOCK_TYPES.H5];

var LIST_BLOCK_TYPES = exports.LIST_BLOCK_TYPES = [BLOCK_TYPES.ORDERED_LIST_ITEM, BLOCK_TYPES.UNORDERED_LIST_ITEM, BLOCK_TYPES.CHECKABLE_LIST_ITEM];

var MAX_LIST_DEPTH = exports.MAX_LIST_DEPTH = 4;

var OLD_COLORS = ['rgb(0, 0, 0)', 'rgb(230, 0, 0)', 'rgb(255, 153, 0)', 'rgb(255, 255, 0)', 'rgb(0, 138, 0)', 'rgb(0, 102, 204)', 'rgb(153, 51, 255)', 'rgb(255, 255, 255)', 'rgb(250, 204, 204)', 'rgb(255, 235, 204)', 'rgb(255, 255, 204)', 'rgb(204, 232, 204)', 'rgb(204, 224, 245)', 'rgb(235, 214, 255)', 'rgb(187, 187, 187)', 'rgb(240, 102, 102)', 'rgb(255, 194, 102)', 'rgb(255, 255, 102)', 'rgb(102, 185, 102)', 'rgb(102, 163, 224)', 'rgb(194, 133, 255)', 'rgb(136, 136, 136)', 'rgb(161, 0, 0)', 'rgb(178, 107, 0)', 'rgb(178, 178, 0)', 'rgb(0, 97, 0)', 'rgb(0, 71, 178)', 'rgb(107, 36, 178)', 'rgb(68, 68, 68)', 'rgb(92, 0, 0)', 'rgb(102, 61, 0)', 'rgb(102, 102, 0)', 'rgb(0, 55, 0)', 'rgb(0, 41, 102)', 'rgb(61, 20, 10)'];

var OLD_INLINE_STYLES_SIZE = {
  SIZE_NORMAL: { fontSize: 13 },
  SIZE_SMALLER: { fontSize: 10 },
  SIZE_LARGER: { fontSize: 24 },
  SIZE_HUGE: { fontSize: 32 }
};

var OLD_INLINE_STYLES = exports.OLD_INLINE_STYLES = OLD_COLORS.reduce(function (result, color, i) {
  result['COLOR' + i] = { color: color };
  result['BACKGROUND_COLOR' + i] = { backgroundColor: color };
  return result;
}, OLD_INLINE_STYLES_SIZE);

var OLD_BLOCK_TYPES = exports.OLD_BLOCK_TYPES = {
  ALIGN_CENTER: 'align-center',
  ALIGN_RIGHT: 'align-right',
  ALIGN_JUSTIFY: 'align-justify'
};