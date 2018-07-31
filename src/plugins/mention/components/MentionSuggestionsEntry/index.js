import React from 'react';
import { MentionSelectCell } from 'react-oneteam';
import { userMentionType, groupMentionType } from 'react-oneteam/lib/Mention';
import PropTypes from 'prop-types';
import { mentionTrigger } from '../..';

const MentionSuggestionsEntry = props => {
  const {
    mention: {
      name,
      email,
      userName,
      groupName,
      avatarURL,
    },
    className,
    theme, // eslint-disable-line no-unused-vars
    searchValue, // eslint-disable-line no-unused-vars
    ...rest
  } = props;
  const username = `${mentionTrigger}${userName || groupName || ''}`;
  const user = {
    profile_photo: { thumbnail_url: avatarURL },
    name,
  };

  return (
    <MentionSelectCell
      {...rest}
      className={className}
      user={user}
      username={username}
      name={name}
      email={email}
    />
  );
};

MentionSuggestionsEntry.propTypes = {
  mention: PropTypes.oneOfType([userMentionType, groupMentionType]),
  className: PropTypes.string,
  theme: PropTypes.object,
  searchValue: PropTypes.string,
};

export default MentionSuggestionsEntry;
