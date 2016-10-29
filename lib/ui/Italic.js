'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _draftJs = require('draft-js');

var _oneteamRteUtils = require('oneteam-rte-utils');

var _InlineStyleButton = require('./InlineStyleButton');

var _InlineStyleButton2 = _interopRequireDefault(_InlineStyleButton);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Italic = function (_Component) {
  _inherits(Italic, _Component);

  _createClass(Italic, null, [{
    key: 'propTypes',
    get: function get() {
      return {
        editorState: _react.PropTypes.instanceOf(_draftJs.EditorState).isRequired,
        onToggleInlineStyle: _react.PropTypes.func.isRequired,
        children: _react.PropTypes.node,
        className: _react.PropTypes.string
      };
    }
  }, {
    key: 'defaultProps',
    get: function get() {
      return { className: '' };
    }
  }]);

  function Italic(props) {
    _classCallCheck(this, Italic);

    return _possibleConstructorReturn(this, (Italic.__proto__ || Object.getPrototypeOf(Italic)).call(this, props));
  }

  _createClass(Italic, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        _InlineStyleButton2.default,
        {
          type: _oneteamRteUtils.INLINE_STYLES.ITALIC,
          editorState: this.props.editorState,
          onToggle: this.props.onToggleInlineStyle,
          className: this.props.className },
        this.props.children
      );
    }
  }]);

  return Italic;
}(_react.Component);

var _default = Italic;
exports.default = _default;
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(Italic, 'Italic', 'src/ui/Italic.js');

  __REACT_HOT_LOADER__.register(_default, 'default', 'src/ui/Italic.js');
}();

;