import React, { PropTypes } from 'react';

export default function Link({ offsetKey, children }) {
  return <span className='link' data-offset-key={offsetKey}>{children}</span>;
}

Link.propTypes = {
  offsetKey: PropTypes.string,
  children: PropTypes.any
};
