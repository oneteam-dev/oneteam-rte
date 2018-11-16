import React from 'react';
import { Mention as MentionComponent } from 'react-oneteam';
import { userMentionType, groupMentionType } from 'react-oneteam/lib/Mention';
import PropTypes from 'prop-types';

var Mention = function Mention(props) {
  return React.createElement(MentionComponent, {
    isGroup: !!props.mention.groupName
  }, props.children);
};

Mention.propTypes = {
  children: PropTypes.node,
  mention: PropTypes.oneOfType([userMentionType, groupMentionType])
};
export default Mention;