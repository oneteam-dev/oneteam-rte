'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = DownloadLink;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function DownloadLink(_ref) {
  var offsetKey = _ref.offsetKey,
      children = _ref.children;

  return _react2.default.createElement(
    'span',
    { className: 'download-link', 'data-offset-key': offsetKey },
    children
  );
}

DownloadLink.propTypes = {
  offsetKey: _react.PropTypes.string,
  children: _react.PropTypes.node
};
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(DownloadLink, 'DownloadLink', 'src/decorators/DownloadLink.js');
}();

;