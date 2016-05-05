import React, { Component, PropTypes, Children, cloneElement } from 'react';
import { Entity, CompositeDecorator, AtomicBlockUtils } from 'draft-js';
import Body from './Body';
import Toolbar from './Toolbar';
import stateToHTML from './stateToHTML';
import { createEditorState, createCheckedState } from './utils';
import { getIFrameAttrs } from './helpers'
import LinkDecorator from './decorators/LinkDecorator';
import DownloadLinkDecorator from './decorators/DownloadLinkDecorator';
import { ENTITY_TYPES } from './constants';

export default class RichTextEditor extends Component {
  static get propTypes() {
    return {
      initialHtml: PropTypes.string,
      decorators: PropTypes.arrayOf(PropTypes.instanceOf(CompositeDecorator)),
      children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.element),
        PropTypes.element
      ])
    };
  }
  static get defaultProps() {
    return {
      initialHtml: '',
      decorators: []
    };
  }
  get serializedHTML() {
    return stateToHTML(this._editorState, this._checkedState);
  }
  get _editorState() {
    return this.state.editorState;
  }
  get _checkedState() {
    return this.state.checkedState;
  }
  constructor(props) {
    super(props);

    const decorator = new CompositeDecorator([
      LinkDecorator,
      DownloadLinkDecorator,
      ...this.props.decorators
    ]);
    const initialHtml = this.props.initialHtml.replace(/>\s+</g, '><'); // FIXME ;(
    const editorState = createEditorState(initialHtml, decorator);
    const checkedState = createCheckedState(editorState.getCurrentContent().getBlocksAsArray());

    this.state = { editorState, checkedState, isOpenInsertLinkInput: false };

    this.changeEditorState = editorState => this.setState({ editorState });
    this.changeCheckedState = checkedState => this.setState({ checkedState });
    this.insertImage = imageFile => this._insertImage(imageFile);
    this.insertDownloadLink = file => this._insertDownloadLink(file);
    this.insertIFrame = iframeTagString => this._insertIFrame(iframeTagString);
  }
  render() {
    const { editorState, checkedState, isOpenInsertLinkInput } = this.state;
    const content = Children.map((this.props.children || []), child => {
      return cloneElement(
        child,
        {
          editorState,
          checkedState,
          isOpenInsertLinkInput,
          changeEditorState: this.changeEditorState,
          changeCheckedState: this.changeCheckedState,
          toggleInsertLinkInput: () => this.setState({ isOpenInsertLinkInput: !isOpenInsertLinkInput }),
          closeInsertLinkInput: () => this.setState({ isOpenInsertLinkInput: false }),
          ref: c => this[`_${child.type.name.toLowerCase()}`] = c,
          onToggleHeadingAfter: () => this._body ? this._body.focus() : null
        }
      );
    });

    return <div className='rich-text-editor' id='rich-text-editor'>{content}</div>;
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
    this.setState({ editorState: newEditorState });
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
    this.setState({ editorState: newEditorState });
  }
  _insertIFrame(iframeTag) {
    const attrs = getIFrameAttrs(iframeTag);

    setTimeout(() => { // FIXME
      const entityKey = Entity.create(ENTITY_TYPES.IFRAME, 'IMMUTABLE', attrs);
      const newEditorState = AtomicBlockUtils.insertAtomicBlock(
        this.state.editorState,
        entityKey,
        ' '
      );
      this.setState({ editorState: newEditorState });
    }, 1000);
  }
}

RichTextEditor.Toolbar = Toolbar;
RichTextEditor.Body = Body;
