import React from 'react';

const PDFPreview = () => {
  return <div style={{
    border: '1px solid #ddd',
    borderRadius: 5,
    maxWidth: 400,
    padding: 8,
    color: '#999',
    position: 'relative'
  }}>
    <div>PDF preview</div>
    <div style={{ textAlign: 'center' }}>PDF preview will show in here.</div>
  </div>;
};

export default PDFPreview;
