'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactOneteam = require('react-oneteam');

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _immutable = require('immutable');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Mention = function Mention(props) {
  return _react2.default.createElement(
    _reactOneteam.Mention,
    { isGroup: !!props.mention.get('groupName') },
    props.children
  );
};

Mention.propTypes = {
  children: _propTypes2.default.node,
  mention: _propTypes2.default.instanceOf(_immutable.Map)
};
exports.default = Mention;