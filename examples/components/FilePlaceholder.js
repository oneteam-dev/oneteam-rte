import React from 'react';
import Icon from 'react-fa';

const FilePlaceholder = props => {
  return <div style={{
    border: '1px solid #ddd',
    borderRadius: 5,
    maxWidth: 400,
    padding: 8,
    color: '#999',
    position: 'relative'
  }}>
    <Icon name='download' style={{
      position: 'absolute',
      right: 8
    }}/>
    <div>File placeholder</div>
    <div>{props.blockProps.url}</div>
  </div>;
};

export default FilePlaceholder;
