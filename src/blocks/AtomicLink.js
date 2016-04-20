import React, { Component, PropTypes } from 'react';

export default class AtomicLink extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { block, blockProps, offsetKey } = this.props;
    const { url } = blockProps;
    return <a href={url} data-offset-key={offsetKey}>{block.getText()}</a>;
  }
}

AtomicLink.displayName = 'AtomicLink';
AtomicLink.propTypes = {
  blockProps: PropTypes.shape({
    url: PropTypes.string.isRequired
  }).isRequired
};
