import React, { Component, PropTypes } from 'react';
import Editor from 'draft-js-plugins-editor';
import { EditorState, Entity, Modifier, RichUtils, KeyBindingUtil, DefaultDraftBlockRenderMap } from 'draft-js';
import {
  blockRenderMapForSameWrapperAsUnorderedListItem as blockRenderMap,
  CheckableListItem, CheckableListItemUtils, CHECKABLE_LIST_ITEM
} from 'draft-js-checkable-list-item';
import { BLOCK_TYPES, ENTITY_TYPES, LIST_BLOCK_TYPES, MAX_LIST_DEPTH, OLD_BLOCK_TYPES } from 'oneteam-rte-constants';
import isFunction from 'lodash/isFunction';
import classNames from 'classnames';
import AtomicImage from './blocks/AtomicImage';
import AtomicIFrame from './blocks/AtomicIFrame';
import DownloadLink from './blocks/DownloadLink';
import {
  removeBlockStyle, adjustBlockDepth, insertText, insertWebCards, splitBlockInContentStateIfCursorAtStart
} from './functions';
import { isListItem, isCursorAtEnd, isCursorAtStart, getCurrentBlock } from './utils';
import decorators from './decorators';
import plugins from './plugins';
import URL_REGEX from './helpers/urlRegex';

export default class Body extends Component {
  static propTypes = {
    editorState: PropTypes.instanceOf(EditorState), // Required, but inherited from parent (RichTextEditor) component
    changeEditorState: PropTypes.func, // Required, but inherited from parent (RichTextEditor) component
    closeInsertLinkInput: PropTypes.func,

    placeholder: PropTypes.string,
    readOnly: PropTypes.bool,
    className: PropTypes.string,
    customStyleMap: PropTypes.objectOf(PropTypes.object),
    blockRendererFn: PropTypes.func,
    blockStyleFn: PropTypes.func,
    onEnterKeyDownWithCommand: PropTypes.func,
    onPastedFiles: PropTypes.func,
    customAtomicBlockRendererFn: PropTypes.func
  }
  static defaultProps = {
    placeholder: 'Contents here...',
    readOnly: false,
    customStyleMap: {}
  }
  handleBlur = () => {
    // Not changed state if do not do this
    setTimeout(() => {
      const newEditorState = this._insertWebCardsIfNeeded();
      if (newEditorState) {
        this._changeEditorState(newEditorState);
      }
    }, 0);
  }
  handlePastedText = text => {
    const urls = text.match(URL_REGEX);
    if (urls) {
      const newEditorState = insertText(this.props.editorState, text);
      this._changeEditorState(insertWebCards(newEditorState, urls));
      return 'handled';
    }
    return 'not-handled';
  }
  handleContainerMouseDown = () => {
    if (isFunction(this.props.closeInsertLinkInput)) {
      this.props.closeInsertLinkInput();
    }
  }
  handleKeyCommand = command => { // eslint-disable-line complexity
    const { editorState } = this.props;
    if (command === 'backspace') {
      const contentState = editorState.getCurrentContent();
      const selection = editorState.getSelection();
      const currentBlock = contentState.getBlockForKey(selection.getStartKey());
      const currentBlockType = currentBlock.getType();
      const blockLength = currentBlock.getLength();

      if (LIST_BLOCK_TYPES.some(t => t === currentBlockType) && blockLength === 0) {
        const newEditorState = currentBlock.getDepth() === 0 ?
          removeBlockStyle(editorState) :
          adjustBlockDepth(
            editorState,
            contentState,
            selection,
            -1,
            MAX_LIST_DEPTH
          );
        if (newEditorState) {
          this._changeEditorState(newEditorState);
          return 'handled';
        }
      }

      const firstBlockKey = contentState.getBlockMap().first().getKey();
      if (blockLength === 0 && currentBlock.getKey() === firstBlockKey) {
        const newEditorState = removeBlockStyle(editorState);
        if (newEditorState) {
          this._changeEditorState(newEditorState);
          return 'handled';
        }
      }
    }

    const newEditorState = RichUtils.handleKeyCommand(editorState, command);
    if (newEditorState) {
      this._changeEditorState(newEditorState);
      return 'handled';
    }
    return 'not-handled';
  }
  handlePastedFiles = files => {
    if (isFunction(this.props.onPastedFiles)) {
      this.props.onPastedFiles(files);
      return 'handled';
    }
    return 'not-handled';
  }
  handleReturn = ev => {
    if (this._handleReturnSubmit(ev)) {
      return 'handled';
    }

    if (this._handleReturnListItem()) {
      return 'handled';
    }

    if (this._handleReturnInsertWebCard()) {
      return 'handled';
    }

    if (this._handleReturnSplitBlockIfCursorAtStart()) {
      return 'handled';
    }

    return 'not-handled';
  }
  handleTab = ev => {
    if (this._insertIndent(ev)) {
      return 'handled';
    }
    if (this._adjustBlockDepth(ev)) {
      return 'handled';
    }
    const { editorState } = this.props;
    const newEditorState = RichUtils.onTab(ev, editorState, MAX_LIST_DEPTH);
    if (newEditorState !== editorState) {
      this._changeEditorState(newEditorState);
      return 'handled';
    }

    return 'not-handled';
  }
  blockRendererFn = block => {
    const type = block.getType();

    if (type === BLOCK_TYPES.ATOMIC && block.getEntityAt(0)) {
      return this._atomicBlockRenderer(block);
    }

    if (type === CHECKABLE_LIST_ITEM) {
      return this._checkableListItemRenderer(block);
    }

    // Unnecessary
    if (isFunction(this.props.blockRendererFn)) {
      return this.props.blockRendererFn(block);
    }

    return null;
  }
  blockStyleFn = block => {
    if (isFunction(this.props.blockStyleFn)) {
      return this.props.blockStyleFn(block);
    }
    const type = block.getType();
    switch (type) {
    case CHECKABLE_LIST_ITEM:
    case OLD_BLOCK_TYPES.ALIGN_CENTER:
    case OLD_BLOCK_TYPES.ALIGN_RIGHT:
    case OLD_BLOCK_TYPES.ALIGN_JUSTIFY:
      return type;
    default:
      return '';
    }
  }
  handleChangeEditor = editorState => this._changeEditorState(editorState);

