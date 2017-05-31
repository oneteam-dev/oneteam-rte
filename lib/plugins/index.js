'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _merge = require('lodash/merge');

var _merge2 = _interopRequireDefault(_merge);

var _draftJsOneteamRtePlugin = require('draft-js-oneteam-rte-plugin');

var _draftJsOneteamRtePlugin2 = _interopRequireDefault(_draftJsOneteamRtePlugin);

var _draftJsLinkifyPlugin = require('draft-js-linkify-plugin');

var _draftJsLinkifyPlugin2 = _interopRequireDefault(_draftJsLinkifyPlugin);

var _draftJsBlockBreakoutPlugin = require('draft-js-block-breakout-plugin');

var _draftJsBlockBreakoutPlugin2 = _interopRequireDefault(_draftJsBlockBreakoutPlugin);

var _draftJsMarkdownShortcutsPlugin = require('draft-js-markdown-shortcuts-plugin');

var _draftJsMarkdownShortcutsPlugin2 = _interopRequireDefault(_draftJsMarkdownShortcutsPlugin);

var _draftJsCheckableListPlugin = require('draft-js-checkable-list-plugin');

var _draftJsCheckableListPlugin2 = _interopRequireDefault(_draftJsCheckableListPlugin);

var _draftJsEmojiPlugin = require('draft-js-emoji-plugin');

var _draftJsEmojiPlugin2 = _interopRequireDefault(_draftJsEmojiPlugin);

var _prism = require('./prism');

var _prism2 = _interopRequireDefault(_prism);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var defaultConfig = {
  oneteamRTE: {},
  blockBreakout: {
    breakoutBlocks: ['header-one', 'header-two', 'header-three', 'header-four', 'header-five', 'header-six']
  },
  markdownShortcuts: {},
  checkableList: { sameWrapperAsUnorderedListItem: true },
  linkify: {},
  // TODO: this is maybe draft-js-emoji-plugin or draft-js issue
  // https://github.com/draft-js-plugins/draft-js-plugins/issues/717
  //                                          \
  emoji: { ignoreEmojiRegex: /(_?tone[0-9]:$|^:(one|two|three|four|five|six|seven|eight|nine|zero):$)/ },
  prism: {}
};

var createPlugins = function createPlugins(configs) {
  var config = (0, _merge2.default)({}, defaultConfig, configs);
  var oneteamRTEPlugin = (0, _draftJsOneteamRtePlugin2.default)(config.oneteamRTE);
  var blockBreakoutPlugin = (0, _draftJsBlockBreakoutPlugin2.default)(config.blockBreakout);
  var markdownShortcutsPlugin = (0, _draftJsMarkdownShortcutsPlugin2.default)(config.markdownShortcuts);
  var checkableListPlugin = (0, _draftJsCheckableListPlugin2.default)(config.checkableList);
  var linkifyPlugin = (0, _draftJsLinkifyPlugin2.default)(config.linkify);
  var emojiPlugin = (0, _draftJsEmojiPlugin2.default)(config.emoji);
  var prismPlugin = (0, _prism2.default)(config.prism);

  // TODO: It becomes a block when pasting html containing `<code>`
  // https://github.com/ngs/draft-js-markdown-shortcuts-plugin/blob/28c6479ec137146a1bf8dedac6fae42c651fcf43/src/index.js#L24
  // I think that should be corrected like this
  // `blockRenderMap: checkboxBlockRenderMap`
  delete markdownShortcutsPlugin.blockRenderMap;

  return {
    all: [oneteamRTEPlugin, blockBreakoutPlugin, markdownShortcutsPlugin, checkableListPlugin, linkifyPlugin, prismPlugin, emojiPlugin],
    oneteamRTEPlugin: oneteamRTEPlugin,
    emojiPlugin: emojiPlugin
  };
};

exports.default = createPlugins;