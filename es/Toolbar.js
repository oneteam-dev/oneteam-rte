function _instanceof(left, right) { if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) { return right[Symbol.hasInstance](left); } else { return left instanceof right; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!_instanceof(instance, Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { EditorState } from 'draft-js';
import { BLOCK_TYPES, INLINE_STYLES, HEADER_BLOCK_TYPES } from 'draft-js-oneteam-rte-plugin/lib/constants';
import OverlayTrigger from 'react-bootstrap/lib/OverlayTrigger';
import Tooltip from 'react-bootstrap/lib/Tooltip';
import classnames from 'classnames';
import { BaseButton, Bold, Italic, Strikethrough, Heading, Blockquote, CheckableList, UnorderedList, OrderedList, Divider, InsertLink, RemoveLink, BlockTypeButton, InlineStyleButton } from './ui';
import { hasCurrentInlineStyle, getCurrentBlockType, checkCurrentBlockType } from './utils';
import DEFAULT_ITEM_OPTIONS, * as ITEM_NAMES from './constants/toolbar';

var Toolbar =
/*#__PURE__*/
function (_Component) {
  _inherits(Toolbar, _Component);

  function Toolbar() {
    var _ref;

    var _temp, _this;

    _classCallCheck(this, Toolbar);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _possibleConstructorReturn(_this, (_temp = _this = _possibleConstructorReturn(this, (_ref = Toolbar.__proto__ || Object.getPrototypeOf(Toolbar)).call.apply(_ref, [this].concat(args))), Object.defineProperty(_assertThisInitialized(_this), "handleToggleHeading", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: function value(editorState) {
        _this.props.onChange(editorState);

        _this.props.onHeadingToggled();
      }
    }), _temp));
  }

  _createClass(Toolbar, [{
    key: "render",
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
      return React.createElement("div", {
        className: "rich-text-editor-toolbar"
      }, children ? children : [React.createElement(BaseButton, {
        key: ITEM_NAMES.INSERT_IMAGE,
        className: "rich-text-editor-button rich-text-editor-button--insert-image",
        onClick: onClickInsertImage
      }, React.createElement(OverlayTrigger, {
        placement: "bottom",
        overlay: React.createElement(Tooltip, {
          id: ITEM_NAMES.INSERT_IMAGE
        }, itemOptions[ITEM_NAMES.INSERT_IMAGE].description)
      }, React.createElement("span", null, itemOptions[ITEM_NAMES.INSERT_IMAGE].iconNode))), React.createElement(BaseButton, {
        key: ITEM_NAMES.UPLOAD_FILE,
        className: "rich-text-editor-button rich-text-editor-button--upload-file",
        onClick: onClickUploadFile
      }, React.createElement(OverlayTrigger, {
        placement: "bottom",
        overlay: React.createElement(Tooltip, {
          id: ITEM_NAMES.UPLOAD_FILE
        }, itemOptions[ITEM_NAMES.UPLOAD_FILE].description)
      }, React.createElement("span", null, itemOptions[ITEM_NAMES.UPLOAD_FILE].iconNode))), React.createElement(Divider, {
        key: ITEM_NAMES.DIVIDER
      }), React.createElement(Heading, {
        className: classnames('rte-toolbar-button-heading', {
          active: HEADER_BLOCK_TYPES.some(function (t) {
            return t === getCurrentBlockType(editorState);
          })
        }),
        key: ITEM_NAMES.HEADING,
        name: itemOptions[ITEM_NAMES.HEADING].name,
        closeButtonNode: itemOptions[ITEM_NAMES.HEADING].closeButtonNode,
        editorState: editorState,
        onToggleBlockType: this.handleToggleHeading
      }), React.createElement(Bold, {
        key: ITEM_NAMES.BOLD,
        editorState: editorState,
        onToggleInlineStyle: onChange
      }, React.createElement(OverlayTrigger, {
        placement: "bottom",
        overlay: React.createElement(Tooltip, {
          id: ITEM_NAMES.BOLD
        }, itemOptions[ITEM_NAMES.BOLD].description)
      }, React.createElement("span", null, hasCurrentInlineStyle(editorState, INLINE_STYLES.BOLD) && itemOptions[ITEM_NAMES.BOLD].activeIconNode || itemOptions[ITEM_NAMES.BOLD].iconNode))), React.createElement(Italic, {
        key: ITEM_NAMES.ITALIC,
        editorState: editorState,
        onToggleInlineStyle: onChange
      }, React.createElement(OverlayTrigger, {
        placement: "bottom",
        overlay: React.createElement(Tooltip, {
          id: ITEM_NAMES.ITALIC
        }, itemOptions[ITEM_NAMES.ITALIC].description)
      }, React.createElement("span", null, hasCurrentInlineStyle(editorState, INLINE_STYLES.ITALIC) && itemOptions[ITEM_NAMES.ITALIC].activeIconNode || itemOptions[ITEM_NAMES.ITALIC].iconNode))), React.createElement(InlineStyleButton, {
        key: INLINE_STYLES.CODE,
        type: INLINE_STYLES.CODE,
        editorState: editorState,
        onToggle: onChange
      }, React.createElement(OverlayTrigger, {
        placement: "bottom",
        overlay: React.createElement(Tooltip, {
          id: ITEM_NAMES.CODE
        }, itemOptions[ITEM_NAMES.CODE].description)
      }, React.createElement("span", null, hasCurrentInlineStyle(editorState, INLINE_STYLES.CODE) && itemOptions[ITEM_NAMES.CODE].activeIconNode || itemOptions[ITEM_NAMES.CODE].iconNode))), React.createElement(Blockquote, {
        key: ITEM_NAMES.BLOCKQUOTE,
        editorState: editorState,
        onToggleBlockType: onChange
      }, React.createElement(OverlayTrigger, {
        placement: "bottom",
        overlay: React.createElement(Tooltip, {
          id: ITEM_NAMES.BLOCKQUOTE
        }, itemOptions[ITEM_NAMES.BLOCKQUOTE].description)
      }, React.createElement("span", null, checkCurrentBlockType(editorState, BLOCK_TYPES.BLOCKQUOTE) && itemOptions[ITEM_NAMES.BLOCKQUOTE].activeIconNode || itemOptions[ITEM_NAMES.BLOCKQUOTE].iconNode))), React.createElement(Strikethrough, {
        key: ITEM_NAMES.STRIKETHROUGH,
        editorState: editorState,
        onToggleInlineStyle: onChange
      }, React.createElement(OverlayTrigger, {
        placement: "bottom",
        overlay: React.createElement(Tooltip, {
          id: ITEM_NAMES.STRIKETHROUGH
        }, itemOptions[ITEM_NAMES.STRIKETHROUGH].description)
      }, React.createElement("span", null, hasCurrentInlineStyle(editorState, INLINE_STYLES.STRIKETHROUGH) && itemOptions[ITEM_NAMES.STRIKETHROUGH].activeIconNode || itemOptions[ITEM_NAMES.STRIKETHROUGH].iconNode))), React.createElement(CheckableList, {
        key: ITEM_NAMES.CHECKABLE_LIST,
        editorState: editorState,
        onToggleBlockType: onChange
      }, React.createElement(OverlayTrigger, {
        placement: "bottom",
        overlay: React.createElement(Tooltip, {
          id: ITEM_NAMES.CHECKABLE_LIST
        }, itemOptions[ITEM_NAMES.CHECKABLE_LIST].description)
      }, React.createElement("span", null, checkCurrentBlockType(editorState, BLOCK_TYPES.CHECKABLE_LIST_ITEM) && itemOptions[ITEM_NAMES.CHECKABLE_LIST].activeIconNode || itemOptions[ITEM_NAMES.CHECKABLE_LIST].iconNode))), React.createElement(UnorderedList, {
        key: ITEM_NAMES.UNOERDERD_LIST,
        editorState: editorState,
        onToggleBlockType: onChange
      }, React.createElement(OverlayTrigger, {
        placement: "bottom",
        overlay: React.createElement(Tooltip, {
          id: ITEM_NAMES.UNOERDERD_LIST
        }, itemOptions[ITEM_NAMES.UNOERDERD_LIST].description)
      }, React.createElement("span", null, checkCurrentBlockType(editorState, BLOCK_TYPES.UNORDERED_LIST_ITEM) && itemOptions[ITEM_NAMES.UNOERDERD_LIST].activeIconNode || itemOptions[ITEM_NAMES.UNOERDERD_LIST].iconNode))), React.createElement(OrderedList, {
        key: ITEM_NAMES.OERDERD_LIST,
        editorState: editorState,
        onToggleBlockType: onChange
      }, React.createElement(OverlayTrigger, {
        placement: "bottom",
        overlay: React.createElement(Tooltip, {
          id: ITEM_NAMES.OERDERD_LIST
        }, itemOptions[ITEM_NAMES.OERDERD_LIST].description)
      }, React.createElement("span", null, checkCurrentBlockType(editorState, BLOCK_TYPES.ORDERED_LIST_ITEM) && itemOptions[ITEM_NAMES.OERDERD_LIST].activeIconNode || itemOptions[ITEM_NAMES.OERDERD_LIST].iconNode))), React.createElement(InsertLink, {
        key: ITEM_NAMES.INSERT_LINK,
        editorState: editorState,
        onInsertLink: onChange,
        isOpen: isOpenInsertLinkInput,
        onMouseDownToggle: toggleInsertLinkInput,
        validationErrorMessage: itemOptions[ITEM_NAMES.INSERT_LINK].validationErrorMessage,
        placeholder: itemOptions[ITEM_NAMES.INSERT_LINK].placeholder
      }, React.createElement(OverlayTrigger, {
        placement: "bottom",
        overlay: React.createElement(Tooltip, {
          id: ITEM_NAMES.INSERT_LINK
        }, itemOptions[ITEM_NAMES.INSERT_LINK].description)
      }, React.createElement("span", null, itemOptions[ITEM_NAMES.INSERT_LINK].iconNode))), React.createElement(RemoveLink, {
        key: ITEM_NAMES.REMOVE_LINK,
        editorState: editorState,
        onRemoveLink: onChange
      }, React.createElement(OverlayTrigger, {
        placement: "bottom",
        overlay: React.createElement(Tooltip, {
          id: ITEM_NAMES.REMOVE_LINK
        }, itemOptions[ITEM_NAMES.REMOVE_LINK].description)
      }, React.createElement("span", null, itemOptions[ITEM_NAMES.REMOVE_LINK].iconNode))), React.createElement(BaseButton, {
        key: ITEM_NAMES.EMBED_IFRAME,
        className: "rich-text-editor-button rich-text-editor-button--embed-code",
        onMouseDown: onMouseDownEmbedIFrame
      }, React.createElement(OverlayTrigger, {
        placement: "bottom",
        overlay: React.createElement(Tooltip, {
          id: ITEM_NAMES.EMBED_IFRAME
        }, itemOptions[ITEM_NAMES.EMBED_IFRAME].description)
      }, React.createElement("span", null, itemOptions[ITEM_NAMES.EMBED_IFRAME].iconNode))), React.createElement(BlockTypeButton, {
        key: BLOCK_TYPES.CODE_BLOCK,
        type: BLOCK_TYPES.CODE_BLOCK,
        editorState: editorState,
        onToggle: onChange
      }, React.createElement(OverlayTrigger, {
        placement: "bottom",
        overlay: React.createElement(Tooltip, {
          id: ITEM_NAMES.CODE_BLOCK
        }, itemOptions[ITEM_NAMES.CODE_BLOCK].description)
      }, React.createElement("span", null, checkCurrentBlockType(editorState, BLOCK_TYPES.CODE_BLOCK) && itemOptions[ITEM_NAMES.CODE_BLOCK].activeIconNode || itemOptions[ITEM_NAMES.CODE_BLOCK].iconNode)))]);
    }
  }]);

  return Toolbar;
}(Component);

