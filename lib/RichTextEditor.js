'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _draftJsPluginsEditor = require('draft-js-plugins-editor');

var _draftJsPluginsEditor2 = _interopRequireDefault(_draftJsPluginsEditor);

var _constants = require('draft-js-oneteam-rte-plugin/lib/constants');

var _modifiers = require('draft-js-oneteam-rte-plugin/lib/modifiers');

var modifiers = _interopRequireWildcard(_modifiers);

var _emojione = require('emojione');

var _isFunction = require('lodash/isFunction');

var _isFunction2 = _interopRequireDefault(_isFunction);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _utils = require('./utils');

var _encoding = require('./encoding');

var _plugins = require('./plugins');

var _plugins2 = _interopRequireDefault(_plugins);

require('draft-js/dist/Draft.css');

require('draft-js-oneteam-rte-plugin/lib/plugin.css');

require('draft-js-checkable-list-plugin/lib/plugin.css');

require('@sugarshin/draft-js-emoji-plugin/lib/plugin.css');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var RichTextEditor = function (_Component) {
  _inherits(RichTextEditor, _Component);

  _createClass(RichTextEditor, [{
    key: 'html',
    set: function set(html) {
      var editorState = (0, _utils.updateEditorState)(this.state.editorState, html);
      this.setState({ editorState: editorState });
    },
    get: function get() {
      return (0, _encoding.contentToHTML)(this._contentState);
    }
  }, {
    key: 'markdown',
    get: function get() {
      return (0, _encoding.htmlToMarkdown)(this.html);
    }
  }, {
    key: '_editorState',
    get: function get() {
      return this.state.editorState;
    }
  }, {
    key: '_contentState',
    get: function get() {
      return this._editorState.getCurrentContent();
    }
  }, {
    key: 'plugins',
    get: function get() {
      return this._plugins;
    }
  }, {
    key: 'oneteamRTEPlugin',
    get: function get() {
      return this.plugins.oneteamRTEPlugin;
    }
  }, {
    key: 'emojiPlugin',
    get: function get() {
      return this.plugins.emojiPlugin;
    }
  }, {
    key: 'firstBlockText',
    get: function get() {
      return this._contentState.getFirstBlock().getText();
    }
  }, {
    key: 'modifiers',
    get: function get() {
      return modifiers;
    }
  }, {
    key: 'plainText',
    get: function get() {
      return this._contentState.getPlainText();
    }
  }]);

  function RichTextEditor(props) {
    _classCallCheck(this, RichTextEditor);

    var _this = _possibleConstructorReturn(this, (RichTextEditor.__proto__ || Object.getPrototypeOf(RichTextEditor)).call(this, props));

    _this.closeInsertLinkInput = function () {
      return _this.setState({ isOpenInsertLinkInput: false });
    };

    _this.toggleInsertLinkInput = function () {
      return _this.setState({ isOpenInsertLinkInput: !_this.state.isOpenInsertLinkInput });
    };

    _this.handleContainerMouseDown = function () {
      if (_this.state.isOpenInsertLinkInput) {
        _this.closeInsertLinkInput();
      }
    };

    _this.focus = function () {
      return _this.editor.focus();
    };

    _this.blur = function () {
      return _this.editor.blur();
    };

    _this.state = {
      editorState: (0, _utils.createEditorState)(_this.props.initialHtml),
      isOpenInsertLinkInput: false
    };

    _this._plugins = (0, _plugins2.default)({
      oneteamRTE: {
        customAtomicBlockRendererFn: _this.props.customAtomicBlockRendererFn,
        onReturnWithCommand: _this.props.onReturnWithCommand,
        onPastedFiles: _this.props.onPastedFiles,
        atomicBlockRenderMap: _this.props.atomicBlockRenderMap,
        onCompleteFileUpload: _this.props.onCompleteFileUpload
      },
      emoji: {
        priorityList: _this.props.priorityEmojiShortnames ? _this.props.priorityEmojiShortnames.reduce(function (ret, shortname) {
          return _extends({}, ret, _defineProperty({}, shortname, _emojione.emojioneList[shortname].unicode));
        }, {}) : undefined,
        imagePath: _this.props.emojiImagePath
      }
    });

    var triggerLock = 0; // To reduce triggering change callbacks.
    var triggerOnChange = function triggerOnChange() {
      var onChange = _this.props.onChange;

      if ((0, _isFunction2.default)(onChange) && triggerLock === 0) {
        triggerLock = setTimeout(function () {
          onChange(_this);
          triggerLock = 0;
        }, 100);
      }
    };

    _this.changeEditorState = function (editorState) {
      return _this.setState({ editorState: editorState }, triggerOnChange);
    };
    _this.getCurrentBlockType = function () {
      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return _utils.getCurrentBlockType.apply(undefined, [_this.state.editorState].concat(args));
    };
    _this.hasCurrentInlineStyle = function () {
      for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }

      return _utils.hasCurrentInlineStyle.apply(undefined, [_this.state.editorState].concat(args));
    };

    Object.keys(_this.oneteamRTEPlugin.modifiers).forEach(function (k) {
      _this[k] = _this.oneteamRTEPlugin.modifiers[k];
    });
    return _this;
  }

  _createClass(RichTextEditor, [{
    key: 'getCurrentInlineStyles',
    value: function getCurrentInlineStyles() {
      var ret = [];
      for (var key in _constants.INLINE_STYLES) {
        var value = _constants.INLINE_STYLES[key];
        if (this.hasCurrentInlineStyle(value)) {
          ret.push(value);
        }
      }
      return ret;
    }
  }, {
    key: 'renderChildren',
    value: function renderChildren() {
      var _this2 = this;

      var _state = this.state,
          editorState = _state.editorState,
          isOpenInsertLinkInput = _state.isOpenInsertLinkInput;


      var children = _react.Children.map(this.props.children || [], function (child) {
        return (0, _react.cloneElement)(child, {
          editorState: editorState,
          isOpenInsertLinkInput: isOpenInsertLinkInput,
          onChange: _this2.changeEditorState,
          toggleInsertLinkInput: _this2.toggleInsertLinkInput
        });
      });

      return children;
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      var editorState = this.state.editorState;
      var _props = this.props,
          className = _props.className,
          readOnly = _props.readOnly,
          placeholder = _props.placeholder;

      var bodyClassName = (0, _classnames2.default)('rich-text-editor-body', { 'RichEditor-hidePlaceholder': this._shouldHidePlaceholder() }, className);

      return _react2.default.createElement(
        'div',
        { className: 'rich-text-editor', id: 'rich-text-editor' },
        this.renderChildren(),
        _react2.default.createElement(
          'div',
          {
            className: bodyClassName,
            onMouseDown: this.handleContainerMouseDown
          },
          _react2.default.createElement(_draftJsPluginsEditor2.default, {
            plugins: this._plugins.all,
            ref: function ref(c) {
              return _this3.editor = c;
            },
            editorState: editorState,
            readOnly: readOnly,
            onChange: this.changeEditorState,
            onKeyDown: this.props.onKeyDown,
            placeholder: placeholder
          }),
          _react2.default.createElement(this.emojiPlugin.EmojiSuggestions, null)
        )
      );
    }
  }, {
    key: '_shouldHidePlaceholder',
    value: function _shouldHidePlaceholder() {
      var contentState = this.state.editorState.getCurrentContent();
      if (!contentState.hasText()) {
        if (contentState.getFirstBlock().getType() !== 'unstyled') {
          return true;
        }
      }
      return false;
    }

    /**
     * @public
     */

  }]);

  return RichTextEditor;
}(_react.Component);

RichTextEditor.propTypes = {
  initialHtml: _react.PropTypes.string,
  onChange: _react.PropTypes.func,
  className: _react.PropTypes.string,
  children: _react.PropTypes.oneOfType([_react.PropTypes.arrayOf(_react.PropTypes.element), _react.PropTypes.element]),
  placeholder: _react.PropTypes.string,
  readOnly: _react.PropTypes.bool,
  onReturnWithCommand: _react.PropTypes.func,
  onPastedFiles: _react.PropTypes.func,
  onKeyDown: _react.PropTypes.func,
  customAtomicBlockRendererFn: _react.PropTypes.func,
  atomicBlockRenderMap: _react.PropTypes.objectOf(_react.PropTypes.oneOfType([_react.PropTypes.element, _react.PropTypes.func])),
  onCompleteFileUpload: _react.PropTypes.func,
  priorityEmojiShortnames: _react.PropTypes.arrayOf(_react.PropTypes.string),
  emojiImagePath: _react.PropTypes.string
};
RichTextEditor.defaultProps = {
  placeholder: 'Contents here...',
  readOnly: false,
  initialHtml: ''
};
exports.default = RichTextEditor;