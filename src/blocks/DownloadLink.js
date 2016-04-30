import React, { PropTypes } from 'react';

export default function DownloadLink({ offsetKey, blockProps }) {
  return <span className='download-link' data-offset-key={offsetKey}>{blockProps.name}</span>;
}

DownloadLink.propTypes = {
  offsetKey: PropTypes.string,
  blockProps: PropTypes.any
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
