import React from 'react';
import PropTypes from 'prop-types';
import createPluginObject from 'draft-js-mention-plugin';
import styled from 'styled-components';

/**
 * convert string[] into { id: string; name: string;  userName: string; email: string;}[]
 */
export const convertToMentions = hashtagList =>
  hashtagList.map((name, i) => ({ id: `hashtag-item-${i}`, name, userName: '', email: '' }));

const Wrapper = styled.span`
  font-weight: bold;
  background: #fff !important;
`;

const MentionComponent = ({ children }) => <Wrapper>{children}</Wrapper>;

MentionComponent.propTypes = { children: PropTypes.array };

// TODO: replace with a dedicated hashtag suggestion plugin which has no dependency on 'draft-js-mention-plugin'
// Ad hoc support for hashtag suggest on rich text editor
export default hashtagList =>
  createPluginObject({
    mentionPrefix: '',
    mentionTrigger: '#',
    mentions: convertToMentions(hashtagList),
    mentionComponent: MentionComponent
  });
