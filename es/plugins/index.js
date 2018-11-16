import merge from 'lodash/merge';
import createOneteamRTEPlugin from 'draft-js-oneteam-rte-plugin';
import createLinkifyPlugin from 'draft-js-linkify-plugin';
import createBlockBreakoutPlugin from 'draft-js-block-breakout-plugin';
import createMarkdownShortcutsPlugin from 'draft-js-markdown-shortcuts-plugin';
import createCheckableListPlugin from 'draft-js-checkable-list-plugin';
import createEmojiPlugin from '@sugarshin/draft-js-emoji-plugin';
import createMentionPlugin from './mention';
import createPrismPlugin from './prism';
import Link from '../components/Link';
var defaultConfig = {
  oneteamRTE: {},
  blockBreakout: {
    breakoutBlocks: ['header-one', 'header-two', 'header-three', 'header-four', 'header-five', 'header-six']
  },
  markdownShortcuts: {
    insertEmptyBlockOnReturnWithModifierKey: false
  },
  checkableList: {
    sameWrapperAsUnorderedListItem: true
  },
  linkify: {
    component: Link
  },
  // TODO: this is maybe draft-js-emoji-plugin or draft-js issue
  // https://github.com/draft-js-plugins/draft-js-plugins/issues/717
  //                                          \
  emoji: {
    ignoreEmojiRegex: /(_?tone[0-9]:$|^:(one|two|three|four|five|six|seven|eight|nine|zero):$)/
  },
  prism: {},
  mention: {}
};

var createPlugins = function createPlugins(configs) {
  var config = merge({}, defaultConfig, configs);
  var oneteamRTEPlugin = createOneteamRTEPlugin(config.oneteamRTE);
  var blockBreakoutPlugin = createBlockBreakoutPlugin(config.blockBreakout);
  var markdownShortcutsPlugin = createMarkdownShortcutsPlugin(config.markdownShortcuts);
  var checkableListPlugin = createCheckableListPlugin(config.checkableList);
  var linkifyPlugin = createLinkifyPlugin(config.linkify);
  var emojiPlugin = createEmojiPlugin(config.emoji);
  var prismPlugin = createPrismPlugin(config.prism);
  var mentionPlugin = createMentionPlugin(config.mention); // TODO: It becomes a block when pasting html containing `<code>`
  // https://github.com/ngs/draft-js-markdown-shortcuts-plugin/blob/28c6479ec137146a1bf8dedac6fae42c651fcf43/src/index.js#L24
  // I think that should be corrected like this
  // `blockRenderMap: checkboxBlockRenderMap`

  delete markdownShortcutsPlugin.blockRenderMap; // TODO: Temporarily disable it, because there has a bug.

  delete markdownShortcutsPlugin.handlePastedText;
  return {
    all: [oneteamRTEPlugin, blockBreakoutPlugin, markdownShortcutsPlugin, checkableListPlugin, linkifyPlugin, prismPlugin, emojiPlugin, mentionPlugin],
    oneteamRTEPlugin: oneteamRTEPlugin,
    emojiPlugin: emojiPlugin,
    mentionPlugin: mentionPlugin
  };
};

export default createPlugins;