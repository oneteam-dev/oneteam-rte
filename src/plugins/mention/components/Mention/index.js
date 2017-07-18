import React from 'react';
import { Mention as MentionComponent } from 'react-oneteam';
import PropTypes from 'prop-types';
import { Map } from 'immutable';

const Mention = props => {
  return (
    <MentionComponent isGroup={!!props.mention.get('groupName')}>
      {props.children}
    </MentionComponent>
  );
};

Mention.propTypes = {
  children: PropTypes.node,
  mention: PropTypes.instanceOf(Map)
}
export default Mention;
