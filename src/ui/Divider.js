import React, { PropTypes } from 'react';
import classnames from 'classnames';

export default function Divider(props) {
  return <span className={classnames('rte-toolbar-divider', props.className)}></span>;
}

Divider.propTypes = {
  className: PropTypes.string
};
