import React, { PropTypes } from 'react';
import csstextToObjectify from '../helpers/csstextToObjectify';

export default function AtomicIFrame({ blockProps, offsetKey }) {
  const attrs = Object.keys(blockProps).reduce((result, key) => {
    result[key] = key === 'style' ? csstextToObjectify(blockProps[key]) : blockProps[key];
    return result;
  }, {});

  return (
    <div
      className='iframe-placeholder'
      contentEditable='false'
      suppressContentEditableWarning
      data-offset-key={offsetKey}>
      <iframe {...attrs}></iframe>
    </div>
  );
}

AtomicIFrame.propTypes = {
  offsetKey: PropTypes.string.isRequired,
  blockProps: PropTypes.objectOf(PropTypes.any).isRequired
};
