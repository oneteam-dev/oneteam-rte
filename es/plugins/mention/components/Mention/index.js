import React from 'react';
import { Mention as MentionComponent } from 'react-oneteam';
import PropTypes from 'prop-types';
import { Map } from 'immutable';

var Mention = function Mention(props) {
  return React.createElement(
    MentionComponent,
    { isGroup: !!props.mention.get('groupName') },
    props.children
  );
};

Mention.propTypes = {
  children: PropTypes.node,
  mention: PropTypes.instanceOf(Map)
};
export default Mention;