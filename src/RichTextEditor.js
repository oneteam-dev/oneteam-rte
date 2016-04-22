import assign from 'lodash/assign';
import React, { Component, PropTypes } from 'react';
import {
  Editor, Entity, RichUtils, AtomicBlockUtils, CompositeDecorator, KeyBindingUtil
} from 'draft-js';
import { stateToHTML } from 'draft-js-export-html';
import classNames from 'classnames';
import Toolbar from './Toolbar';
import CheckableListItem from './blocks/CheckableListItem';
import AtomicImage from './blocks/AtomicImage';
import AtomicLink from './blocks/AtomicLink';
import Link from './blocks/Link';
import {
  moveSelectionToEnd, createEditorState, createCheckedState, insertBlockAfter,
  isListItem, isCursorAtEnd, removeBlockStyle, adjustBlockDepth, findLinkEntities,
  insertText
} from './utils';
import {
  BLOCK_TYPES, ENTITY_TYPES, LIST_BLOCK_TYPES, MAX_LIST_DEPTH, OLD_BLOCK_TYPES, OLD_INLINE_STYLES
} from './constants';

export default class RichTextEditor extends Component {
  constructor(props) {
    super(props);

    const decorator = new CompositeDecorator([
      {
        strategy: findLinkEntities,
        component: Link
      }
    ]);
    const editorState = createEditorState(this.props.initialHtml.replace(/>\s+</g, '><'), decorator);
    const checkedState = createCheckedState(editorState.getCurrentContent().getBlocksAsArray());

    this.state = { editorState, checkedState };

    this.focus = () => this.refs.editor.focus();
    this.onChange = editorState => this.setState({ editorState });
    this.handleKeyCommand = command => this._handleKeyCommand(command);
    this.handlePastedFiles = files => this._handlePastedFiles(files);
    this.handleReturn = ev => this._handleReturn(ev);
    this.toggleBlockType = type => this._toggleBlockType(type);
    this.toggleInlineStyle = style => this._toggleInlineStyle(style);
    this.onTab = ev => this._handleTab(ev);
    this.insertImage = file => this._insertImage(file);
    this.insertDownloadLink = file => this._insertDownloadLink(file);
    this.blockRendererFn = block => this._blockRendererFn(block);
  }
  render() {
    const { editorState } = this.state;
    const firstBlockType = editorState.getCurrentContent().getBlockMap().first().getType();

    return (
      <div id='rich-editor' className={classNames({
        'RichEditor-hidePlaceholder': firstBlockType !== BLOCK_TYPES.UNSTYLED
      })} onClick={this.focus}>
        <Toolbar
          editorState={editorState}
          onClickAddImage={this.props.onClickAddImage}
          onClickFileAttach={this.props.onClickFileAttach}
          onSelectHeading={this.toggleBlockType}
          onClickInlineStyle={this.toggleInlineStyle}
          onClickBlockType={this.toggleBlockType}
          headingLabel={this.props.headingLabel}
          useDefaultButtons={this.props.useDefaultButtons} />
        <div className='rich-editor-body'>
          <Editor
            blockRendererFn={this.blockRendererFn}
            blockStyleFn={this.blockStyleFn}
            editorState={editorState}
            readOnly={this.props.readOnly}
            handleKeyCommand={this.handleKeyCommand}
            handlePastedFiles={this.handlePastedFiles}
            handleReturn={this.handleReturn}
            onChange={this.onChange}
            onTab={this.onTab}
            placeholder={this.props.placeholder}
            ref='editor'
            customStyleMap={OLD_INLINE_STYLES} />
        </div>
      </div>
    );
  }
  componentWillMount() {
    this.onChange(moveSelectionToEnd(this.state.editorState));
  }
  blockStyleFn(block) { // eslint-disable-line complexity
    switch (block.getType()) {
    case BLOCK_TYPES.CHECKABLE_LIST_ITEM: return BLOCK_TYPES.CHECKABLE_LIST_ITEM;
    case OLD_BLOCK_TYPES.ALIGN_CENTER: return OLD_BLOCK_TYPES.ALIGN_CENTER;
    case OLD_BLOCK_TYPES.ALIGN_RIGHT: return OLD_BLOCK_TYPES.ALIGN_RIGHT;
    case OLD_BLOCK_TYPES.ALIGN_JUSTIFY: return OLD_BLOCK_TYPES.ALIGN_JUSTIFY;
    default: return '';
    }
  }
  _blockRendererFn(block) { // eslint-disable-line complexity
    const blockType = block.getType();

    if (blockType === BLOCK_TYPES.ATOMIC) {
      const entityKey = block.getEntityAt(0);
      if (!entityKey) { return null; }
      const entity = Entity.get(entityKey);
      const type = entity.getType();
      const data = entity.getData();

      if(type === ENTITY_TYPES.IMAGE) {
        return {
          component: AtomicImage,
          props: {
            src: data.src,
            alt: data.alt
          },
          editable: false
        };
      }
      if(type === ENTITY_TYPES.LINK) {
        return {
          component: AtomicLink,
          props: {
            url: data.url
          },
          editable: true
        };
      }
    }

    if (blockType === BLOCK_TYPES.CHECKABLE_LIST_ITEM) {
      const blockKey = block.getKey();
      const { checkedState } = this.state;
      return {
        component: CheckableListItem,
        props: {
          checked: !!checkedState[blockKey],
          onChangeChecked: ev => {
            this.setState({
              checkedState: assign({}, checkedState, {
                [blockKey]: ev.target.checked
              })
            });
          }
        },
        editable: true
      };
    }

    return null;
  }
  _insertImage({name, original_url, preview_url}) {
    const entityKey = Entity.create(ENTITY_TYPES.IMAGE, 'IMMUTABLE', {
      src: preview_url,
      'data-original-url': original_url,
      alt: name
    });
    const newEditorState = AtomicBlockUtils.insertAtomicBlock(
      this.state.editorState,
      entityKey,
      ' '
    );
    this.onChange(newEditorState);
  }
  _insertDownloadLink({name, download_url}) {
    const entityKey = Entity.create(ENTITY_TYPES.LINK, 'MUTABLE', { url: download_url, target: '_blank' });
    const newEditorState = AtomicBlockUtils.insertAtomicBlock(
      this.state.editorState,
      entityKey,
      name
    );
    this.onChange(newEditorState);
  }
  _toggleBlockType(blockType) {
    const newEditorState = RichUtils.toggleBlockType(
      this.state.editorState,
      blockType
    );
    this.onChange(newEditorState);
  }
  _toggleInlineStyle(inlineStyle) {
    const newEditorState = RichUtils.toggleInlineStyle(
      this.state.editorState,
      inlineStyle
    );
    this.onChange(newEditorState);
  }
  _handleKeyCommand(command) { // eslint-disable-line complexity
    const { editorState } = this.state;
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

    const { editorState } = this.state;
    const newEditorState = RichUtils.onTab(ev, editorState, MAX_LIST_DEPTH);
    if (newEditorState !== editorState) {
      this.onChange(newEditorState);
    }
  }
  _handleTabInsertTabChar(ev) {
    const { editorState } = this.state;
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
    if(typeof this.props.onPaste === 'function') {
      this.props.onPaste(files);
      return true;
    }
  }
  _handleReturn(ev) { // eslint-disable-line complexity
    if(this._handleReturnSubmit(ev)) {
      return true;
    }

    if(this._handleReturnSpecialBlock()) {
      return true;
    }

    if(this._handleReturnListItem()) {
      return true;
    }

    return false;
  }
  _handleReturnListItem() { // eslint-disable-line complexity
    const { editorState } = this.state;
    const selection = editorState.getSelection();
    const content = editorState.getCurrentContent();
    const block = content.getBlockForKey(selection.getStartKey());

    if(isListItem(block)) {
      const key = selection.getAnchorKey();
      if(key !== selection.getFocusKey()) {
        return false;
      }

      const block = content.getBlockForKey(key);

      if(block.getLength() === 0) {
        if(block.getDepth() === 0) {
          const newEditorState = removeBlockStyle(editorState);
          if(newEditorState) {
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
          if(newEditorState) {
            this.onChange(newEditorState);
            return true;
          }
        }
      }
    }
    return false;
  }
  _handleReturnSubmit(ev) {
    if(typeof this.props.onEnterKeyDownWithCommand === 'function' && KeyBindingUtil.hasCommandModifier(ev)) {
      this.props.onEnterKeyDownWithCommand(ev);
      return true;
    }
    return false;
  }
  _handleReturnSpecialBlock() { // eslint-disable-line complexity
    const { editorState } = this.state;
    const selection = editorState.getSelection();
    if(selection.isCollapsed()) {
      const contentState = editorState.getCurrentContent();
      const blockKey = selection.getStartKey();
      const block = contentState.getBlockForKey(blockKey);
      if(!isListItem(block) && block.getType() !== BLOCK_TYPES.UNSTYLED) {
        if(isCursorAtEnd(block, selection)) {
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
  getHTML() {
    const contentState = this.state.editorState.getCurrentContent();
    return stateToHTML(contentState, this.state.checkedState)
      .replace(/figure/g, 'div');
  }
}

RichTextEditor.displayName = 'RichTextEditor';
RichTextEditor.defaultProps = {
  initialHtml: '',
  placeholder: 'Contents here...',
  headingLabel: 'Heading',
  readOnly: false,
  useDefaultButtons: false
};
RichTextEditor.propTypes = {
  headingLabel: PropTypes.string,
  initialHtml: PropTypes.string,
  placeholder: PropTypes.string,
  readOnly: PropTypes.bool,
  onClickAddImage: PropTypes.func.isRequired,
  onClickFileAttach: PropTypes.func.isRequired,
  onEnterKeyDownWithCommand: PropTypes.func,
  onPaste: PropTypes.func,
  useDefaultButtons: PropTypes.bool
};
