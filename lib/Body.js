'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _draftJs = require('draft-js');

var _oneteamRteUtils = require('oneteam-rte-utils');

var _isFunction = require('lodash/isFunction');

var _isFunction2 = _interopRequireDefault(_isFunction);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _CheckableListItem = require('./blocks/CheckableListItem');

var _CheckableListItem2 = _interopRequireDefault(_CheckableListItem);

var _AtomicImage = require('./blocks/AtomicImage');

var _AtomicImage2 = _interopRequireDefault(_AtomicImage);

var _AtomicIFrame = require('./blocks/AtomicIFrame');

var _AtomicIFrame2 = _interopRequireDefault(_AtomicIFrame);

var _DownloadLink = require('./blocks/DownloadLink');

var _DownloadLink2 = _interopRequireDefault(_DownloadLink);

var _functions = require('./functions');

var _utils = require('./utils');

var _urlRegex = require('./helpers/urlRegex');

var _urlRegex2 = _interopRequireDefault(_urlRegex);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _global = global,
    navigator = _global.navigator;

var userAgent = navigator ? navigator.userAgent : null;

var Body = function (_Component) {
  _inherits(Body, _Component);

  _createClass(Body, [{
    key: '__handleBlur__REACT_HOT_LOADER__',
    value: function __handleBlur__REACT_HOT_LOADER__() {
      var _this2 = this;

      // Not changed state if do not do this
      setTimeout(function () {
        var newEditorState = _this2._insertWebCardsIfNeeded();
        if (newEditorState) {
          _this2._changeEditorState(newEditorState);
        }
      }, 0);
      return false;
    }
  }, {
    key: '__handlePastedText__REACT_HOT_LOADER__',
    value: function __handlePastedText__REACT_HOT_LOADER__(text) {
      var _this3 = this;

      var urls = text.match(_urlRegex2.default);
      if (urls) {
        // Not changed state if do not do this
        setTimeout(function () {
          _this3._changeEditorState((0, _functions.insertWebCards)(_this3.props.editorState, urls));
        }, 0);
      }
      return false;
    }
  }, {
    key: '__handleContainerClick__REACT_HOT_LOADER__',
    value: function __handleContainerClick__REACT_HOT_LOADER__(ev) {
      var _this4 = this;

      // FIXME ;(   does not respond check box in the Safari or Firefox
      if (this._shouldUnfocusAfterClicking(ev)) {
        this.blur();
        setTimeout(function () {
          return _this4.focus();
        }, 100);
      }
    }
  }, {
    key: '__handleContainerMouseDown__REACT_HOT_LOADER__',
    value: function __handleContainerMouseDown__REACT_HOT_LOADER__() {
      if ((0, _isFunction2.default)(this.props.closeInsertLinkInput)) {
        this.props.closeInsertLinkInput();
      }
    }
  }, {
    key: '__handleKeyCommand__REACT_HOT_LOADER__',
    value: function __handleKeyCommand__REACT_HOT_LOADER__(command) {
      var _this5 = this;

      // eslint-disable-line complexity
      var editorState = this.props.editorState;

      if (command === 'backspace') {
        var _ret = function () {
          var contentState = editorState.getCurrentContent();
          var selection = editorState.getSelection();
          var currentBlock = contentState.getBlockForKey(selection.getStartKey());
          var currentBlockType = currentBlock.getType();
          var blockLength = currentBlock.getLength();

          if (_oneteamRteUtils.LIST_BLOCK_TYPES.some(function (t) {
            return t === currentBlockType;
          }) && blockLength === 0) {
            var _newEditorState = currentBlock.getDepth() === 0 ? (0, _functions.removeBlockStyle)(editorState) : (0, _functions.adjustBlockDepth)(editorState, contentState, selection, -1, _oneteamRteUtils.MAX_LIST_DEPTH);
            if (_newEditorState) {
              _this5._changeEditorState(_newEditorState);
              return {
                v: true
              };
            }
          }

          var firstBlockKey = contentState.getBlockMap().first().getKey();
          if (blockLength === 0 && currentBlock.getKey() === firstBlockKey) {
            var _newEditorState2 = (0, _functions.removeBlockStyle)(editorState);
            if (_newEditorState2) {
              _this5._changeEditorState(_newEditorState2);
              return {
                v: true
              };
            }
          }
        }();

        if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
      }

      var newEditorState = _draftJs.RichUtils.handleKeyCommand(editorState, command);
      if (newEditorState) {
        this._changeEditorState(newEditorState);
        return true;
      }
      return false;
    }
  }, {
    key: '__handlePastedFiles__REACT_HOT_LOADER__',
    value: function __handlePastedFiles__REACT_HOT_LOADER__(files) {
      if ((0, _isFunction2.default)(this.props.onPastedFiles)) {
        this.props.onPastedFiles(files);
        return true;
      }
      return false;
    }
  }, {
    key: '__handleReturn__REACT_HOT_LOADER__',
    value: function __handleReturn__REACT_HOT_LOADER__(ev) {
      if (this._handleReturnSubmit(ev)) {
        return true;
      }

      if (this._handleReturnSpecialBlock()) {
        return true;
      }

      if (this._handleReturnListItem()) {
        return true;
      }

      if (this._handleReturnInsertWebCard()) {
        return true;
      }

      if (this._handleReturnSplitBlockIfCursorAtStart()) {
        return true;
      }

      return false;
    }
  }, {
    key: '__handleTab__REACT_HOT_LOADER__',
    value: function __handleTab__REACT_HOT_LOADER__(ev) {
      if (this._insertIndent(ev)) {
        return true;
      }
      var editorState = this.props.editorState;

      var newEditorState = _draftJs.RichUtils.onTab(ev, editorState, _oneteamRteUtils.MAX_LIST_DEPTH);
      if (newEditorState !== editorState) {
        this._changeEditorState(newEditorState);
      }
    }
  }, {
    key: '__blockRendererFn__REACT_HOT_LOADER__',
    value: function __blockRendererFn__REACT_HOT_LOADER__(block) {
      if (this._shouldRenderAtomicBlock(block)) {
        return this._atomicBlockRenderer(block);
      }

      if (this._shouldRenderCheckableListItem(block)) {
        return this._checkableListItemRenderer(block);
      }

      if ((0, _isFunction2.default)(this.props.blockRendererFn)) {
        return this.props.blockRendererFn(block);
      }

      return null;
    }
  }, {
    key: '__blockStyleFn__REACT_HOT_LOADER__',
    value: function __blockStyleFn__REACT_HOT_LOADER__(block) {
      if ((0, _isFunction2.default)(this.props.blockStyleFn)) {
        return this.props.blockStyleFn(block);
      }
      var type = block.getType();
      switch (type) {
        case _oneteamRteUtils.BLOCK_TYPES.CHECKABLE_LIST_ITEM:
        case _oneteamRteUtils.OLD_BLOCK_TYPES.ALIGN_CENTER:
        case _oneteamRteUtils.OLD_BLOCK_TYPES.ALIGN_RIGHT:
        case _oneteamRteUtils.OLD_BLOCK_TYPES.ALIGN_JUSTIFY:
          return type;
        default:
          return '';
      }
    }
  }, {
    key: '__handleChangeEditor__REACT_HOT_LOADER__',


    // Public
    value: function __handleChangeEditor__REACT_HOT_LOADER__(editorState) {
      return this._changeEditorState(editorState);
    }
  }, {
    key: '__focus__REACT_HOT_LOADER__',
    value: function __focus__REACT_HOT_LOADER__() {
      return this.editor.focus();
    }
  }, {
    key: '__blur__REACT_HOT_LOADER__',
    value: function __blur__REACT_HOT_LOADER__() {
      return this.editor.blur();
    }
  }]);

  function Body(props) {
    _classCallCheck(this, Body);

    var _this = _possibleConstructorReturn(this, (Body.__proto__ || Object.getPrototypeOf(Body)).call(this, props));

    _this.handleBlur = function () {
      return _this.__handleBlur__REACT_HOT_LOADER__.apply(_this, arguments);
    };

    _this.handlePastedText = function () {
      return _this.__handlePastedText__REACT_HOT_LOADER__.apply(_this, arguments);
    };

    _this.handleContainerClick = function () {
      return _this.__handleContainerClick__REACT_HOT_LOADER__.apply(_this, arguments);
    };

    _this.handleContainerMouseDown = function () {
      return _this.__handleContainerMouseDown__REACT_HOT_LOADER__.apply(_this, arguments);
    };

    _this.handleKeyCommand = function () {
      return _this.__handleKeyCommand__REACT_HOT_LOADER__.apply(_this, arguments);
    };

    _this.handlePastedFiles = function () {
      return _this.__handlePastedFiles__REACT_HOT_LOADER__.apply(_this, arguments);
    };

    _this.handleReturn = function () {
      return _this.__handleReturn__REACT_HOT_LOADER__.apply(_this, arguments);
    };

    _this.handleTab = function () {
      return _this.__handleTab__REACT_HOT_LOADER__.apply(_this, arguments);
    };

    _this.blockRendererFn = function () {
      return _this.__blockRendererFn__REACT_HOT_LOADER__.apply(_this, arguments);
    };

    _this.blockStyleFn = function () {
      return _this.__blockStyleFn__REACT_HOT_LOADER__.apply(_this, arguments);
    };

    _this.handleChangeEditor = function () {
      return _this.__handleChangeEditor__REACT_HOT_LOADER__.apply(_this, arguments);
    };

    _this.focus = function () {
      return _this.__focus__REACT_HOT_LOADER__.apply(_this, arguments);
    };

    _this.blur = function () {
      return _this.__blur__REACT_HOT_LOADER__.apply(_this, arguments);
    };

    return _this;
  }

  _createClass(Body, [{
    key: 'render',
    value: function render() {
      var _this6 = this;

      return _react2.default.createElement(
        'div',
        {
          className: (0, _classnames2.default)('rich-text-editor-body', {
            'RichEditor-hidePlaceholder': this._shouldHidePlaceholder()
          }, this.props.className),
          onClick: this.handleContainerClick,
          onMouseDown: this.handleContainerMouseDown },
        _react2.default.createElement(_draftJs.Editor, {
          ref: function ref(c) {
            return _this6.editor = c;
          },
          blockRendererFn: this.blockRendererFn,
          blockStyleFn: this.blockStyleFn,
          editorState: this.props.editorState,
          readOnly: this.props.readOnly,
          handleKeyCommand: this.handleKeyCommand,
          handlePastedFiles: this.handlePastedFiles,
          handlePastedText: this.handlePastedText,
          handleReturn: this.handleReturn,
          onChange: this.handleChangeEditor,
          onTab: this.handleTab,
          onBlur: this.handleBlur,
          placeholder: this.props.placeholder,
          customStyleMap: this.props.customStyleMap })
      );
    }
  }, {
    key: '_shouldUnfocusAfterClicking',
    value: function _shouldUnfocusAfterClicking(ev) {
      return (/applewebkit|safari|firefox/i.test(userAgent) && ev.target.nodeName === 'INPUT' && ev.target.type === 'checkbox'
      );
    }
  }, {
    key: '_shouldHidePlaceholder',
    value: function _shouldHidePlaceholder() {
      var contentState = this.props.editorState.getCurrentContent();
      if (!contentState.hasText()) {
        if (contentState.getBlockMap().first().getType() !== _oneteamRteUtils.BLOCK_TYPES.UNSTYLED) {
          return true;
        }
      }
      return false;
    }
  }, {
    key: '_shouldRenderAtomicBlock',
    value: function _shouldRenderAtomicBlock(block) {
      return block.getType() === _oneteamRteUtils.BLOCK_TYPES.ATOMIC && block.getEntityAt(0);
    }
  }, {
    key: '_shouldRenderCheckableListItem',
    value: function _shouldRenderCheckableListItem(block) {
      return block.getType() === _oneteamRteUtils.BLOCK_TYPES.CHECKABLE_LIST_ITEM;
    }
  }, {
    key: '_atomicBlockRenderer',
    value: function _atomicBlockRenderer(block) {
      var entity = _draftJs.Entity.get(block.getEntityAt(0));
      var type = entity.getType();
      var data = entity.getData();

      switch (type) {
        case _oneteamRteUtils.ENTITY_TYPES.IMAGE:
          return {
            component: _AtomicImage2.default,
            props: { src: data.src, alt: data.alt },
            editable: false
          };
        case _oneteamRteUtils.ENTITY_TYPES.DOWNLOAD_LINK:
          return {
            component: _DownloadLink2.default,
            props: data,
            editable: true
          };
        case _oneteamRteUtils.ENTITY_TYPES.IFRAME:
          return {
            component: _AtomicIFrame2.default,
            props: data,
            editable: false
          };
        default:
          if ((0, _isFunction2.default)(this.props.customAtomicBlockRendererFn)) {
            return this.props.customAtomicBlockRendererFn(entity, block);
          }
          return null;
      }
    }
  }, {
    key: '_checkableListItemRenderer',
    value: function _checkableListItemRenderer(block) {
      var _this7 = this;

      var blockKey = block.getKey();
      var checkedState = this.props.checkedState;

      return {
        component: _CheckableListItem2.default,
        props: {
          checked: !!checkedState[blockKey],
          onChangeChecked: function onChangeChecked(checked) {
            var newCheckedState = _extends({}, checkedState, _defineProperty({}, blockKey, checked));
            _this7._changeCheckedState(newCheckedState);
          }
        }
      };
    }
  }, {
    key: '_insertIndent',
    value: function _insertIndent(ev) {
      var editorState = this.props.editorState;

      var selection = editorState.getSelection();
      var content = editorState.getCurrentContent();
      var blockKey = selection.getStartKey();
      var block = content.getBlockForKey(blockKey);

      if (!(0, _utils.isListItem)(block)) {
        ev.preventDefault();
        var newEditorState = (0, _functions.insertText)(editorState, '    ');
        if (newEditorState !== editorState) {
          this._changeEditorState(newEditorState);
          return true;
        }
      }
      return false;
    }
  }, {
    key: '_insertWebCardsIfNeeded',
    value: function _insertWebCardsIfNeeded() {
      var editorState = this.props.editorState;

      var selection = editorState.getSelection();
      var block = (0, _utils.getCurrentBlock)(editorState);
      var webcardRendered = block.getData().get('webcardRendered');
      var urls = block.getText().match(_urlRegex2.default);
      if (!webcardRendered && urls && (0, _utils.isCursorAtEnd)(block, selection)) {
        var content = editorState.getCurrentContent();
        var newContent = _draftJs.Modifier.setBlockData(content, selection, { webcardRendered: true });
        return (0, _functions.insertWebCards)(_draftJs.EditorState.push(editorState, newContent, 'change-block-data'), urls);
      }
      return null;
    }
  }, {
    key: '_handleReturnInsertWebCard',
    value: function _handleReturnInsertWebCard() {
      var newEditorState = this._insertWebCardsIfNeeded();
      if (newEditorState) {
        this._changeEditorState(newEditorState);
        return true;
      }
      return false;
    }
  }, {
    key: '_handleReturnListItem',
    value: function _handleReturnListItem() {
      var editorState = this.props.editorState;

      var selection = editorState.getSelection();
      var content = editorState.getCurrentContent();
      var block = content.getBlockForKey(selection.getStartKey());

      if ((0, _utils.isListItem)(block)) {
        var key = selection.getAnchorKey();
        if (key !== selection.getFocusKey()) {
          return false;
        }

        var _block = content.getBlockForKey(key);

        if (_block.getLength() === 0) {
          if (_block.getDepth() === 0) {
            var newEditorState = (0, _functions.removeBlockStyle)(editorState);
            if (newEditorState) {
              this._changeEditorState(newEditorState);
              return true;
            }
          } else {
            var _newEditorState3 = (0, _functions.adjustBlockDepth)(editorState, content, selection, -1, _oneteamRteUtils.MAX_LIST_DEPTH);
            if (_newEditorState3) {
              this._changeEditorState(_newEditorState3);
              return true;
            }
          }
        }
      }
      return false;
    }
  }, {
    key: '_handleReturnSubmit',
    value: function _handleReturnSubmit(ev) {
      if ((0, _isFunction2.default)(this.props.onEnterKeyDownWithCommand) && _draftJs.KeyBindingUtil.hasCommandModifier(ev)) {
        this.props.onEnterKeyDownWithCommand(ev);
        return true;
      }
      return false;
    }
  }, {
    key: '_handleReturnSpecialBlock',
    value: function _handleReturnSpecialBlock() {
      var editorState = this.props.editorState;

      var selection = editorState.getSelection();
      if (selection.isCollapsed()) {
        var contentState = editorState.getCurrentContent();
        var blockKey = selection.getStartKey();
        var block = contentState.getBlockForKey(blockKey);
        if (!(0, _utils.isListItem)(block) && block.getType() !== _oneteamRteUtils.BLOCK_TYPES.UNSTYLED) {
          if ((0, _utils.isCursorAtEnd)(block, selection)) {
            var newEditorState = (0, _functions.insertBlockAfter)(editorState, blockKey, _oneteamRteUtils.BLOCK_TYPES.UNSTYLED);
            this._changeEditorState(newEditorState);
            return true;
          }
        }
      }
      return false;
    }
  }, {
    key: '_handleReturnSplitBlockIfCursorAtStart',
    value: function _handleReturnSplitBlockIfCursorAtStart() {
      var editorState = this.props.editorState;

      var selectionState = editorState.getSelection();
      if (!selectionState.isCollapsed() || !(0, _utils.isCursorAtStart)(selectionState)) {
        return false;
      }
      this._changeEditorState((0, _functions.splitBlockInContentStateIfCursorAtStart)(editorState));
      return true;
    }
  }, {
    key: '_changeEditorState',
    value: function _changeEditorState(editorState) {
      if ((0, _isFunction2.default)(this.props.changeEditorState)) {
        this.props.changeEditorState(editorState);
      }
    }
  }, {
    key: '_changeCheckedState',
    value: function _changeCheckedState(checkedState) {
      if ((0, _isFunction2.default)(this.props.changeCheckedState)) {
        this.props.changeCheckedState(checkedState);
      }
    }
  }]);

  return Body;
}(_react.Component);

