var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

import React from 'react';
import { MentionSelectCell } from 'react-oneteam';
import PropTypes from 'prop-types';
import { Map } from 'immutable';
import { mentionTrigger } from '../..';

var MentionSuggestionsEntry = function MentionSuggestionsEntry(props) {
  var mention = props.mention,
      className = props.className,
      theme = props.theme,
      searchValue = props.searchValue,
      rest = _objectWithoutProperties(props, ['mention', 'className', 'theme', 'searchValue']);

  var name = mention.get('name');
  var email = mention.get('email');
  var username = '' + mentionTrigger + (mention.get('userName') || mention.get('groupName') || '');
  var user = {
    profile_photo: { thumbnail_url: mention.get('avatarURL') },
    name: name
  };

  return React.createElement(MentionSelectCell, _extends({}, rest, {
    className: className,
    user: user,
    username: username,
    name: name,
    email: email
  }));
};

MentionSuggestionsEntry.propTypes = {
  mention: PropTypes.instanceOf(Map),
  className: PropTypes.string,
  theme: PropTypes.object,
  searchValue: PropTypes.string
};

export default MentionSuggestionsEntry;