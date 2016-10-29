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

var _toggleInlineStyle = require('../functions/toggleInlineStyle');

var _toggleInlineStyle2 = _interopRequireDefault(_toggleInlineStyle);

var _hasCurrentInlineStyle = require('../utils/hasCurrentInlineStyle');

var _hasCurrentInlineStyle2 = _interopRequireDefault(_hasCurrentInlineStyle);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var InlineStyleButton = function (_Component) {
  _inherits(InlineStyleButton, _Component);

  _createClass(InlineStyleButton, null, [{
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

  function InlineStyleButton(props) {
    _classCallCheck(this, InlineStyleButton);

    var _this = _possibleConstructorReturn(this, (InlineStyleButton.__proto__ || Object.getPrototypeOf(InlineStyleButton)).call(this, props));

    _this.handleMouseDown = function (ev) {
      return _this._handleMouseDown(ev);
    };
    return _this;
  }

  _createClass(InlineStyleButton, [{
    key: '_handleMouseDown',
    value: function _handleMouseDown(ev) {
      ev.preventDefault();
      this.props.onToggle((0, _toggleInlineStyle2.default)(this.props.editorState, this.props.type));
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        _BaseButton2.default,
        {
          className: this.props.className,
          onMouseDown: this.handleMouseDown,
          active: (0, _hasCurrentInlineStyle2.default)(this.props.editorState, this.props.type) },
        this.props.children
      );
    }
  }]);

  return InlineStyleButton;
}(_react.Component);

var _default = InlineStyleButton;
exports.default = _default;
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(InlineStyleButton, 'InlineStyleButton', 'src/ui/InlineStyleButton.js');

  __REACT_HOT_LOADER__.register(_default, 'default', 'src/ui/InlineStyleButton.js');
}();

;