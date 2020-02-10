import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import createPluginObject, { defaultTheme } from 'draft-js-mention-plugin';

/**
 * convert string[] into { id: string; name: string;  userName: string; email: string;}[]
 */
export const convertToMentions = (hashtagList = []) =>
  hashtagList.map((name, i) => ({ id: `hashtag-item-${i}`, name, userName: '', email: '' }));

const defaultStyle = { fontWeight: 'bold', background: 'transparent' };

const MentionComponent = ({ children, theme }) => (
  <span className={classnames(theme.mention, theme.custom)} style={defaultStyle}>
    {children}
  </span>
);

MentionComponent.propTypes = { children: PropTypes.array, theme: PropTypes.object };

// TODO: replace with a dedicated hashtag suggestion plugin which has no dependency on 'draft-js-mention-plugin'
// Ad hoc support for hashtag suggest on rich text editor
export default hashtagList =>
  createPluginObject({
    theme: {
      ...defaultTheme,
      mentionSuggestions: `${defaultTheme.mentionSuggestions} is-hashtag-suggest`,
      custom: 'draft-js-mention-plugin-hashtag-custom'
    },
    mentionPrefix: '',
    mentionTrigger: '#',
    mentions: convertToMentions(hashtagList),
    mentionComponent: MentionComponent
  });
