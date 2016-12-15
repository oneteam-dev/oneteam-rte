import merge from 'lodash/merge';
import createOneteamRTEPlugin from 'draft-js-oneteam-rte-plugin';
import createLinkifyPlugin from 'draft-js-linkify-plugin';
import createBlockBreakoutPlugin from 'draft-js-block-breakout-plugin';
import createMarkdownShortcutsPlugin from 'draft-js-markdown-shortcuts-plugin';
import createCheckableListPlugin from 'draft-js-checkable-list-plugin';
import prismPlugin from './prism';

const defaultConfig = {
  oneteamRTE: {},
  blockBreakout: {
    breakoutBlocks: [
      'header-one', 'header-two', 'header-three', 'header-four', 'header-five', 'header-six', 'blockquote'
    ]
  },
  markdownShortcuts: {},
  checkableList: { sameWrapperAsUnorderedListItem: true },
  linkifyPlugin: {}
};

const createPlugins = (configs) => {
  const config = merge({}, defaultConfig, configs);
  const oneteamRTEPlugin = createOneteamRTEPlugin(config.oneteamRTE);
  const blockBreakoutPlugin = createBlockBreakoutPlugin(config.blockBreakout);
  const markdownShortcutsPlugin = createMarkdownShortcutsPlugin(config.markdownShortcuts);
  const checkableListPlugin = createCheckableListPlugin(config.checkableList);
  const linkifyPlugin = createLinkifyPlugin(config.linkifyPlugin);

  return {
    all: [
      oneteamRTEPlugin,
      blockBreakoutPlugin,
      markdownShortcutsPlugin,
      checkableListPlugin,
      linkifyPlugin,
      prismPlugin
    ],
    oneteamRTEPlugin
  };
}

export default createPlugins;
