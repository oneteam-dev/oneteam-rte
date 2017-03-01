import React from 'react';
import PureWebCard from '../../src/components/WebCard';

const WebCard = props => {
  return <div>
    <PureWebCard url={props.blockProps.url} />
  </div>;
};

export default WebCard;
