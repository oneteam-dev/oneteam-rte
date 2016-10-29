'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Link;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Link(_ref) {
  var offsetKey = _ref.offsetKey,
      children = _ref.children;

  return _react2.default.createElement(
    'span',
    { className: 'link', 'data-offset-key': offsetKey },
    children
  );
}

Link.propTypes = {
  offsetKey: _react.PropTypes.string,
  children: _react.PropTypes.node
};
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(Link, 'Link', 'src/decorators/Link.js');
}();

;