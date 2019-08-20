import React from 'react';
import classnames from 'classnames';
import createPluginObject, { defaultTheme } from 'draft-js-mention-plugin';
import './style.css';

/**
 * convert string[] into { id: string; email: string; userName: string, name: string }[]
 */
export const convertToMentions = hashtagList =>
  hashtagList.map((name, i) => ({ id: `hashtag-item-${i}`, name, userName: '', email: '' }));

// TODO remove a dependency on 'draft-js-mention-plugin'
// Ad hoc support for hashtag suggest on rich text editor
export default hashtagList =>
  createPluginObject({
    theme: { ...defaultTheme, hashtag: 'draft-js-mention-plugin-hashtag' },
    mentionPrefix: '',
    mentionTrigger: '#',
    mentions: convertToMentions(hashtagList),
    mentionComponent: ({ children, theme }) => (
      <span className={classnames(theme.mention, theme.hashtag)}>{children}</span>
    )
  });
