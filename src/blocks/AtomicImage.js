import React, { PropTypes } from 'react';

export default function AtomicImage({ blockProps, offsetKey }) {
  const { src, alt } = blockProps;
  return <img src={src} alt={alt} data-offset-key={offsetKey} />;
}

AtomicImage.propTypes = {
  offsetKey: PropTypes.string,
  blockProps: PropTypes.shape({
    src: PropTypes.string.isRequired,
    alt: PropTypes.string
  }).isRequired
};
