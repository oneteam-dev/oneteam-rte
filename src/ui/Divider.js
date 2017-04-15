import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

export default function Divider(props) {
  return <span className={classnames('rich-text-editor-toolbar-divider', props.className)}></span>;
}

Divider.propTypes = {
  className: PropTypes.string
};
