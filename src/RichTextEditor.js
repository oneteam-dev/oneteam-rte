import assign from 'lodash/assign';
import React, { Component, PropTypes } from 'react';
import { Editor, EditorState, Entity, RichUtils, KeyBindingUtil } from 'draft-js';
import CheckableListItem from './blocks/CheckableListItem';
import AtomicImage from './blocks/AtomicImage';
import AtomicIFrame from './blocks/AtomicIFrame';
import DownloadLink from './blocks/DownloadLink';
import classnames from 'classnames';
import {
  moveSelectionToEnd, insertBlockAfter, removeBlockStyle, adjustBlockDepth, insertText
} from './functions';
import { isListItem, isCursorAtEnd } from './utils';
import { BLOCK_TYPES, ENTITY_TYPES, LIST_BLOCK_TYPES, MAX_LIST_DEPTH } from './constants';

export default class RichTextEditor extends Component {
  static get defaultProps() {
    return {
      placeholder: 'Contents here...',
      readOnly: false
    };
  }
  static get propTypes() {
    return {
      editorState: PropTypes.instanceOf(EditorState).isRequired,
      checkedState: PropTypes.objectOf(PropTypes.bool).isRequired,
      onChange: PropTypes.func.isRequired,
      onChangeCheckedState: PropTypes.func.isRequired,
      placeholder: PropTypes.string,
      readOnly: PropTypes.bool,
      blockRendererFn: PropTypes.func,
      onEnterKeyDownWithCommand: PropTypes.func,
      onPastedFiles: PropTypes.func,
      blockStyleFn: PropTypes.func,
      customStyleMap: PropTypes.objectOf(PropTypes.any)
    };
  }
  constructor(props) {
    super(props);

    this.focus = () => this.refs.editor.focus();
    this.blur = () => this.refs.editor.blur();
    this.handleClickEditor = ev => this._handleClickEditor(ev);
    this.onChange = editorState => this.props.onChange(editorState);
    this.onChangeCheckedState = checkedState => this.props.onChangeCheckedState(checkedState);
    this.handleKeyCommand = command => this._handleKeyCommand(command);
    this.handlePastedFiles = files => this._handlePastedFiles(files);
    this.handleReturn = ev => this._handleReturn(ev);
    this.onTab = ev => this._handleTab(ev);
    this.blockRendererFn = block => this._blockRendererFn(block);
  }
  render() {
    return (
      <div className={classnames({
        'RichEditor-hidePlaceholder': this._shouldHidePlaceholder()
      })} onClick={this.handleClickEditor}>
        <Editor
          ref='editor'
          blockRendererFn={this.blockRendererFn}
          blockStyleFn={this.props.blockStyleFn}
          editorState={this.props.editorState}
          readOnly={this.props.readOnly}
          handleKeyCommand={this.handleKeyCommand}
          handlePastedFiles={this.handlePastedFiles}
          handleReturn={this.handleReturn}
          onChange={this.onChange}
          onTab={this.onTab}
          placeholder={this.props.placeholder}
          customStyleMap={this.props.customStyleMap} />
      </div>
    );
  }
  componentWillMount() {
    this.onChange(moveSelectionToEnd(this.props.editorState));
  }
  _handleClickEditor({ target }) {
    // FIXME ;(   does not respond check box in the Safari
    if (target.nodeName.toLowerCase() === 'input' && target.type === 'checkbox') {
      this.blur();
    }
    this.focus();
  }
  _shouldHidePlaceholder() {
    const { editorState } = this.props;
    const contentState = editorState.getCurrentContent();
    if (!contentState.hasText()) {
      if (contentState.getBlockMap().first().getType() !== BLOCK_TYPES.UNSTYLED) {
        return true;
      }
    }
    return false;
  }
  _blockRendererFn(block) { // eslint-disable-line complexity
    if (typeof this.props.blockRendererFn === 'function') {
      return this.props.blockRendererFn(block);
    }

    const blockType = block.getType();

    if (blockType === BLOCK_TYPES.ATOMIC) {
      const entityKey = block.getEntityAt(0);
      if (!entityKey) { return null; }
      const entity = Entity.get(entityKey);
      const type = entity.getType();
      const data = entity.getData();

      if (type === ENTITY_TYPES.IMAGE) {
        return {
          component: AtomicImage,
          props: { src: data.src, alt: data.alt },
          editable: false
        };
      }
      if (type === ENTITY_TYPES.DOWNLOAD_LINK) {
        return {
          component: DownloadLink,
          props: data,
          editable: true
        };
      }
      if (type === ENTITY_TYPES.IFRAME) {
        return {
          component: AtomicIFrame,
          props: data,
          editable: false
        };
      }
    }

    if (blockType === BLOCK_TYPES.CHECKABLE_LIST_ITEM) {
      const blockKey = block.getKey();
      const { checkedState } = this.props;
      return {
        component: CheckableListItem,
        props: {
          checked: !!checkedState[blockKey],
          onChangeChecked: checked => {
            const newCheckedState = assign({}, checkedState, { [blockKey]: checked });
            this.onChangeCheckedState(newCheckedState);
          }
        },
        editable: true
      };
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
            this.onChange(newEditorState);
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
            this.onChange(newEditorState);
            return true;
          }
        }
      }

      const firstBlockKey = contentState.getBlockMap().first().getKey();
      if(currentBlock.getLength() === 0 && currentBlock.getKey() === firstBlockKey) {
        const newEditorState = removeBlockStyle(editorState);
        if(newEditorState) {
          this.onChange(newEditorState);
          return true;
        }
      }
    }

    const newEditorState = RichUtils.handleKeyCommand(editorState, command);
    if (newEditorState) {
      this.onChange(newEditorState);
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
      this.onChange(newEditorState);
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
        this.onChange(newEditorState);
        return true;
      }
    }
  }
  _handlePastedFiles(files) {
    if (typeof this.props.onPastedFiles === 'function') {
      this.props.onPastedFiles(files);
      return true;
    }
  }
  _handleReturn(ev) { // eslint-disable-line complexity
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
  _handleReturnListItem() { // eslint-disable-line complexity
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
            this.onChange(newEditorState);
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
            this.onChange(newEditorState);
            return true;
          }
        }
      }
    }
    return false;
  }
  _handleReturnSubmit(ev) {
    if (typeof this.props.onEnterKeyDownWithCommand === 'function' && KeyBindingUtil.hasCommandModifier(ev)) {
      this.props.onEnterKeyDownWithCommand(ev);
      return true;
    }
    return false;
  }
  _handleReturnSpecialBlock() { // eslint-disable-line complexity
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
          this.onChange(newEditorState);
          return true;
        }
      }
    }
    return false;
  }
}
