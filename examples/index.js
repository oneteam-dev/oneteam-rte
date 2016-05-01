import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Icon from 'react-fa';
import OverlayTrigger from 'react-bootstrap/lib/OverlayTrigger';
import Tooltip from 'react-bootstrap/lib/Tooltip';
import Editor from '../lib';
import {
  ButtonBase, Bold, Italic, Strikethrough, Heading, Blockquote, CheckableList, UnorderedList, OrderedList,
  Divider, AddLink, RemoveLink
} from '../lib/ui';
import getHTML from '../lib/getHTML';
import { createEditorState, createCheckedState, hasCurrentInlineStyle, currentBlockTypeIs } from '../lib/utils';
import { toggleLink } from '../lib/functions';
import { Entity, AtomicBlockUtils, CompositeDecorator } from '../lib/draft'
import LinkDecorator from '../lib/decorators/LinkDecorator';
import DownloadLinkDecorator from '../lib/decorators/DownloadLinkDecorator';
import { BLOCK_TYPES, ENTITY_TYPES, OLD_BLOCK_TYPES, OLD_INLINE_STYLES } from '../lib/constants';
import '../lib/base.css';
import './index.styl';

class RichTextEditorDemo extends Component {
  constructor(props) {
    super(props);
    const decorator = new CompositeDecorator([LinkDecorator, DownloadLinkDecorator]);
    const initialHtml = this.props.initialHtml.replace(/>\s+</g, '><'); // FIXME ;(
    const editorState = createEditorState(initialHtml, decorator);
    const checkedState = createCheckedState(editorState.getCurrentContent().getBlocksAsArray());
    this.state = { editorState, checkedState };
    this.onChange = editorState => this.setState({ editorState });
    this.onChangeCheckedState = checkedState => this.setState({ checkedState });
    this.focusEditor = () => this._editor.focus();
  }
  render() {
    const { editorState, checkedState } = this.state;
    return (
      <div className='rich-text-editor' id='rich-text-editor'>
        <div className='rich-text-editor-toolbar'>
          <ButtonBase
            className='rich-text-editor-button rich-text-editor-button--insert-image'
            onMouseDown={ev => console.log('onClick Insert image')}>
            <OverlayTrigger
              placement='bottom'
              overlay={<Tooltip id='INSERT_IMAGE'>Insert Image</Tooltip>}>
              <Icon name='image' />
            </OverlayTrigger>
          </ButtonBase>

          <ButtonBase
            className='rich-text-editor-button rich-text-editor-button--upload-file'
            onMouseDown={ev => console.log('onClick Upload file')}>
            <OverlayTrigger
              placement='bottom'
              overlay={<Tooltip id='UPLOAD_FILE'>Upload file</Tooltip>}>
              <Icon name='paperclip' />
            </OverlayTrigger>
          </ButtonBase>

          <ButtonBase
            id='embed-iframe'
            className='rich-text-editor-button rich-text-editor-button--embed-code'
            description='Embed code'
            onClick={ev => console.log('onClick Embed code')}>
              <OverlayTrigger
                placement='bottom'
                overlay={<Tooltip id='IFRAME'>Embed iframe</Tooltip>}>
                <Icon name='code' />
              </OverlayTrigger>
            </ButtonBase>

          <AddLink
            ref={c => this._addLink = c}
            editorState={editorState}
            onSubmit={this.onChange}>
            <OverlayTrigger
              placement='bottom'
              overlay={<Tooltip id='ADD_LINK'>Add link</Tooltip>}>
              <Icon name='link' />
            </OverlayTrigger>
          </AddLink>

          <RemoveLink
            editorState={editorState}
            onClick={this.onChange}>
            <OverlayTrigger
              placement='bottom'
              overlay={<Tooltip id='REMOVE_LINK'>Remove link</Tooltip>}>
              <Icon name='unlink' />
            </OverlayTrigger>
          </RemoveLink>

          <Divider />

          <Heading
            editorState={editorState}
            onToggle={editorState => {
              this.onChange(editorState);
              this.focusEditor();
            }} />

          <Bold
            editorState={editorState}
            onToggle={this.onChange}>
            <OverlayTrigger
              placement='bottom'
              overlay={<Tooltip id='BOLD'>Bold</Tooltip>}>
              <Icon name='bold' inverse={hasCurrentInlineStyle(editorState, 'BOLD')}/>
            </OverlayTrigger>
          </Bold>

          <Italic
            editorState={editorState}
            onToggle={this.onChange}>
            <OverlayTrigger
              placement='bottom'
              overlay={<Tooltip id='ITALIC'>Italic</Tooltip>}>
              <Icon name='italic' inverse={hasCurrentInlineStyle(editorState, 'ITALIC')}/>
            </OverlayTrigger>
          </Italic>

          <Strikethrough
            editorState={editorState}
            onToggle={this.onChange}>
            <OverlayTrigger
              placement='bottom'
              overlay={<Tooltip id='STRIKETHROUGH'>Strikethrough</Tooltip>}>
              <Icon name='strikethrough' inverse={hasCurrentInlineStyle(editorState, 'STRIKETHROUGH')}/>
            </OverlayTrigger>
          </Strikethrough>

          <Blockquote
            editorState={editorState}
            onToggle={this.onChange}>
            <OverlayTrigger
              placement='bottom'
              overlay={<Tooltip id='BLOCKQUOTE'>Blockquote</Tooltip>}>
              <Icon name='quote-left' inverse={currentBlockTypeIs(editorState, 'blockquote')}/>
            </OverlayTrigger>
          </Blockquote>

          <CheckableList
            editorState={editorState}
            onToggle={this.onChange}>
            <OverlayTrigger
              placement='bottom'
              overlay={<Tooltip id='CHECKABLELIST'>CheckableList</Tooltip>}>
              <Icon name='check-circle-o' inverse={currentBlockTypeIs(editorState, 'checkable-list-item')}/>
            </OverlayTrigger>
          </CheckableList>

          <UnorderedList
            editorState={editorState}
            onToggle={this.onChange}>
            <OverlayTrigger
              placement='bottom'
              overlay={<Tooltip id='UNORDEREDLIST'>UnorderedList</Tooltip>}>
              <Icon name='list-ul' inverse={currentBlockTypeIs(editorState, 'unordered-list-item')}/>
            </OverlayTrigger>
          </UnorderedList>

          <OrderedList
            editorState={editorState}
            onToggle={this.onChange}>
            <OverlayTrigger
              placement='bottom'
              overlay={<Tooltip id='ORDEREDLIST'>OrderedList</Tooltip>}>
              <Icon name='list-ol' inverse={currentBlockTypeIs(editorState, 'ordered-list-item')}/>
            </OverlayTrigger>
          </OrderedList>

        </div>

        <div className='rich-text-editor-body' onMouseDown={() => this._addLink.close()}>
          <Editor
            ref={c => this._editor = c}
            editorState={editorState}
            checkedState={checkedState}
            onChangeCheckedState={this.onChangeCheckedState}
            customStyleMap={OLD_INLINE_STYLES}
            blockStyleFn={this.blockStyleFn}
            onChange={this.onChange} />
        </div>
        <button onClick={() => console.log(getHTML(editorState, checkedState))}>Log</button>
      </div>
    );
  }
  blockStyleFn(block) {
    switch (block.getType()) {
    case BLOCK_TYPES.CHECKABLE_LIST_ITEM: return BLOCK_TYPES.CHECKABLE_LIST_ITEM;
    case OLD_BLOCK_TYPES.ALIGN_CENTER: return OLD_BLOCK_TYPES.ALIGN_CENTER;
    case OLD_BLOCK_TYPES.ALIGN_RIGHT: return OLD_BLOCK_TYPES.ALIGN_RIGHT;
    case OLD_BLOCK_TYPES.ALIGN_JUSTIFY: return OLD_BLOCK_TYPES.ALIGN_JUSTIFY;
    default: return '';
    }
  }
  _insertImage({ name, original_url, preview_url }) {
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
  _insertDownloadLink({ name, download_url, size }) {
    const entityKey = Entity.create(ENTITY_TYPES.DOWNLOAD_LINK, 'MUTABLE', {
      name,
      size,
      url: download_url,
      target: '_blank'
    });
    const newEditorState = AtomicBlockUtils.insertAtomicBlock(
      this.state.editorState,
      entityKey,
      name
    );
    this.onChange(newEditorState);
  }
  _insertIFrame() {
    const string = window.prompt('Paste the iframe tag.');
    if (!/<iframe.+?<\/iframe>/.test(string)) {
      return alert('iframe タグを埋め込んでください');
    }

    const attrs = getIFrameAttrs(string);
    const entityKey = Entity.create(ENTITY_TYPES.IFRAME, 'IMMUTABLE', attrs);
    this.focusEditor();
    const newEditorState = AtomicBlockUtils.insertAtomicBlock(
      this.state.editorState,
      entityKey,
      ' '
    );
    this.onChange(newEditorState);
  }
}

ReactDOM.render((<RichTextEditorDemo initialHtml='' />), document.querySelector('#app-root'));
