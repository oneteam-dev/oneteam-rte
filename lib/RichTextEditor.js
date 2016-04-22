'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _assign2 = require('lodash/assign');

var _assign3 = _interopRequireDefault(_assign2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _draftJs = require('draft-js');

var _draftJsExportHtml = require('draft-js-export-html');

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _Toolbar = require('./Toolbar');

var _Toolbar2 = _interopRequireDefault(_Toolbar);

var _CheckableListItem = require('./blocks/CheckableListItem');

var _CheckableListItem2 = _interopRequireDefault(_CheckableListItem);

var _AtomicImage = require('./blocks/AtomicImage');

var _AtomicImage2 = _interopRequireDefault(_AtomicImage);

var _AtomicLink = require('./blocks/AtomicLink');

var _AtomicLink2 = _interopRequireDefault(_AtomicLink);

var _Link = require('./blocks/Link');

var _Link2 = _interopRequireDefault(_Link);

var _utils = require('./utils');

var _constants = require('./constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var RichTextEditor = function (_Component) {
  _inherits(RichTextEditor, _Component);

  function RichTextEditor(props) {
    _classCallCheck(this, RichTextEditor);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(RichTextEditor).call(this, props));

    var decorator = new _draftJs.CompositeDecorator([{
      strategy: _utils.findLinkEntities,
      component: _Link2.default
    }]);
    var editorState = (0, _utils.createEditorState)(_this.props.initialHtml.replace(/>\s+</g, '><'), decorator);
    var checkedState = (0, _utils.createCheckedState)(editorState.getCurrentContent().getBlocksAsArray());

    _this.state = { editorState: editorState, checkedState: checkedState };

    _this.focus = function () {
      return _this.refs.editor.focus();
    };
    _this.onChange = function (editorState) {
      return _this.setState({ editorState: editorState });
    };
    _this.handleKeyCommand = function (command) {
      return _this._handleKeyCommand(command);
    };
    _this.handlePastedFiles = function (files) {
      return _this._handlePastedFiles(files);
    };
    _this.handleReturn = function (ev) {
      return _this._handleReturn(ev);
    };
    _this.toggleBlockType = function (type) {
      return _this._toggleBlockType(type);
    };
    _this.toggleInlineStyle = function (style) {
      return _this._toggleInlineStyle(style);
    };
    _this.onTab = function (ev) {
      return _this._handleTab(ev);
    };
    _this.insertImage = function (file) {
      return _this._insertImage(file);
    };
    _this.insertDownloadLink = function (file) {
      return _this._insertDownloadLink(file);
    };
    _this.blockRendererFn = function (block) {
      return _this._blockRendererFn(block);
    };
    return _this;
  }

  _createClass(RichTextEditor, [{
    key: 'render',
    value: function render() {
      var editorState = this.state.editorState;

      var firstBlockType = editorState.getCurrentContent().getBlockMap().first().getType();

      return _react2.default.createElement(
        'div',
        { id: 'rich-editor', className: (0, _classnames2.default)({
            'RichEditor-hidePlaceholder': firstBlockType !== _constants.BLOCK_TYPES.UNSTYLED
          }), onClick: this.focus },
        _react2.default.createElement(_Toolbar2.default, {
          editorState: editorState,
          onClickAddImage: this.props.onClickAddImage,
          onClickFileAttach: this.props.onClickFileAttach,
          onSelectHeading: this.toggleBlockType,
          onClickInlineStyle: this.toggleInlineStyle,
          onClickBlockType: this.toggleBlockType,
          headingLabel: this.props.headingLabel,
          useDefaultButtons: this.props.useDefaultButtons }),
        _react2.default.createElement(
          'div',
          { className: 'rich-editor-body' },
          _react2.default.createElement(_draftJs.Editor, {
            blockRendererFn: this.blockRendererFn,
            blockStyleFn: this.blockStyleFn,
            editorState: editorState,
            readOnly: this.props.readOnly,
            handleKeyCommand: this.handleKeyCommand,
            handlePastedFiles: this.handlePastedFiles,
            handleReturn: this.handleReturn,
            onChange: this.onChange,
            onTab: this.onTab,
            placeholder: this.props.placeholder,
            ref: 'editor',
            customStyleMap: _constants.OLD_INLINE_STYLES })
        )
      );
    }
  }, {
    key: 'componentWillMount',
    value: function componentWillMount() {
      this.onChange((0, _utils.moveSelectionToEnd)(this.state.editorState));
    }
  }, {
    key: 'blockStyleFn',
    value: function blockStyleFn(block) {
      // eslint-disable-line complexity
      switch (block.getType()) {
        case _constants.BLOCK_TYPES.CHECKABLE_LIST_ITEM:
          return _constants.BLOCK_TYPES.CHECKABLE_LIST_ITEM;
        case _constants.OLD_BLOCK_TYPES.ALIGN_CENTER:
          return _constants.OLD_BLOCK_TYPES.ALIGN_CENTER;
        case _constants.OLD_BLOCK_TYPES.ALIGN_RIGHT:
          return _constants.OLD_BLOCK_TYPES.ALIGN_RIGHT;
        case _constants.OLD_BLOCK_TYPES.ALIGN_JUSTIFY:
          return _constants.OLD_BLOCK_TYPES.ALIGN_JUSTIFY;
        default:
          return '';
      }
    }
  }, {
    key: '_blockRendererFn',
    value: function _blockRendererFn(block) {
      var _this2 = this;

      // eslint-disable-line complexity
      var blockType = block.getType();

      if (blockType === _constants.BLOCK_TYPES.ATOMIC) {
        var entityKey = block.getEntityAt(0);
        if (!entityKey) {
          return null;
        }
        var entity = _draftJs.Entity.get(entityKey);
        var type = entity.getType();
        var data = entity.getData();

        if (type === _constants.ENTITY_TYPES.IMAGE) {
          return {
            component: _AtomicImage2.default,
            props: {
              src: data.src,
              alt: data.alt
            },
            editable: false
          };
        }
        if (type === _constants.ENTITY_TYPES.LINK) {
          return {
            component: _AtomicLink2.default,
            props: {
              url: data.url
            },
            editable: true
          };
        }
      }

      if (blockType === _constants.BLOCK_TYPES.CHECKABLE_LIST_ITEM) {
        var _ret = function () {
          var blockKey = block.getKey();
          var checkedState = _this2.state.checkedState;

          return {
            v: {
              component: _CheckableListItem2.default,
              props: {
                checked: !!checkedState[blockKey],
                onChangeChecked: function onChangeChecked(ev) {
                  _this2.setState({
                    checkedState: (0, _assign3.default)({}, checkedState, _defineProperty({}, blockKey, ev.target.checked))
                  });
                }
              },
              editable: true
            }
          };
        }();

        if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
      }

      return null;
    }
  }, {
    key: '_insertImage',
    value: function _insertImage(_ref) {
      var name = _ref.name;
      var original_url = _ref.original_url;
      var preview_url = _ref.preview_url;

      var entityKey = _draftJs.Entity.create(_constants.ENTITY_TYPES.IMAGE, 'IMMUTABLE', {
        src: preview_url,
        'data-original-url': original_url,
        alt: name
      });
      var newEditorState = _draftJs.AtomicBlockUtils.insertAtomicBlock(this.state.editorState, entityKey, ' ');
      this.onChange(newEditorState);
    }
  }, {
    key: '_insertDownloadLink',
    value: function _insertDownloadLink(_ref2) {
      var name = _ref2.name;
      var download_url = _ref2.download_url;

      var entityKey = _draftJs.Entity.create(_constants.ENTITY_TYPES.LINK, 'MUTABLE', { url: download_url, target: '_blank' });
      var newEditorState = _draftJs.AtomicBlockUtils.insertAtomicBlock(this.state.editorState, entityKey, name);
      this.onChange(newEditorState);
    }
  }, {
    key: '_toggleBlockType',
    value: function _toggleBlockType(blockType) {
      var newEditorState = _draftJs.RichUtils.toggleBlockType(this.state.editorState, blockType);
      this.onChange(newEditorState);
    }
  }, {
    key: '_toggleInlineStyle',
    value: function _toggleInlineStyle(inlineStyle) {
      var newEditorState = _draftJs.RichUtils.toggleInlineStyle(this.state.editorState, inlineStyle);
      this.onChange(newEditorState);
    }
  }, {
    key: '_handleKeyCommand',
    value: function _handleKeyCommand(command) {
      var _this3 = this;

      // eslint-disable-line complexity
      var editorState = this.state.editorState;

      if (command === 'backspace') {
        var _ret2 = function () {
          var contentState = editorState.getCurrentContent();
          var selection = editorState.getSelection();
          var currentBlock = contentState.getBlockForKey(selection.getStartKey());
          var currentBlockType = currentBlock.getType();

          if (_constants.LIST_BLOCK_TYPES.some(function (t) {
            return t === currentBlockType;
          }) && currentBlock.getLength() === 0) {
            if (currentBlock.getDepth() === 0) {
              var _newEditorState = (0, _utils.removeBlockStyle)(editorState);
              if (_newEditorState) {
                _this3.onChange(_newEditorState);
                return {
                  v: true
                };
              }
            } else {
              var _newEditorState2 = (0, _utils.adjustBlockDepth)(editorState, contentState, selection, -1, _constants.MAX_LIST_DEPTH);
              if (_newEditorState2) {
                _this3.onChange(_newEditorState2);
                return {
                  v: true
                };
              }
            }
          }

          var firstBlockKey = contentState.getBlockMap().first().getKey();
          if (currentBlock.getLength() === 0 && currentBlock.getKey() === firstBlockKey) {
            var _newEditorState3 = (0, _utils.removeBlockStyle)(editorState);
            if (_newEditorState3) {
              _this3.onChange(_newEditorState3);
              return {
                v: true
              };
            }
          }
        }();

        if ((typeof _ret2 === 'undefined' ? 'undefined' : _typeof(_ret2)) === "object") return _ret2.v;
      }

      var newEditorState = _draftJs.RichUtils.handleKeyCommand(editorState, command);
      if (newEditorState) {
        this.onChange(newEditorState);
        return true;
      }
      return false;
    }
  }, {
    key: '_handleTab',
    value: function _handleTab(ev) {
      if (this._handleTabInsertTabChar(ev)) {
        return true;
      }

      var editorState = this.state.editorState;

      var newEditorState = _draftJs.RichUtils.onTab(ev, editorState, _constants.MAX_LIST_DEPTH);
      if (newEditorState !== editorState) {
        this.onChange(newEditorState);
      }
    }
  }, {
    key: '_handleTabInsertTabChar',
    value: function _handleTabInsertTabChar(ev) {
      var editorState = this.state.editorState;

      var selection = editorState.getSelection();
      var content = editorState.getCurrentContent();
      var blockKey = selection.getStartKey();
      var block = content.getBlockForKey(blockKey);

      if (!(0, _utils.isListItem)(block)) {
        ev.preventDefault();
        var newEditorState = (0, _utils.insertText)(editorState, '\t');
        if (newEditorState !== editorState) {
          this.onChange(newEditorState);
          return true;
        }
      }
    }
  }, {
    key: '_handlePastedFiles',
    value: function _handlePastedFiles(files) {
      if (typeof this.props.onPaste === 'function') {
        this.props.onPaste(files);
        return true;
      }
    }
  }, {
    key: '_handleReturn',
    value: function _handleReturn(ev) {
      // eslint-disable-line complexity
      if (this._handleReturnSubmit(ev)) {
        return true;
      }

      if (this._handleReturnSpecialBlock()) {
        return true;
      }

      if (this._handleReturnListItem()) {
        return true;
      }

      return false;
    }
  }, {
    key: '_handleReturnListItem',
    value: function _handleReturnListItem() {
      // eslint-disable-line complexity
      var editorState = this.state.editorState;

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
            var newEditorState = (0, _utils.removeBlockStyle)(editorState);
            if (newEditorState) {
              this.onChange(newEditorState);
              return true;
            }
          } else {
            var _newEditorState4 = (0, _utils.adjustBlockDepth)(editorState, content, selection, -1, _constants.MAX_LIST_DEPTH);
            if (_newEditorState4) {
              this.onChange(_newEditorState4);
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
      if (typeof this.props.onEnterKeyDownWithCommand === 'function' && _draftJs.KeyBindingUtil.hasCommandModifier(ev)) {
        this.props.onEnterKeyDownWithCommand(ev);
        return true;
      }
      return false;
    }
  }, {
    key: '_handleReturnSpecialBlock',
    value: function _handleReturnSpecialBlock() {
      // eslint-disable-line complexity
      var editorState = this.state.editorState;

      var selection = editorState.getSelection();
      if (selection.isCollapsed()) {
        var contentState = editorState.getCurrentContent();
        var blockKey = selection.getStartKey();
        var block = contentState.getBlockForKey(blockKey);
        if (!(0, _utils.isListItem)(block) && block.getType() !== _constants.BLOCK_TYPES.UNSTYLED) {
          if ((0, _utils.isCursorAtEnd)(block, selection)) {
            var newEditorState = (0, _utils.insertBlockAfter)(editorState, blockKey, _constants.BLOCK_TYPES.UNSTYLED);
            this.onChange(newEditorState);
            return true;
          }
        }
      }
      return false;
    }
  }, {
    key: 'getHTML',
    value: function getHTML() {
      var contentState = this.state.editorState.getCurrentContent();
      return (0, _draftJsExportHtml.stateToHTML)(contentState, this.state.checkedState).replace(/figure/g, 'div');
    }
  }]);

  return RichTextEditor;
}(_react.Component);

exports.default = RichTextEditor;


RichTextEditor.displayName = 'RichTextEditor';
RichTextEditor.defaultProps = {
  initialHtml: '',
  placeholder: 'Contents here...',
  headingLabel: 'Heading',
  readOnly: false,
  useDefaultButtons: false
};
RichTextEditor.propTypes = {
  headingLabel: _react.PropTypes.string,
  initialHtml: _react.PropTypes.string,
  placeholder: _react.PropTypes.string,
  readOnly: _react.PropTypes.bool,
  onClickAddImage: _react.PropTypes.func.isRequired,
  onClickFileAttach: _react.PropTypes.func.isRequired,
  onEnterKeyDownWithCommand: _react.PropTypes.func,
  onPaste: _react.PropTypes.func,
  useDefaultButtons: _react.PropTypes.bool
};