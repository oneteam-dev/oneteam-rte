import createBlockBreakoutPlugin from 'draft-js-block-breakout-plugin';

const blockBreakoutPlugin = createBlockBreakoutPlugin({
  breakoutBlocks: [
    'header-one', 'header-two', 'header-three', 'header-four', 'header-five', 'header-six', 'blockquote'
  ]
});

export default [blockBreakoutPlugin];
