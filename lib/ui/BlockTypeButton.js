'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _draftJs = require('draft-js');

var _BaseButton = require('./BaseButton');

var _BaseButton2 = _interopRequireDefault(_BaseButton);

var _toggleBlockType = require('../functions/toggleBlockType');

var _toggleBlockType2 = _interopRequireDefault(_toggleBlockType);

var _checkCurrentBlockType = require('../utils/checkCurrentBlockType');

var _checkCurrentBlockType2 = _interopRequireDefault(_checkCurrentBlockType);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BlockTypeButton = function (_Component) {
  _inherits(BlockTypeButton, _Component);

  _createClass(BlockTypeButton, null, [{
    key: 'propTypes',
    get: function get() {
      return {
        type: _react.PropTypes.string.isRequired,
        editorState: _react.PropTypes.instanceOf(_draftJs.EditorState).isRequired,
        onToggle: _react.PropTypes.func.isRequired,
        className: _react.PropTypes.string,
        children: _react.PropTypes.node,
        active: _react.PropTypes.bool
      };
    }
  }, {
    key: 'defaultProps',
    get: function get() {
      return { className: '' };
    }
  }]);

  function BlockTypeButton(props) {
    _classCallCheck(this, BlockTypeButton);

    var _this = _possibleConstructorReturn(this, (BlockTypeButton.__proto__ || Object.getPrototypeOf(BlockTypeButton)).call(this, props));

    _this.handleMouseDown = function (ev) {
      return _this._handleMouseDown(ev);
    };
    return _this;
  }

  _createClass(BlockTypeButton, [{
    key: '_handleMouseDown',
    value: function _handleMouseDown(ev) {
      ev.preventDefault();
      this.props.onToggle((0, _toggleBlockType2.default)(this.props.editorState, this.props.type));
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        _BaseButton2.default,
        {
          className: this.props.className,
          onMouseDown: this.handleMouseDown,
          active: (0, _checkCurrentBlockType2.default)(this.props.editorState, this.props.type) },
        this.props.children
      );
    }
  }]);

  return BlockTypeButton;
}(_react.Component);

exports.default = BlockTypeButton;