Object.defineProperty(Toolbar, "propTypes", {
  configurable: true,
  enumerable: true,
  writable: true,
  value: {
    editorState: PropTypes.instanceOf(EditorState),
    // Required, but inherited from parent (RichTextEditor) component
    onChange: PropTypes.func,
    // Required, but inherited from parent (RichTextEditor) component
    toggleInsertLinkInput: PropTypes.func,
    // Required, but inherited from parent (RichTextEditor) component
    isOpenInsertLinkInput: PropTypes.bool.isRequired,
    children: PropTypes.node,
    onClickInsertImage: PropTypes.func.isRequired,
    onClickUploadFile: PropTypes.func.isRequired,
    onMouseDownEmbedIFrame: PropTypes.func.isRequired,
    onHeadingToggled: PropTypes.func.isRequired,
    itemOptions: PropTypes.objectOf(PropTypes.shape({
      description: PropTypes.string,
      name: PropTypes.string,
      iconNode: PropTypes.node,
      activeIconNode: PropTypes.node
    }))
  }
});
Object.defineProperty(Toolbar, "defaultProps", {
  configurable: true,
  enumerable: true,
  writable: true,
  value: {
    itemOptions: DEFAULT_ITEM_OPTIONS,
    isOpenInsertLinkInput: false
  }
});
export { Toolbar as default };