'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _draftJs = require('draft-js');

var _constants = require('draft-js-oneteam-rte-plugin/lib/constants');

var _OverlayTrigger = require('react-bootstrap/lib/OverlayTrigger');

var _OverlayTrigger2 = _interopRequireDefault(_OverlayTrigger);

var _Tooltip = require('react-bootstrap/lib/Tooltip');

var _Tooltip2 = _interopRequireDefault(_Tooltip);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _ui = require('./ui');

var _utils = require('./utils');

var _toolbar = require('./constants/toolbar');

var ITEM_NAMES = _interopRequireWildcard(_toolbar);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Toolbar = function (_Component) {
  _inherits(Toolbar, _Component);

  _createClass(Toolbar, null, [{
    key: 'propTypes',
    get: function get() {
      return {
        editorState: _react.PropTypes.instanceOf(_draftJs.EditorState), // Required, but inherited from parent (RichTextEditor) component
        onChange: _react.PropTypes.func, // Required, but inherited from parent (RichTextEditor) component
        toggleInsertLinkInput: _react.PropTypes.func, // Required, but inherited from parent (RichTextEditor) component
        isOpenInsertLinkInput: _react.PropTypes.bool.isRequired,

        children: _react.PropTypes.node,
        onClickInsertImage: _react.PropTypes.func.isRequired,
        onClickUploadFile: _react.PropTypes.func.isRequired,
        onMouseDownEmbedIFrame: _react.PropTypes.func.isRequired,
        onHeadingToggled: _react.PropTypes.func.isRequired,
        itemOptions: _react.PropTypes.objectOf(_react.PropTypes.shape({
          description: _react.PropTypes.string,
          name: _react.PropTypes.string,
          iconNode: _react.PropTypes.node,
          activeIconNode: _react.PropTypes.node
        }))
      };
    }
  }, {
    key: 'defaultProps',
    get: function get() {
      return {
        itemOptions: ITEM_NAMES.default,
        isOpenInsertLinkInput: false
      };
    }
  }]);

  function Toolbar(props) {
    _classCallCheck(this, Toolbar);

    var _this = _possibleConstructorReturn(this, (Toolbar.__proto__ || Object.getPrototypeOf(Toolbar)).call(this, props));

    _this.handleToggleHeading = function (editorState) {
      _this.props.onChange(editorState);
      _this.props.onHeadingToggled();
    };

    return _this;
  }

  _createClass(Toolbar, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          editorState = _props.editorState,
          children = _props.children,
          itemOptions = _props.itemOptions,
          isOpenInsertLinkInput = _props.isOpenInsertLinkInput,
          onChange = _props.onChange,
          onClickInsertImage = _props.onClickInsertImage,
          onClickUploadFile = _props.onClickUploadFile,
          toggleInsertLinkInput = _props.toggleInsertLinkInput,
          onMouseDownEmbedIFrame = _props.onMouseDownEmbedIFrame;


      return _react2.default.createElement(
        'div',
        { className: 'rich-text-editor-toolbar' },
        children ? children : [_react2.default.createElement(
          _ui.BaseButton,
          {
            key: ITEM_NAMES.INSERT_IMAGE,
            className: 'rich-text-editor-button rich-text-editor-button--insert-image',
            onClick: onClickInsertImage },
          _react2.default.createElement(
            _OverlayTrigger2.default,
            {
              placement: 'bottom',
              overlay: _react2.default.createElement(
                _Tooltip2.default,
                { id: ITEM_NAMES.INSERT_IMAGE },
                itemOptions[ITEM_NAMES.INSERT_IMAGE].description
              ) },
            _react2.default.createElement(
              'span',
              null,
              itemOptions[ITEM_NAMES.INSERT_IMAGE].iconNode
            )
          )
        ), _react2.default.createElement(
          _ui.BaseButton,
          {
            key: ITEM_NAMES.UPLOAD_FILE,
            className: 'rich-text-editor-button rich-text-editor-button--upload-file',
            onClick: onClickUploadFile },
          _react2.default.createElement(
            _OverlayTrigger2.default,
            {
              placement: 'bottom',
              overlay: _react2.default.createElement(
                _Tooltip2.default,
                { id: ITEM_NAMES.UPLOAD_FILE },
                itemOptions[ITEM_NAMES.UPLOAD_FILE].description
              ) },
            _react2.default.createElement(
              'span',
              null,
              itemOptions[ITEM_NAMES.UPLOAD_FILE].iconNode
            )
          )
        ), _react2.default.createElement(_ui.Divider, { key: ITEM_NAMES.DIVIDER }), _react2.default.createElement(_ui.Heading, {
          className: (0, _classnames2.default)('rte-toolbar-button-heading', {
            active: _constants.HEADER_BLOCK_TYPES.some(function (t) {
              return t === (0, _utils.getCurrentBlockType)(editorState);
            })
          }),
          key: ITEM_NAMES.HEADING,
          name: itemOptions[ITEM_NAMES.HEADING].name,
          closeButtonNode: itemOptions[ITEM_NAMES.HEADING].closeButtonNode,
          editorState: editorState,
          onToggleBlockType: this.handleToggleHeading
        }), _react2.default.createElement(
          _ui.Bold,
          {
            key: ITEM_NAMES.BOLD,
            editorState: editorState,
            onToggleInlineStyle: onChange },
          _react2.default.createElement(
            _OverlayTrigger2.default,
            {
              placement: 'bottom',
              overlay: _react2.default.createElement(
                _Tooltip2.default,
                { id: ITEM_NAMES.BOLD },
                itemOptions[ITEM_NAMES.BOLD].description
              ) },
            _react2.default.createElement(
              'span',
              null,
              (0, _utils.hasCurrentInlineStyle)(editorState, _constants.INLINE_STYLES.BOLD) && itemOptions[ITEM_NAMES.BOLD].activeIconNode || itemOptions[ITEM_NAMES.BOLD].iconNode
            )
          )
        ), _react2.default.createElement(
          _ui.Italic,
          {
            key: ITEM_NAMES.ITALIC,
            editorState: editorState,
            onToggleInlineStyle: onChange },
          _react2.default.createElement(
            _OverlayTrigger2.default,
            {
              placement: 'bottom',
              overlay: _react2.default.createElement(
                _Tooltip2.default,
                { id: ITEM_NAMES.ITALIC },
                itemOptions[ITEM_NAMES.ITALIC].description
              ) },
            _react2.default.createElement(
              'span',
              null,
              (0, _utils.hasCurrentInlineStyle)(editorState, _constants.INLINE_STYLES.ITALIC) && itemOptions[ITEM_NAMES.ITALIC].activeIconNode || itemOptions[ITEM_NAMES.ITALIC].iconNode
            )
          )
        ), _react2.default.createElement(
          _ui.InlineStyleButton,
          {
            key: _constants.INLINE_STYLES.CODE,
            type: _constants.INLINE_STYLES.CODE,
            editorState: editorState,
            onToggle: onChange },
          _react2.default.createElement(
            _OverlayTrigger2.default,
            {
              placement: 'bottom',
              overlay: _react2.default.createElement(
                _Tooltip2.default,
                { id: ITEM_NAMES.CODE },
                itemOptions[ITEM_NAMES.CODE].description
              ) },
            _react2.default.createElement(
              'span',
              null,
              (0, _utils.hasCurrentInlineStyle)(editorState, _constants.INLINE_STYLES.CODE) && itemOptions[ITEM_NAMES.CODE].activeIconNode || itemOptions[ITEM_NAMES.CODE].iconNode
            )
          )
        ), _react2.default.createElement(
          _ui.Blockquote,
          {
            key: ITEM_NAMES.BLOCKQUOTE,
            editorState: editorState,
            onToggleBlockType: onChange },
          _react2.default.createElement(
            _OverlayTrigger2.default,
            {
              placement: 'bottom',
              overlay: _react2.default.createElement(
                _Tooltip2.default,
                { id: ITEM_NAMES.BLOCKQUOTE },
                itemOptions[ITEM_NAMES.BLOCKQUOTE].description
              ) },
            _react2.default.createElement(
              'span',
              null,
              (0, _utils.checkCurrentBlockType)(editorState, _constants.BLOCK_TYPES.BLOCKQUOTE) && itemOptions[ITEM_NAMES.BLOCKQUOTE].activeIconNode || itemOptions[ITEM_NAMES.BLOCKQUOTE].iconNode
            )
          )
        ), _react2.default.createElement(
          _ui.Strikethrough,
          {
            key: ITEM_NAMES.STRIKETHROUGH,
            editorState: editorState,
            onToggleInlineStyle: onChange },
          _react2.default.createElement(
            _OverlayTrigger2.default,
            {
              placement: 'bottom',
              overlay: _react2.default.createElement(
                _Tooltip2.default,
                { id: ITEM_NAMES.STRIKETHROUGH },
                itemOptions[ITEM_NAMES.STRIKETHROUGH].description
              ) },
            _react2.default.createElement(
              'span',
              null,
              (0, _utils.hasCurrentInlineStyle)(editorState, _constants.INLINE_STYLES.STRIKETHROUGH) && itemOptions[ITEM_NAMES.STRIKETHROUGH].activeIconNode || itemOptions[ITEM_NAMES.STRIKETHROUGH].iconNode
            )
          )
        ), _react2.default.createElement(
          _ui.CheckableList,
          {
            key: ITEM_NAMES.CHECKABLE_LIST,
            editorState: editorState,
            onToggleBlockType: onChange },
          _react2.default.createElement(
            _OverlayTrigger2.default,
            {
              placement: 'bottom',
              overlay: _react2.default.createElement(
                _Tooltip2.default,
                {
                  id: ITEM_NAMES.CHECKABLE_LIST },
                itemOptions[ITEM_NAMES.CHECKABLE_LIST].description
              ) },
            _react2.default.createElement(
              'span',
              null,
              (0, _utils.checkCurrentBlockType)(editorState, _constants.BLOCK_TYPES.CHECKABLE_LIST_ITEM) && itemOptions[ITEM_NAMES.CHECKABLE_LIST].activeIconNode || itemOptions[ITEM_NAMES.CHECKABLE_LIST].iconNode
            )
          )
        ), _react2.default.createElement(
          _ui.UnorderedList,
          {
            key: ITEM_NAMES.UNOERDERD_LIST,
            editorState: editorState,
            onToggleBlockType: onChange },
          _react2.default.createElement(
            _OverlayTrigger2.default,
            {
              placement: 'bottom',
              overlay: _react2.default.createElement(
                _Tooltip2.default,
                {
                  id: ITEM_NAMES.UNOERDERD_LIST },
                itemOptions[ITEM_NAMES.UNOERDERD_LIST].description
              ) },
            _react2.default.createElement(
              'span',
              null,
              (0, _utils.checkCurrentBlockType)(editorState, _constants.BLOCK_TYPES.UNORDERED_LIST_ITEM) && itemOptions[ITEM_NAMES.UNOERDERD_LIST].activeIconNode || itemOptions[ITEM_NAMES.UNOERDERD_LIST].iconNode
            )
          )
        ), _react2.default.createElement(
          _ui.OrderedList,
          {
            key: ITEM_NAMES.OERDERD_LIST,
            editorState: editorState,
            onToggleBlockType: onChange },
          _react2.default.createElement(
            _OverlayTrigger2.default,
            {
              placement: 'bottom',
              overlay: _react2.default.createElement(
                _Tooltip2.default,
                {
                  id: ITEM_NAMES.OERDERD_LIST },
                itemOptions[ITEM_NAMES.OERDERD_LIST].description
              ) },
            _react2.default.createElement(
              'span',
              null,
              (0, _utils.checkCurrentBlockType)(editorState, _constants.BLOCK_TYPES.ORDERED_LIST_ITEM) && itemOptions[ITEM_NAMES.OERDERD_LIST].activeIconNode || itemOptions[ITEM_NAMES.OERDERD_LIST].iconNode
            )
          )
        ), _react2.default.createElement(
          _ui.InsertLink,
          {
            key: ITEM_NAMES.INSERT_LINK,
            editorState: editorState,
            onInsertLink: onChange,
            isOpen: isOpenInsertLinkInput,
            onMouseDownToggle: toggleInsertLinkInput,
            validationErrorMessage: itemOptions[ITEM_NAMES.INSERT_LINK].validationErrorMessage,
            placeholder: itemOptions[ITEM_NAMES.INSERT_LINK].placeholder },
          _react2.default.createElement(
            _OverlayTrigger2.default,
            {
              placement: 'bottom',
              overlay: _react2.default.createElement(
                _Tooltip2.default,
                { id: ITEM_NAMES.INSERT_LINK },
                itemOptions[ITEM_NAMES.INSERT_LINK].description
              ) },
            _react2.default.createElement(
              'span',
              null,
              itemOptions[ITEM_NAMES.INSERT_LINK].iconNode
            )
          )
        ), _react2.default.createElement(
          _ui.RemoveLink,
          {
            key: ITEM_NAMES.REMOVE_LINK,
            editorState: editorState,
            onRemoveLink: onChange },
          _react2.default.createElement(
            _OverlayTrigger2.default,
            {
              placement: 'bottom',
              overlay: _react2.default.createElement(
                _Tooltip2.default,
                { id: ITEM_NAMES.REMOVE_LINK },
                itemOptions[ITEM_NAMES.REMOVE_LINK].description
              ) },
            _react2.default.createElement(
              'span',
              null,
              itemOptions[ITEM_NAMES.REMOVE_LINK].iconNode
            )
          )
        ), _react2.default.createElement(
          _ui.BaseButton,
          {
            key: ITEM_NAMES.EMBED_IFRAME,
            className: 'rich-text-editor-button rich-text-editor-button--embed-code',
            onMouseDown: onMouseDownEmbedIFrame },
          _react2.default.createElement(
            _OverlayTrigger2.default,
            {
              placement: 'bottom',
              overlay: _react2.default.createElement(
                _Tooltip2.default,
                { id: ITEM_NAMES.EMBED_IFRAME },
                itemOptions[ITEM_NAMES.EMBED_IFRAME].description
              ) },
            _react2.default.createElement(
              'span',
              null,
              itemOptions[ITEM_NAMES.EMBED_IFRAME].iconNode
            )
          )
        ), _react2.default.createElement(
          _ui.BlockTypeButton,
          {
            key: _constants.BLOCK_TYPES.CODE_BLOCK,
            type: _constants.BLOCK_TYPES.CODE_BLOCK,
            editorState: editorState,
            onToggle: onChange },
          _react2.default.createElement(
            _OverlayTrigger2.default,
            {
              placement: 'bottom',
              overlay: _react2.default.createElement(
                _Tooltip2.default,
                { id: ITEM_NAMES.CODE_BLOCK },
                itemOptions[ITEM_NAMES.CODE_BLOCK].description
              ) },
            _react2.default.createElement(
              'span',
              null,
              (0, _utils.checkCurrentBlockType)(editorState, _constants.BLOCK_TYPES.CODE_BLOCK) && itemOptions[ITEM_NAMES.CODE_BLOCK].activeIconNode || itemOptions[ITEM_NAMES.CODE_BLOCK].iconNode
            )
          )
        )]
      );
    }
  }]);

  return Toolbar;
}(_react.Component);

exports.default = Toolbar;