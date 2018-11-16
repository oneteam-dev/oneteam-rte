import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

var Divider = function Divider(_ref) {
  var className = _ref.className;
  return React.createElement("span", {
    className: classnames('rich-text-editor-toolbar-divider', className)
  });
};

Divider.propTypes = {
  className: PropTypes.string
};
export default Divider;