'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = AtomicIFrame;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _csstextToObjectify = require('../helpers/csstextToObjectify');

var _csstextToObjectify2 = _interopRequireDefault(_csstextToObjectify);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function AtomicIFrame(_ref) {
  var blockProps = _ref.blockProps,
      offsetKey = _ref.offsetKey;

  var attrs = Object.keys(blockProps).reduce(function (result, key) {
    result[key] = key === 'style' ? (0, _csstextToObjectify2.default)(blockProps[key]) : blockProps[key];
    return result;
  }, {});

  return _react2.default.createElement(
    'div',
    {
      className: 'iframe-placeholder',
      contentEditable: 'false',
      suppressContentEditableWarning: true,
      'data-offset-key': offsetKey },
    _react2.default.createElement('iframe', attrs)
  );
}

AtomicIFrame.propTypes = {
  offsetKey: _react.PropTypes.string.isRequired,
  blockProps: _react.PropTypes.objectOf(_react.PropTypes.any).isRequired
};
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(AtomicIFrame, 'AtomicIFrame', 'src/blocks/AtomicIFrame.js');
}();

;