import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

export default function Divider(props) {
  return React.createElement('span', { className: classnames('rich-text-editor-toolbar-divider', props.className) });
}

Divider.propTypes = {
  className: PropTypes.string
};