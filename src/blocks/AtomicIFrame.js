import React, { Component, PropTypes } from 'react';

export default class AtomicIFrame extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { blockProps, offsetKey } = this.props;
    const { src } = blockProps;
    return (
      <div
        contentEditable='false'
        suppressContentEditableWarning
        className='iframe-placeholder'
        data-offset-key={offsetKey}>
        <span className='iframe-placeholder-icon'></span>
        <span className='iframe-placeholder-src'>{src}</span>
      </div>
    );
  }
}

AtomicIFrame.displayName = 'AtomicIFrame';
AtomicIFrame.propTypes = {
  offsetKey: PropTypes.string,
  blockProps: PropTypes.shape({
    src: PropTypes.string.isRequired
  }).isRequired
};
