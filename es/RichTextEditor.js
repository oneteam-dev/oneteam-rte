function _instanceof(left, right) { if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) { return right[Symbol.hasInstance](left); } else { return left instanceof right; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _classCallCheck(instance, Constructor) { if (!_instanceof(instance, Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

import React, { Component, Children, cloneElement } from 'react';
import { userMentionType, groupMentionType } from 'react-oneteam/lib/Mention';
import ErrorBoundary from 'react-minimal-error-boundary';
import PropTypes from 'prop-types';
import Editor from 'draft-js-plugins-editor';
import { INLINE_STYLES } from 'draft-js-oneteam-rte-plugin/lib/constants';
import * as modifiers from 'draft-js-oneteam-rte-plugin/lib/modifiers';
import { emojioneList } from 'emojione';
import classNames from 'classnames';
import { getCurrentBlockType, hasCurrentInlineStyle, createEditorState, updateEditorState, mentionSuggestionsFilter } from './utils';
import { contentToHTML, htmlToMarkdown } from './encoding';
import createPlugins from './plugins';
import MentionSuggestionsEntry from './plugins/mention/components/MentionSuggestionsEntry';
import 'draft-js/dist/Draft.css';
import 'draft-js-oneteam-rte-plugin/lib/plugin.css';
import 'draft-js-checkable-list-plugin/lib/plugin.css';
import '@sugarshin/draft-js-emoji-plugin/lib/plugin.css';
import 'draft-js-mention-plugin/lib/plugin.css';
import 'react-oneteam/lib/react-oneteam.css';

var RichTextEditor =
/*#__PURE__*/
function (_Component) {
  _inherits(RichTextEditor, _Component);

  _createClass(RichTextEditor, [{
    key: "html",
    set: function set(html) {
      var _state = this.state,
          editorState = _state.editorState,
          mentionSuggestions = _state.mentionSuggestions;
      var newEditorState = updateEditorState(editorState, html, mentionSuggestions);
      this.setState({
        editorState: newEditorState
      });
    },
    get: function get() {
      return contentToHTML(this._contentState);
    }
  }, {
    key: "markdown",
    get: function get() {
      return htmlToMarkdown(this.html);
    }
  }, {
    key: "_editorState",
    get: function get() {
      return this.state.editorState;
    }
  }, {
    key: "_contentState",
    get: function get() {
      return this._editorState.getCurrentContent();
    }
  }, {
    key: "plugins",
    get: function get() {
      return this._plugins;
    }
  }, {
    key: "oneteamRTEPlugin",
    get: function get() {
      return this.plugins.oneteamRTEPlugin;
    }
  }, {
    key: "emojiPlugin",
    get: function get() {
      return this.plugins.emojiPlugin;
    }
  }, {
    key: "mentionPlugin",
    get: function get() {
      return this.plugins.mentionPlugin;
    }
  }, {
    key: "firstBlockText",
    get: function get() {
      return this._contentState.getFirstBlock().getText();
    }
  }, {
    key: "modifiers",
    get: function get() {
      return modifiers;
    }
  }, {
    key: "plainText",
    get: function get() {
      return this._contentState.getPlainText();
    }
  }]);

  function RichTextEditor(props) {
    var _this;

    _classCallCheck(this, RichTextEditor);

    _this = _possibleConstructorReturn(this, (RichTextEditor.__proto__ || Object.getPrototypeOf(RichTextEditor)).call(this, props));
    Object.defineProperty(_assertThisInitialized(_this), "closeInsertLinkInput", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: function value() {
        return _this.setState({
          isOpenInsertLinkInput: false
        });
      }
    });
    Object.defineProperty(_assertThisInitialized(_this), "toggleInsertLinkInput", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: function value() {
        return _this.setState({
          isOpenInsertLinkInput: !_this.state.isOpenInsertLinkInput
        });
      }
    });
    Object.defineProperty(_assertThisInitialized(_this), "handleContainerMouseDown", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: function value() {
        if (_this.state.isOpenInsertLinkInput) {
          _this.closeInsertLinkInput();
        }
      }
    });
    Object.defineProperty(_assertThisInitialized(_this), "handleMentionSearchChange", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: function value(_ref) {
        var _value = _ref.value;

        _this.setState({
          mentionSuggestions: mentionSuggestionsFilter(_value, _this.props.rawMentions)
        });
      }
    });
    Object.defineProperty(_assertThisInitialized(_this), "focus", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: function value() {
        if (_this.editor) {
          _this.editor.focus();
        }
      }
    });
    Object.defineProperty(_assertThisInitialized(_this), "blur", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: function value() {
        if (_this.editor) {
          _this.editor.blur();
        }
      }
    });
    var mentionSuggestions = _this.props.rawMentions;
    var editorState = createEditorState(_this.props.initialHtml, null, {
      mentions: mentionSuggestions
    });
    _this.state = {
      editorState: editorState,
      isOpenInsertLinkInput: false,
      mentionSuggestions: mentionSuggestions
    };
    _this._plugins = createPlugins({
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
          return _extends({}, ret, _defineProperty({}, shortname, emojioneList[shortname].unicode));
        }, {}) : undefined,
        imagePath: _this.props.emojiImagePath
      }
    });

    _this.changeEditorState = function (editorState) {
      return _this.setState({
        editorState: editorState
      }, _this.props.onChange);
    };

    _this.getCurrentBlockType = function () {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return getCurrentBlockType.apply(void 0, [_this.state.editorState].concat(args));
    };

    _this.hasCurrentInlineStyle = function () {
      for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }

      return hasCurrentInlineStyle.apply(void 0, [_this.state.editorState].concat(args));
    };

    Object.keys(_this.oneteamRTEPlugin.modifiers).forEach(function (k) {
      _this[k] = _this.oneteamRTEPlugin.modifiers[k];
    });
    return _this;
  }

  _createClass(RichTextEditor, [{
    key: "getCurrentInlineStyles",
    value: function getCurrentInlineStyles() {
      var ret = [];

      for (var key in INLINE_STYLES) {
        var value = INLINE_STYLES[key];

        if (this.hasCurrentInlineStyle(value)) {
          ret.push(value);
        }
      }

      return ret;
    }
  }, {
    key: "renderChildren",
    value: function renderChildren() {
      var _this2 = this;

      var _state2 = this.state,
          editorState = _state2.editorState,
          isOpenInsertLinkInput = _state2.isOpenInsertLinkInput;
      var children = Children.map(this.props.children || [], function (child) {
        return cloneElement(child, {
          editorState: editorState,
          isOpenInsertLinkInput: isOpenInsertLinkInput,
          onChange: _this2.changeEditorState,
          toggleInsertLinkInput: _this2.toggleInsertLinkInput
        });
      });
      return children;
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      var editorState = this.state.editorState;
      var _props = this.props,
          className = _props.className,
          readOnly = _props.readOnly,
          placeholder = _props.placeholder,
          onError = _props.onError,
          onRerenderedAfterError = _props.onRerenderedAfterError,
          stripPastedStyles = _props.stripPastedStyles;
      var bodyClassName = classNames('rich-text-editor-body', {
        'RichEditor-hidePlaceholder': this._shouldHidePlaceholder()
      }, className);
      return React.createElement(ErrorBoundary, {
        rerender: true,
        onError: onError,
        onRerendered: onRerenderedAfterError
      }, React.createElement("div", {
        className: "rich-text-editor",
        id: "rich-text-editor"
      }, this.renderChildren(), React.createElement("div", {
        className: bodyClassName,
        onMouseDown: this.handleContainerMouseDown
      }, React.createElement(Editor, {
        plugins: this._plugins.all,
        ref: function ref(c) {
          return _this3.editor = c;
        },
        editorState: editorState,
        readOnly: readOnly,
        onChange: this.changeEditorState,
        onKeyDown: this.props.onKeyDown,
        placeholder: placeholder,
        stripPastedStyles: stripPastedStyles
      }), React.createElement(this.emojiPlugin.EmojiSuggestions, null), React.createElement(this.mentionPlugin.MentionSuggestions, {
        suggestions: this.state.mentionSuggestions,
        onSearchChange: this.handleMentionSearchChange,
        entryComponent: MentionSuggestionsEntry
      }))));
    }
  }, {
    key: "_shouldHidePlaceholder",
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
}(Component);

Object.defineProperty(RichTextEditor, "propTypes", {
  configurable: true,
  enumerable: true,
  writable: true,
  value: {
    initialHtml: PropTypes.string,
    onChange: PropTypes.func,
    className: PropTypes.string,
    children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.element), PropTypes.element]),
    placeholder: PropTypes.string,
    readOnly: PropTypes.bool,
    onReturnWithCommand: PropTypes.func,
    onPastedFiles: PropTypes.func,
    onKeyDown: PropTypes.func,
    onError: PropTypes.func,
    onRerenderedAfterError: PropTypes.func,
    customAtomicBlockRendererFn: PropTypes.func,
    atomicBlockRenderMap: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.element, PropTypes.func])),
    onCompleteFileUpload: PropTypes.func,
    priorityEmojiShortnames: PropTypes.arrayOf(PropTypes.string),
    emojiImagePath: PropTypes.string,
    rawMentions: PropTypes.arrayOf(PropTypes.oneOfType([userMentionType, groupMentionType])),
    disableWebCardCreation: PropTypes.bool,
    stripPastedStyles: PropTypes.bool
  }
});
Object.defineProperty(RichTextEditor, "defaultProps", {
  configurable: true,
  enumerable: true,
  writable: true,
  value: {
    placeholder: 'Contents here...',
    readOnly: false,
    initialHtml: '',
    stripPastedStyles: false
  }
});
export { RichTextEditor as default };