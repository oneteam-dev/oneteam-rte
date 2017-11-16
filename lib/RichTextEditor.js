'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Mention = require('react-oneteam/lib/Mention');

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _immutable = require('immutable');

var _draftJsPluginsEditor = require('draft-js-plugins-editor');

var _draftJsPluginsEditor2 = _interopRequireDefault(_draftJsPluginsEditor);

var _constants = require('draft-js-oneteam-rte-plugin/lib/constants');

var _modifiers = require('draft-js-oneteam-rte-plugin/lib/modifiers');

var modifiers = _interopRequireWildcard(_modifiers);

var _emojione = require('emojione');

var _lodash = require('lodash');

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _utils = require('./utils');

var _encoding = require('./encoding');

var _plugins = require('./plugins');

var _plugins2 = _interopRequireDefault(_plugins);

var _MentionSuggestionsEntry = require('./plugins/mention/components/MentionSuggestionsEntry');

var _MentionSuggestionsEntry2 = _interopRequireDefault(_MentionSuggestionsEntry);

require('draft-js/dist/Draft.css');

require('draft-js-oneteam-rte-plugin/lib/plugin.css');

require('draft-js-checkable-list-plugin/lib/plugin.css');

require('draft-js-emoji-plugin/lib/plugin.css');

require('draft-js-mention-plugin/lib/plugin.css');

require('react-oneteam/lib/react-oneteam.css');

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
      var _state = this.state,
          editorState = _state.editorState,
          mentionSuggestions = _state.mentionSuggestions;

      var newEditorState = (0, _utils.updateEditorState)(editorState, html, mentionSuggestions);
      this.setState({ editorState: newEditorState });
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
    key: 'mentionPlugin',
    get: function get() {
      return this.plugins.mentionPlugin;
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

    _this.handleMentionSearchChange = function (_ref) {
      var value = _ref.value;

      _this.setState({
        mentionSuggestions: (0, _utils.mentionSuggestionsFilter)(value, (0, _immutable.fromJS)(_this.props.rawMentions))
      });
    };

    _this.focus = function () {
      return _this.editor.focus();
    };

    _this.blur = function () {
      return _this.editor.blur();
    };

    var mentionSuggestions = (0, _immutable.fromJS)(_this.props.rawMentions);
    var editorState = (0, _utils.createEditorState)(_this.props.initialHtml, null, { mentions: mentionSuggestions });
    _this.state = {
      editorState: editorState,
      isOpenInsertLinkInput: false,
      mentionSuggestions: mentionSuggestions
    };

    _this._plugins = (0, _plugins2.default)({
      oneteamRTE: {
        customAtomicBlockRendererFn: _this.props.customAtomicBlockRendererFn,
        onReturnWithCommand: _this.props.onReturnWithCommand,
        onPastedFiles: _this.props.onPastedFiles,
        atomicBlockRenderMap: _this.props.atomicBlockRenderMap,
        onCompleteFileUpload: _this.props.onCompleteFileUpload,
        disableWebCardCreation: _this.props.disableWebCardCreation
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

      if ((0, _lodash.isFunction)(onChange) && triggerLock === 0) {
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

      var _state2 = this.state,
          editorState = _state2.editorState,
          isOpenInsertLinkInput = _state2.isOpenInsertLinkInput;


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
          _react2.default.createElement(_draftJsPluginsEditor2.default, _extends({}, (0, _lodash.omit)(this.props, Object.keys(RichTextEditor.propTypes)), {
            plugins: this._plugins.all,
            ref: function ref(c) {
              return _this3.editor = c;
            },
            editorState: editorState,
            readOnly: readOnly,
            onChange: this.changeEditorState,
            onKeyDown: this.props.onKeyDown,
            placeholder: placeholder
          })),
          _react2.default.createElement(this.emojiPlugin.EmojiSuggestions, null),
          _react2.default.createElement(this.mentionPlugin.MentionSuggestions, {
            suggestions: this.state.mentionSuggestions,
            onSearchChange: this.handleMentionSearchChange,
            entryComponent: _MentionSuggestionsEntry2.default
          })
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
  initialHtml: _propTypes2.default.string,
  onChange: _propTypes2.default.func,
  className: _propTypes2.default.string,
  children: _propTypes2.default.oneOfType([_propTypes2.default.arrayOf(_propTypes2.default.element), _propTypes2.default.element]),
  placeholder: _propTypes2.default.string,
  readOnly: _propTypes2.default.bool,
  onReturnWithCommand: _propTypes2.default.func,
  onPastedFiles: _propTypes2.default.func,
  onKeyDown: _propTypes2.default.func,
  customAtomicBlockRendererFn: _propTypes2.default.func,
  atomicBlockRenderMap: _propTypes2.default.objectOf(_propTypes2.default.oneOfType([_propTypes2.default.element, _propTypes2.default.func])),
  onCompleteFileUpload: _propTypes2.default.func,
  priorityEmojiShortnames: _propTypes2.default.arrayOf(_propTypes2.default.string),
  emojiImagePath: _propTypes2.default.string,
  rawMentions: _propTypes2.default.arrayOf(_propTypes2.default.oneOfType([_Mention.userMentionType, _Mention.groupMentionType])),
  AvatarComponent: _propTypes2.default.oneOfType([_propTypes2.default.element, _propTypes2.default.func]),
  disableWebCardCreation: _propTypes2.default.bool
};
RichTextEditor.defaultProps = {
  placeholder: 'Contents here...',
  readOnly: false,
  initialHtml: ''
};
exports.default = RichTextEditor;