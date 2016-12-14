import createBlockBreakoutPlugin from 'draft-js-block-breakout-plugin';
import createMarkdownShortcutsPlugin from 'draft-js-markdown-shortcuts-plugin';
import prismPlugin from './prism';

const blockBreakoutPlugin = createBlockBreakoutPlugin({
  breakoutBlocks: [
    'header-one', 'header-two', 'header-three', 'header-four', 'header-five', 'header-six', 'blockquote'
  ]
});
const markdownShortcutsPlugin = createMarkdownShortcutsPlugin();

export default [
  blockBreakoutPlugin,
  markdownShortcutsPlugin,
  prismPlugin
];
