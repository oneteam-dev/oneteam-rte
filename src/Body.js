import assign from 'lodash/assign';
import isFunction from 'lodash/isFunction';
import React, { Component, PropTypes } from 'react';
import { Editor, EditorState, Entity, RichUtils, KeyBindingUtil } from 'draft-js';
import CheckableListItem from './blocks/CheckableListItem';
import AtomicImage from './blocks/AtomicImage';
import AtomicIFrame from './blocks/AtomicIFrame';
import DownloadLink from './blocks/DownloadLink';
import classnames from 'classnames';
import { insertBlockAfter, removeBlockStyle, adjustBlockDepth, insertText } from './functions';
import { isListItem, isCursorAtEnd } from './utils';
import { BLOCK_TYPES, ENTITY_TYPES, LIST_BLOCK_TYPES, MAX_LIST_DEPTH, OLD_BLOCK_TYPES } from './constants';

const { navigator } = global;
const _isSafari = navigator && navigator.userAgent && /applewebkit|safari/i.test(navigator.userAgent);

export default class Body extends Component {
  static get propTypes() {
    return {
      editorState: PropTypes.instanceOf(EditorState),
      checkedState: PropTypes.objectOf(PropTypes.bool),
      changeEditorState: PropTypes.func,
      changeCheckedState: PropTypes.func,
      closeInsertLinkInput: PropTypes.func,

      placeholder: PropTypes.string,
      readOnly: PropTypes.bool,
      className: PropTypes.string,
      customStyleMap: PropTypes.objectOf(PropTypes.object),
      blockRendererFn: PropTypes.func,
      blockStyleFn: PropTypes.func,
      onEnterKeyDownWithCommand: PropTypes.func,
      onPastedFiles: PropTypes.func
    };
  }
  static get defaultProps() {
    return {
      placeholder: 'Contents here...',
      readOnly: false,
      customStyleMap: {}
    };
  }
  get _isSafari() {
    return _isSafari;
  }
  constructor(props) {
    super(props);

    this.focus = () => this.refs.editor.focus();
    this.blur = () => this.refs.editor.blur();
    this.handleClickWrapper = ev => this._handleClickWrapper(ev);
    this.handleMouseDownWrapper = ev => this._handleMouseDownWrapper(ev);
    this.handleKeyCommand = command => this._handleKeyCommand(command);
    this.handlePastedFiles = files => this._handlePastedFiles(files);
    this.handleReturn = ev => this._handleReturn(ev);
    this.handleTab = ev => this._handleTab(ev);
    this.blockRendererFn = block => this._blockRendererFn(block);
    this.blockStyleFn = block => this._blockStyleFn(block);
    this.handleChangeEditor = editorState => this._changeEditorState(editorState);
  }
  render() {
    return (
      <div
        className={classnames('rich-text-editor-body', {
          'RichEditor-hidePlaceholder': this._shouldHidePlaceholder()
        }, this.props.className)} onClick={this.handleClickWrapper} onMouseDown={this.handleMouseDownWrapper}>
        <Editor
          ref='editor'
          blockRendererFn={this.blockRendererFn}
          blockStyleFn={this.blockStyleFn}
          editorState={this.props.editorState}
          readOnly={this.props.readOnly}
          handleKeyCommand={this.handleKeyCommand}
          handlePastedFiles={this.handlePastedFiles}
          handleReturn={this.handleReturn}
          onChange={this.handleChangeEditor}
          onTab={this.handleTab}
          placeholder={this.props.placeholder}
          customStyleMap={this.props.customStyleMap} />
      </div>
    );
  }
  _handleMouseDownWrapper() {
    if (isFunction(this.props.closeInsertLinkInput)) {
      this.props.closeInsertLinkInput();
    }
  }
  _handleClickWrapper({ target }) {
    // FIXME ;(   does not respond check box in the Safari
    if (this._isSafari && target.nodeName.toLowerCase() === 'input' && target.type === 'checkbox') {
      this.blur();
      setTimeout(() => this.focus(), 100);
    }
  }
  _shouldHidePlaceholder() {
    const contentState = this.props.editorState.getCurrentContent();
    if (!contentState.hasText()) {
      if (contentState.getBlockMap().first().getType() !== BLOCK_TYPES.UNSTYLED) {
        return true;
      }
    }
    return false;
  }
  _blockStyleFn(block) {
    if (isFunction(this.props.blockStyleFn)) {
      return this.props.blockStyleFn(block);
    }
    const type = block.getType();
    switch (type) {
    case BLOCK_TYPES.CHECKABLE_LIST_ITEM:
    case OLD_BLOCK_TYPES.ALIGN_CENTER:
    case OLD_BLOCK_TYPES.ALIGN_RIGHT:
    case OLD_BLOCK_TYPES.ALIGN_JUSTIFY:
      return type;
    default:
      return '';
    }
  }
  _shouldRenderAtomicBlock(block) {
    return block.getType() === BLOCK_TYPES.ATOMIC && block.getEntityAt(0);
  }
  _shouldRenderCheckableListItem(block) {
    return block.getType() === BLOCK_TYPES.CHECKABLE_LIST_ITEM;
  }
  _atomicBlockRenderer(entityKey) {
    const entity = Entity.get(entityKey);
    const type = entity.getType();
    const data = entity.getData();

    switch (type) {
    case ENTITY_TYPES.IMAGE:
      return {
        component: AtomicImage,
        props: { src: data.src, alt: data.alt },
        editable: false
      };
    case ENTITY_TYPES.DOWNLOAD_LINK:
      return {
        component: DownloadLink,
        props: data,
        editable: true
      };
    case ENTITY_TYPES.IFRAME:
      return {
        component: AtomicIFrame,
        props: data,
        editable: false
      };
    default:
      return null;
    }
  }
  _checkableListItemRenderer(block) {
    const blockKey = block.getKey();
    const { checkedState } = this.props;
    return {
      component: CheckableListItem,
      props: {
        checked: !!checkedState[blockKey],
        onChangeChecked: checked => {
          const newCheckedState = assign({}, checkedState, { [blockKey]: checked });
          this._changeCheckedState(newCheckedState);
        }
      }
    };
  }
  _blockRendererFn(block) {
    if (isFunction(this.props.blockRendererFn)) {
      return this.props.blockRendererFn(block);
    }

    if (this._shouldRenderAtomicBlock(block)) {
      return this._atomicBlockRenderer(block.getEntityAt(0));
    }

    if (this._shouldRenderCheckableListItem(block)) {
      return this._checkableListItemRenderer(block);
    }

    return null;
  }
  _handleKeyCommand(command) { // eslint-disable-line complexity
    const { editorState } = this.props;
    if (command === 'backspace') {
      const contentState = editorState.getCurrentContent();
      const selection = editorState.getSelection();
      const currentBlock = contentState.getBlockForKey(selection.getStartKey());
      const currentBlockType = currentBlock.getType();

      if (LIST_BLOCK_TYPES.some(t => t === currentBlockType) && currentBlock.getLength() === 0) {
        if(currentBlock.getDepth() === 0) {
          const newEditorState = removeBlockStyle(editorState);
          if(newEditorState) {
            this._changeEditorState(newEditorState);
            return true;
          }
        } else {
          const newEditorState = adjustBlockDepth(
            editorState,
            contentState,
            selection,
            -1,
            MAX_LIST_DEPTH
          );
          if(newEditorState) {
            this._changeEditorState(newEditorState);
            return true;
          }
        }
      }

      const firstBlockKey = contentState.getBlockMap().first().getKey();
      if(currentBlock.getLength() === 0 && currentBlock.getKey() === firstBlockKey) {
        const newEditorState = removeBlockStyle(editorState);
        if(newEditorState) {
          this._changeEditorState(newEditorState);
          return true;
        }
      }
    }

    const newEditorState = RichUtils.handleKeyCommand(editorState, command);
    if (newEditorState) {
      this._changeEditorState(newEditorState);
      return true;
    }
    return false;
  }
  _handleTab(ev) {
    if (this._handleTabInsertTabChar(ev)) {
      return true;
    }

    const { editorState } = this.props;
    const newEditorState = RichUtils.onTab(ev, editorState, MAX_LIST_DEPTH);
    if (newEditorState !== editorState) {
      this._changeEditorState(newEditorState);
    }
  }
  _handleTabInsertTabChar(ev) {
    const { editorState } = this.props;
    const selection = editorState.getSelection();
    const content = editorState.getCurrentContent();
    const blockKey = selection.getStartKey();
    const block = content.getBlockForKey(blockKey);

    if (!isListItem(block)) {
      ev.preventDefault();
      const newEditorState = insertText(editorState, '\t');
      if (newEditorState !== editorState) {
        this._changeEditorState(newEditorState);
        return true;
      }
    }
    return false;
  }
  _handlePastedFiles(files) {
    if (isFunction(this.props.onPastedFiles)) {
      this.props.onPastedFiles(files);
      return true;
    }
    return false;
  }
  _handleReturn(ev) {
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
  _handleReturnListItem() {
    const { editorState } = this.props;
    const selection = editorState.getSelection();
    const content = editorState.getCurrentContent();
    const block = content.getBlockForKey(selection.getStartKey());

    if (isListItem(block)) {
      const key = selection.getAnchorKey();
      if(key !== selection.getFocusKey()) {
        return false;
      }

      const block = content.getBlockForKey(key);

      if (block.getLength() === 0) {
        if (block.getDepth() === 0) {
          const newEditorState = removeBlockStyle(editorState);
          if (newEditorState) {
            this._changeEditorState(newEditorState);
            return true;
          }
        } else {
          const newEditorState = adjustBlockDepth(
            editorState,
            content,
            selection,
            -1,
            MAX_LIST_DEPTH
          );
          if (newEditorState) {
            this._changeEditorState(newEditorState);
            return true;
          }
        }
      }
    }
    return false;
  }
  _handleReturnSubmit(ev) {
    if (isFunction(this.props.onEnterKeyDownWithCommand) && KeyBindingUtil.hasCommandModifier(ev)) {
      this.props.onEnterKeyDownWithCommand(ev);
      return true;
    }
    return false;
  }
  _handleReturnSpecialBlock() {
    const { editorState } = this.props;
    const selection = editorState.getSelection();
    if (selection.isCollapsed()) {
      const contentState = editorState.getCurrentContent();
      const blockKey = selection.getStartKey();
      const block = contentState.getBlockForKey(blockKey);
      if (!isListItem(block) && block.getType() !== BLOCK_TYPES.UNSTYLED) {
        if (isCursorAtEnd(block, selection)) {
          const newEditorState = insertBlockAfter(
            editorState,
            blockKey,
            BLOCK_TYPES.UNSTYLED
          );
          this._changeEditorState(newEditorState);
          return true;
        }
      }
    }
    return false;
  }
  _changeEditorState(editorState) {
    if (isFunction(this.props.changeEditorState)) {
      this.props.changeEditorState(editorState);
    }
  }
  _changeCheckedState(checkedState) {
    if (isFunction(this.props.changeCheckedState)) {
      this.props.changeCheckedState(checkedState);
    }
  }
}
