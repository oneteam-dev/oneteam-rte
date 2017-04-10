import merge from 'lodash/merge';
import { emojioneList } from 'emojione';
import createOneteamRTEPlugin from 'draft-js-oneteam-rte-plugin';
import createLinkifyPlugin from 'draft-js-linkify-plugin';
import createBlockBreakoutPlugin from 'draft-js-block-breakout-plugin';
import createMarkdownShortcutsPlugin from 'draft-js-markdown-shortcuts-plugin';
import createCheckableListPlugin from 'draft-js-checkable-list-plugin';
import createEmojiPlugin from 'draft-js-emoji-plugin';
import prismPlugin from './prism';
import createEmojiListWithOutHighPriorityList from './helpers/createEmojiListWithOutHighPriorityList';

const defaultConfig = {
  oneteamRTE: {},
  blockBreakout: {
    breakoutBlocks: [
      'header-one', 'header-two', 'header-three', 'header-four', 'header-five', 'header-six'
    ]
  },
  markdownShortcuts: {},
  checkableList: { sameWrapperAsUnorderedListItem: true },
  linkify: {},
  emoji: {
    highPriorityShortnames: [],
    priorityList: Object.keys(emojioneList)
      .filter(key => !/_tone[0-9]$/.test(key)) // without tones
      .reduce((ret, key) => ({ ...ret, [key]: emojioneList[key].unicode }), {})
  }
};

const createPlugins = (configs) => {
  const config = merge({}, defaultConfig, configs);
  config.emoji.priorityList = createEmojiListWithOutHighPriorityList(
    config.emoji.highPriorityShortnames,
    config.emoji.priorityList
  );
  const oneteamRTEPlugin = createOneteamRTEPlugin(config.oneteamRTE);
  const blockBreakoutPlugin = createBlockBreakoutPlugin(config.blockBreakout);
  const markdownShortcutsPlugin = createMarkdownShortcutsPlugin(config.markdownShortcuts);
  const checkableListPlugin = createCheckableListPlugin(config.checkableList);
  const linkifyPlugin = createLinkifyPlugin(config.linkify);
  const emojiPlugin = createEmojiPlugin(config.emoji);

  // TODO: It becomes a block when pasting html containing `<code>`
  // https://github.com/ngs/draft-js-markdown-shortcuts-plugin/blob/28c6479ec137146a1bf8dedac6fae42c651fcf43/src/index.js#L24
  // I think that should be corrected like this
  // `blockRenderMap: checkboxBlockRenderMap`
  delete markdownShortcutsPlugin.blockRenderMap;

  return {
    all: [
      oneteamRTEPlugin,
      blockBreakoutPlugin,
      markdownShortcutsPlugin,
      checkableListPlugin,
      linkifyPlugin,
      prismPlugin,
      emojiPlugin
    ],
    oneteamRTEPlugin,
    emojiPlugin
  };
}

export default createPlugins;
