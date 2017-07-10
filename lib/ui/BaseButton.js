'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _isFunction = require('lodash/isFunction');

var _isFunction2 = _interopRequireDefault(_isFunction);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BaseButton = function (_Component) {
  _inherits(BaseButton, _Component);

  _createClass(BaseButton, null, [{
    key: 'propTypes',
    get: function get() {
      return {
        className: _propTypes2.default.string,
        active: _propTypes2.default.bool,
        children: _propTypes2.default.node,
        onMouseDown: _propTypes2.default.func,
        onClick: _propTypes2.default.func
      };
    }
  }]);

  function BaseButton(props) {
    _classCallCheck(this, BaseButton);

    var _this = _possibleConstructorReturn(this, (BaseButton.__proto__ || Object.getPrototypeOf(BaseButton)).call(this, props));

    _this.handleMouseDown = function (ev) {
      return _this._handleMouseDown(ev);
    };
    _this.handleClick = function (ev) {
      return _this._handleClick(ev);
    };
    return _this;
  }

  _createClass(BaseButton, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          className = _props.className,
          active = _props.active,
          children = _props.children;

      return _react2.default.createElement(
        'span',
        {
          className: (0, _classnames2.default)('rich-text-editor-toolbar-button', className, { active: active }),
          onMouseDown: this.handleMouseDown,
          onClick: this.handleClick },
        _react2.default.createElement(
          'span',
          { className: 'rich-text-editor-toolbar-button-inner' },
          children ? children : null
        )
      );
    }
  }, {
    key: '_handleMouseDown',
    value: function _handleMouseDown(ev) {
      if ((0, _isFunction2.default)(this.props.onMouseDown)) {
        this.props.onMouseDown(ev);
      }
    }
  }, {
    key: '_handleClick',
    value: function _handleClick(ev) {
      if ((0, _isFunction2.default)(this.props.onClick)) {
        this.props.onClick(ev);
      }
    }
  }]);

  return BaseButton;
}(_react.Component);

exports.default = BaseButton;