Body.propTypes = {
  editorState: _react.PropTypes.instanceOf(_draftJs.EditorState),
  checkedState: _react.PropTypes.objectOf(_react.PropTypes.bool),
  changeEditorState: _react.PropTypes.func,
  changeCheckedState: _react.PropTypes.func,
  closeInsertLinkInput: _react.PropTypes.func,

  placeholder: _react.PropTypes.string,
  readOnly: _react.PropTypes.bool,
  className: _react.PropTypes.string,
  customStyleMap: _react.PropTypes.objectOf(_react.PropTypes.object),
  blockRendererFn: _react.PropTypes.func,
  blockStyleFn: _react.PropTypes.func,
  onEnterKeyDownWithCommand: _react.PropTypes.func,
  onPastedFiles: _react.PropTypes.func,
  customAtomicBlockRendererFn: _react.PropTypes.func
};
Body.defaultProps = {
  placeholder: 'Contents here...',
  readOnly: false,
  customStyleMap: {}
};
var _default = Body;
exports.default = _default;
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(navigator, 'navigator', 'src/Body.js');

  __REACT_HOT_LOADER__.register(userAgent, 'userAgent', 'src/Body.js');

  __REACT_HOT_LOADER__.register(Body, 'Body', 'src/Body.js');

  __REACT_HOT_LOADER__.register(_default, 'default', 'src/Body.js');
}();

;