import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import createPluginObject, { defaultTheme } from 'draft-js-mention-plugin';
import './style.css';

/**
 * convert string[] into { id: string; email: string; userName: string, name: string }[]
 */
export const convertToMentions = hashtagList =>
  hashtagList.map((name, i) => ({ id: `hashtag-item-${i}`, name, userName: '', email: '' }));

const MentionComponent = ({ children, theme }) => (
  <span className={classnames(theme.mention, theme.hashtag)}>{children}</span>
);
MentionComponent.propTypes = { children: PropTypes.array, theme: PropTypes.object };

// TODO remove a dependency on 'draft-js-mention-plugin'
// Ad hoc support for hashtag suggest on rich text editor
export default hashtagList =>
  createPluginObject({
    theme: { ...defaultTheme, hashtag: 'draft-js-mention-plugin-hashtag' },
    mentionPrefix: '',
    mentionTrigger: '#',
    mentions: convertToMentions(hashtagList),
    mentionComponent: MentionComponent
  });
