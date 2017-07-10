import React from 'react';
import { MentionSelectCell } from 'react-oneteam';
import PropTypes from 'prop-types';
import { Map } from 'immutable';
import { mentionTrigger } from '../..';

const MentionSuggestionsEntry = props => {
  const {
    mention,
    className,
    theme, // eslint-disable-line no-unused-vars
    searchValue, // eslint-disable-line no-unused-vars
    ...rest
  } = props;

  const name = mention.get('name');
  const email = mention.get('email');
  const username = `${mentionTrigger}${mention.get('userName') || mention.get('groupName') || ''}`;
  const user = {
    profile_photo: { thumbnail_url: mention.get('avatarURL') },
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
  mention: PropTypes.instanceOf(Map),
  className: PropTypes.string,
  theme: PropTypes.object,
  searchValue: PropTypes.string,
};

export default MentionSuggestionsEntry;
