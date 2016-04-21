'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ToolbarButton = function (_Component) {
  _inherits(ToolbarButton, _Component);

  function ToolbarButton(props) {
    _classCallCheck(this, ToolbarButton);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(ToolbarButton).call(this, props));

    _this.handleMouseDown = function (ev) {
      return _this._handleMouseDown(ev);
    };
    return _this;
  }

  _createClass(ToolbarButton, [{
    key: 'render',
    value: function render() {
      var _props = this.props;
      var active = _props.active;
      var type = _props.type;

      return _react2.default.createElement(
        'span',
        {
          className: (0, _classnames2.default)('rich-editor-toolbar-button', { active: active }),
          onMouseDown: this.handleMouseDown },
        _react2.default.createElement(
          'span',
          { className: 'rich-editor-toolbar-button-inner' },
          _react2.default.createElement(
            'span',
            { className: 'rich-editor-toolbar-button-icon ' + type },
            this.props.children ? this.props.children : ''
          )
        )
      );
    }
  }, {
    key: '_handleMouseDown',
    value: function _handleMouseDown(ev) {
      ev.preventDefault();
      this.props.onClickButton(this.props.type);
    }
  }]);

  return ToolbarButton;
}(_react.Component);

exports.default = ToolbarButton;


ToolbarButton.displayName = 'ToolbarButton';
ToolbarButton.propTypes = {
  type: _react.PropTypes.string.isRequired,
  active: _react.PropTypes.bool.isRequired,
  onClickButton: _react.PropTypes.func,
  children: _react.PropTypes.node
};