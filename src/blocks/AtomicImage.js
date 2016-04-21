import React, { Component, PropTypes } from 'react';

export default class AtomicImage extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { blockProps, offsetKey } = this.props;
    const { src, alt } = blockProps;

    return <img src={src} alt={alt} data-offset-key={offsetKey} />;
  }
}

AtomicImage.displayName = 'AtomicImage';
AtomicImage.propTypes = {
  offsetKey: PropTypes.string,
  blockProps: PropTypes.shape({
    src: PropTypes.string.isRequired,
    alt: PropTypes.func.isRequired
  }).isRequired
};
