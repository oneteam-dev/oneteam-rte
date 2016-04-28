import React, { Component, PropTypes } from 'react';

export default class AtomicIFrame extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { blockProps, offsetKey } = this.props;
    return (
      <div
        className='iframe-placeholder'
        contentEditable='false'
        suppressContentEditableWarning
        data-offset-key={offsetKey}>
        <iframe {...blockProps}></iframe>
      </div>
    );
  }
}

AtomicIFrame.displayName = 'AtomicIFrame';
AtomicIFrame.propTypes = {
  offsetKey: PropTypes.string,
  blockProps: PropTypes.objectOf(PropTypes.any).isRequired
};
