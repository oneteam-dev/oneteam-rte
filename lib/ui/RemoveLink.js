'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _draftJs = require('draft-js');

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _BaseButton = require('./BaseButton');

var _BaseButton2 = _interopRequireDefault(_BaseButton);

var _toggleLink = require('../functions/toggleLink');

var _toggleLink2 = _interopRequireDefault(_toggleLink);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var RemoveLink = function (_Component) {
  _inherits(RemoveLink, _Component);

  _createClass(RemoveLink, null, [{
    key: 'propTypes',
    get: function get() {
      return {
        editorState: _react.PropTypes.instanceOf(_draftJs.EditorState).isRequired,
        onRemoveLink: _react.PropTypes.func.isRequired,
        children: _react.PropTypes.node,
        className: _react.PropTypes.string
      };
    }
  }, {
    key: 'defaultProps',
    get: function get() {
      return {
        className: ''
      };
    }
  }]);

  function RemoveLink(props) {
    _classCallCheck(this, RemoveLink);

    var _this = _possibleConstructorReturn(this, (RemoveLink.__proto__ || Object.getPrototypeOf(RemoveLink)).call(this, props));

    _this.handleMouseDown = function (ev) {
      return _this._handleMouseDown(ev);
    };
    return _this;
  }

  _createClass(RemoveLink, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        _BaseButton2.default,
        { className: (0, _classnames2.default)(this.props.className), onMouseDown: this.handleMouseDown },
        this.props.children
      );
    }
  }, {
    key: '_handleMouseDown',
    value: function _handleMouseDown(ev) {
      ev.preventDefault();
      var newEditorState = (0, _toggleLink2.default)(this.props.editorState);
      this.props.onRemoveLink(newEditorState);
    }
  }]);

  return RemoveLink;
}(_react.Component);

var _default = RemoveLink;
exports.default = _default;
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(RemoveLink, 'RemoveLink', 'src/ui/RemoveLink.js');

  __REACT_HOT_LOADER__.register(_default, 'default', 'src/ui/RemoveLink.js');
}();

;