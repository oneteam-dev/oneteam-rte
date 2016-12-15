import React from 'react';
import Icon from 'react-fa';

const WebCard = props => {
  return <div style={{
    border: '1px solid #ddd',
    borderRadius: 5,
    maxWidth: 400,
    padding: 8,
    color: '#999',
    position: 'relative'
  }}>
    <Icon name='external-link' style={{
      position: 'absolute',
      right: 8
    }}/>
    <div>Web card</div>
    <div>{props.blockProps.url}</div>
  </div>;
};

export default WebCard;
