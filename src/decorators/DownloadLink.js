import React, { PropTypes } from 'react';

export default function DownloadLink({ offsetKey, children }) {
  return <span className='download-link' data-offset-key={offsetKey}>{children}</span>;
}

DownloadLink.propTypes = {
  offsetKey: PropTypes.string,
  children: PropTypes.node
};
