import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const Divider = ({ className }) => {
  return <span className={classnames('rich-text-editor-toolbar-divider', className)}></span>;
};

Divider.propTypes = {
  className: PropTypes.string
};

export default Divider;