  /**
   * @public
   */
  focus = () => this.editor.focus()

  /**
   * @public
   */
  blur = () => this.editor.blur()

  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div
        className={classNames('rich-text-editor-body', {
          'RichEditor-hidePlaceholder': this._shouldHidePlaceholder()
        }, this.props.className)}
        onMouseDown={this.handleContainerMouseDown}>
        <Editor
          plugins={plugins}
          decorators={decorators}
          ref={c => this.editor = c}
          blockRendererFn={this.blockRendererFn}
          blockRenderMap={DefaultDraftBlockRenderMap.merge(blockRenderMap)}
          blockStyleFn={this.blockStyleFn}
          editorState={this.props.editorState}
          readOnly={this.props.readOnly}
          handleKeyCommand={this.handleKeyCommand}
          handlePastedFiles={this.handlePastedFiles}
          handlePastedText={this.handlePastedText}
          handleReturn={this.handleReturn}
          onChange={this.handleChangeEditor}
          onTab={this.handleTab}
          onBlur={this.handleBlur}
          placeholder={this.props.placeholder}
          customStyleMap={this.props.customStyleMap} />
      </div>
    );
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
  _atomicBlockRenderer(block) {
    const entity = Entity.get(block.getEntityAt(0));
    const type = entity.getType();
    const data = entity.getData();

    if (isFunction(this.props.customAtomicBlockRendererFn)) {
      const atomicBlock = this.props.customAtomicBlockRendererFn(entity, block);
      if (atomicBlock) {
        return atomicBlock;
      }
    }

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
    default: return null;
    }
  }
  _checkableListItemRenderer(block) {
    return {
      component: CheckableListItem,
      props: {
        onChangeChecked: () => this._changeEditorState(
          CheckableListItemUtils.toggleChecked(this.props.editorState, block)
        ),
        checked: !!block.getData().get('checked')
      }
    };
  }
  _insertIndent(ev) {
    const { editorState } = this.props;
    const selection = editorState.getSelection();
    const content = editorState.getCurrentContent();
    const blockKey = selection.getStartKey();
    const block = content.getBlockForKey(blockKey);

    if (!isListItem(block)) {
      ev.preventDefault();
      const newEditorState = insertText(editorState, '    ');
      if (newEditorState !== editorState) {
        this._changeEditorState(newEditorState);
        return true;
      }
    }
    return false;
  }
  _insertWebCardsIfNeeded() {
    const { editorState } = this.props;
    const selection = editorState.getSelection();
    const block = getCurrentBlock(editorState);
    const webcardRendered = block.getData().get('webcardRendered');
    const urls = block.getText().match(URL_REGEX);
    if (!webcardRendered && urls && isCursorAtEnd(block, selection)) {
      const content = editorState.getCurrentContent();
      const newContent = Modifier.setBlockData(content, selection, { webcardRendered: true });
      return insertWebCards(EditorState.push(editorState, newContent, 'change-block-data'), urls);
    }
    return null;
  }
  _adjustBlockDepth(ev) {
    const { editorState } = this.props;
    const newEditorState = CheckableListItemUtils.onTab(ev, editorState, MAX_LIST_DEPTH);
    if (newEditorState !== editorState) {
      this._changeEditorState(newEditorState);
      return true;
    }
    return false;
  }
  _handleReturnInsertWebCard() {
    const newEditorState = this._insertWebCardsIfNeeded();
    if (newEditorState) {
      this._changeEditorState(newEditorState);
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
  _handleReturnSplitBlockIfCursorAtStart() {
    const { editorState } = this.props;
    const selectionState = editorState.getSelection();
    if (!selectionState.isCollapsed() || !isCursorAtStart(selectionState)) {
      return false;
    }
    this._changeEditorState(splitBlockInContentStateIfCursorAtStart(editorState));
    return true;
  }
  _changeEditorState(editorState) {
    this.props.changeEditorState(editorState);
  }
}
