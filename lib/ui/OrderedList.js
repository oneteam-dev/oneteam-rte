'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _draftJs = require('draft-js');

var _constants = require('draft-js-oneteam-rte-plugin/lib/constants');

var _BlockTypeButton = require('./BlockTypeButton');

var _BlockTypeButton2 = _interopRequireDefault(_BlockTypeButton);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var OrderedList = function (_Component) {
  _inherits(OrderedList, _Component);

  _createClass(OrderedList, null, [{
    key: 'propTypes',
    get: function get() {
      return {
        editorState: _propTypes2.default.instanceOf(_draftJs.EditorState).isRequired,
        onToggleBlockType: _propTypes2.default.func.isRequired,
        children: _propTypes2.default.node,
        className: _propTypes2.default.string
      };
    }
  }, {
    key: 'defaultProps',
    get: function get() {
      return { className: '' };
    }
  }]);

  function OrderedList(props) {
    _classCallCheck(this, OrderedList);

    return _possibleConstructorReturn(this, (OrderedList.__proto__ || Object.getPrototypeOf(OrderedList)).call(this, props));
  }

  _createClass(OrderedList, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        _BlockTypeButton2.default,
        {
          type: _constants.BLOCK_TYPES.ORDERED_LIST_ITEM,
          editorState: this.props.editorState,
          onToggle: this.props.onToggleBlockType,
          className: this.props.className },
        this.props.children
      );
    }
  }]);

  return OrderedList;
}(_react.Component);

exports.default = OrderedList;