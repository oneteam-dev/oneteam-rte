import React, { PropTypes } from 'react';

export default function DownloadLink({ offsetKey, children }) {
  return (
    <span className='download-link' data-offset-key={offsetKey}>{children}</span>
  );
}

DownloadLink.propTypes = {
  offsetKey: PropTypes.string,
  children: PropTypes.node
};
// {/*<div
//   className='download-link'
//   contentEditable='false'
//   suppressContentEditableWarning
//   data-offset-key={offsetKey}>
//   <div className='download-link-icon'></div>
//   <div className='download-link-body'>
//     <div className='download-link-name'>{name}</div>
//     <div className='download-link-size'>{`${size}`}</div>
//   </div>
//   <span className='download-link-name'>{name}</span>
// </div>*/}
