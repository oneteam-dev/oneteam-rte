function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

var BaseButton = function BaseButton(_ref) {
  var className = _ref.className,
      active = _ref.active,
      children = _ref.children,
      rest = _objectWithoutProperties(_ref, ["className", "active", "children"]);

  return React.createElement("span", _extends({}, rest, {
    className: classnames('rich-text-editor-toolbar-button', className, {
      active: active
    })
  }), React.createElement("span", {
    className: "rich-text-editor-toolbar-button-inner"
  }, children ? children : null));
};

BaseButton.propTypes = {
  className: PropTypes.string,
  active: PropTypes.bool,
  children: PropTypes.node
};
export default BaseButton;