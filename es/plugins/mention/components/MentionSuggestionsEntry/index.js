function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

import React from 'react';
import { MentionSelectCell } from 'react-oneteam';
import { userMentionType, groupMentionType } from 'react-oneteam/lib/Mention';
import PropTypes from 'prop-types';
import { mentionTrigger } from '../..';

var MentionSuggestionsEntry = function MentionSuggestionsEntry(props) {
  var _props$mention = props.mention,
      name = _props$mention.name,
      email = _props$mention.email,
      userName = _props$mention.userName,
      groupName = _props$mention.groupName,
      avatarURL = _props$mention.avatarURL,
      className = props.className,
      theme = props.theme,
      searchValue = props.searchValue,
      rest = _objectWithoutProperties(props, ["mention", "className", "theme", "searchValue"]);

  var username = "".concat(mentionTrigger).concat(userName || groupName || '');
  var user = {
    profile_photo: {
      thumbnail_url: avatarURL
    },
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
  mention: PropTypes.oneOfType([userMentionType, groupMentionType]),
  className: PropTypes.string,
  theme: PropTypes.object,
  searchValue: PropTypes.string
};
export default MentionSuggestionsEntry;