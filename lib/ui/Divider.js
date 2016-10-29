'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Divider;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Divider(props) {
  return _react2.default.createElement('span', { className: (0, _classnames2.default)('rich-text-editor-toolbar-divider', props.className) });
}

Divider.propTypes = {
  className: _react.PropTypes.string
};
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(Divider, 'Divider', 'src/ui/Divider.js');
}();

;