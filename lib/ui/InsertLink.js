'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _FormControl = require('react-bootstrap/lib/FormControl');

var _FormControl2 = _interopRequireDefault(_FormControl);

var _Button = require('react-bootstrap/lib/Button');

var _Button2 = _interopRequireDefault(_Button);

var _draftJs = require('draft-js');

var _BaseButton = require('./BaseButton');

var _BaseButton2 = _interopRequireDefault(_BaseButton);

var _toggleLink = require('../functions/toggleLink');

var _toggleLink2 = _interopRequireDefault(_toggleLink);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var InsertLink = function (_Component) {
  _inherits(InsertLink, _Component);

  _createClass(InsertLink, null, [{
    key: 'propTypes',
    get: function get() {
      return {
        editorState: _react.PropTypes.instanceOf(_draftJs.EditorState).isRequired,
        onInsertLink: _react.PropTypes.func.isRequired,
        className: _react.PropTypes.string,
        iconClassName: _react.PropTypes.string,
        placeholder: _react.PropTypes.string,
        validationErrorMessage: _react.PropTypes.string,
        children: _react.PropTypes.node,
        buttonText: _react.PropTypes.string,
        isOpen: _react.PropTypes.bool,
        onMouseDownToggle: _react.PropTypes.func.isRequired
      };
    }
  }, {
    key: 'defaultProps',
    get: function get() {
      return {
        className: '',
        iconClassName: '',
        placeholder: 'Enter a URL...',
        validationErrorMessage: 'Please enter a valid URL.',
        buttonText: '✔',
        isOpen: false
      };
    }
  }]);

  function InsertLink(props) {
    _classCallCheck(this, InsertLink);

    var _this = _possibleConstructorReturn(this, (InsertLink.__proto__ || Object.getPrototypeOf(InsertLink)).call(this, props));

    _this.state = { value: '', validValue: true };

    _this.handleChangeValue = function (_ref) {
      var target = _ref.target;
      return _this.setState({ value: target.value });
    };
    _this.handleClickButton = function (ev) {
      return _this._handleClickButton(ev);
    };
    return _this;
  }

  _createClass(InsertLink, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          className = _props.className,
          children = _props.children,
          isOpen = _props.isOpen,
          onMouseDownToggle = _props.onMouseDownToggle,
          placeholder = _props.placeholder,
          buttonText = _props.buttonText,
          validationErrorMessage = _props.validationErrorMessage;

      return _react2.default.createElement(
        'span',
        { className: (0, _classnames2.default)('rich-text-editor-toolbar-button-insert-link', className) },
        _react2.default.createElement(
          _BaseButton2.default,
          { className: this.props.iconClassName, onMouseDown: onMouseDownToggle },
          children
        ),
        _react2.default.createElement(
          'div',
          { className: (0, _classnames2.default)('rich-text-editor-toolbar-button-insert-link-input', {
              'is-show': isOpen
            }) },
          _react2.default.createElement(_FormControl2.default, {
            type: 'text',
            pattern: '^https?:\\/\\/.+',
            placeholder: placeholder,
            value: this.state.value,
            onChange: this.handleChangeValue }),
          _react2.default.createElement(
            _Button2.default,
            { onClick: this.handleClickButton },
            buttonText
          ),
          _react2.default.createElement(
            'span',
            { className: (0, _classnames2.default)('insert-link-error-message', {
                'is-show': !this.state.validValue
              }) },
            validationErrorMessage
          )
        )
      );
    }
  }, {
    key: 'close',
    value: function close() {
      this.setState({ isOpen: false });
    }
  }, {
    key: '_handleClickButton',
    value: function _handleClickButton(ev) {
      var _this2 = this;

      ev.preventDefault();
      if (this._isValidValue()) {
        var value = this._hasHTTPProtocol(this.state.value) ? this.state.value : this._addHTTPProtocol(this.state.value);
        var newEditorState = (0, _toggleLink2.default)(this.props.editorState, value);
        this.props.onInsertLink(newEditorState);
        this.setState({ value: '', isOpen: false });
      } else {
        this.setState({ validValue: false }, function () {
          setTimeout(function () {
            return _this2.setState({ validValue: true });
          }, 2000);
        });
      }
    }
  }, {
    key: '_isValidValue',
    value: function _isValidValue() {
      return this.state.value !== '';
    }
  }, {
    key: '_hasHTTPProtocol',
    value: function _hasHTTPProtocol(value) {
      return (/^https?:\/\/.+/.test(value)
      );
    }
  }, {
    key: '_addHTTPProtocol',
    value: function _addHTTPProtocol(value) {
      return 'http://' + value;
    }
  }]);

  return InsertLink;
}(_react.Component);

exports.default = InsertLink;