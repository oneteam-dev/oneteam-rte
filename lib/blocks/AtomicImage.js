'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = AtomicImage;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function AtomicImage(_ref) {
  var blockProps = _ref.blockProps,
      offsetKey = _ref.offsetKey;
  var src = blockProps.src,
      alt = blockProps.alt;

  return _react2.default.createElement('img', { src: src, alt: alt, 'data-offset-key': offsetKey });
}

AtomicImage.propTypes = {
  offsetKey: _react.PropTypes.string,
  blockProps: _react.PropTypes.shape({
    src: _react.PropTypes.string.isRequired,
    alt: _react.PropTypes.string
  }).isRequired
};
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(AtomicImage, 'AtomicImage', 'src/blocks/AtomicImage.js');
}();

;