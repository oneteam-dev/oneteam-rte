import React, { Component, PropTypes, Children, cloneElement } from 'react';
import { Entity, CompositeDecorator, AtomicBlockUtils } from 'draft-js';
import isFunction from 'lodash/isFunction';
import Body from './Body';
import Toolbar from './Toolbar';
import stateToHTML from './stateToHTML';
import { getCurrentBlockType, hasCurrentInlineStyle, createEditorState, createCheckedState } from './utils';
import { getIFrameAttrs } from './helpers'
import LinkDecorator from './decorators/LinkDecorator';
import DownloadLinkDecorator from './decorators/DownloadLinkDecorator';
import { ENTITY_TYPES, INLINE_STYLES } from './constants';
import * as functions from './functions';

export default class RichTextEditor extends Component {
  static get propTypes() {
    return {
      initialHtml: PropTypes.string,
      decorators: PropTypes.arrayOf(PropTypes.instanceOf(CompositeDecorator)),
      onChange: PropTypes.func,
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
  createEditorState(html) {
    const decorator = new CompositeDecorator([
      LinkDecorator,
      DownloadLinkDecorator,
      ...this.props.decorators
    ]);
    const cleanHTML = html.replace(/>\s+</g, '><'); // FIXME ;(
    const editorState = createEditorState(cleanHTML, decorator);
    const checkedState = createCheckedState(editorState.getCurrentContent().getBlocksAsArray());
    return { editorState, checkedState };
  }
  set html(html) {
    this.setState(this.createEditorState(html));
  }
  get html() {
    return this.serializedHTML;
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
    const state = this.createEditorState(this.props.initialHtml);
    state.isOpenInsertLinkInput = false;
    this.state = state;

    var triggerLock = 0; // To reduce triggering change callbacks.
    const triggerOnChange = () => {
      const {onChange} = this.props;
      if(isFunction(onChange) && triggerLock === 0) {
        triggerLock = setTimeout(() => {
          onChange(this);
          triggerLock = 0;
        }, 100);
      }
    }
    this.changeEditorState = editorState => this.setState({ editorState }, triggerOnChange);
    this.changeCheckedState = checkedState => this.setState({ checkedState }, triggerOnChange);
    this.insertImage = imageFile => this._insertImage(imageFile);
    this.insertDownloadLink = file => this._insertDownloadLink(file);
    this.insertIFrame = iframeTagString => this._insertIFrame(iframeTagString);
    this.getCurrentBlockType = (...args) => getCurrentBlockType(this.state.editorState, ...args);
    this.hasCurrentInlineStyle = (...args) => hasCurrentInlineStyle(this.state.editorState, ...args);

    for(let key in functions) {
      this[key] = ((fn) => {
        return (...args) => {
          this.changeEditorState(fn(this.state.editorState, ...args));
        }
      })(functions[key]);
    }
  }
  getCurrentInlineStyles() {
      let ret = [];
      for(const key in INLINE_STYLES) {
          const value = INLINE_STYLES[key];
          if(this.hasCurrentInlineStyle(value)) {
              ret.push(value);
          }
      }
      return ret;
  }
  focus() {
    if(this._body) {
      this._body.focus();
    }
  }
  blur() {
    if(this._body) {
      this._body.blur();
    }
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
          onToggleHeadingAfter: () => this.focus()
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
    this.changeEditorState(newEditorState);
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
    this.changeEditorState(newEditorState);
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
      this.changeEditorState(newEditorState);
    }, 1000);
  }
}

RichTextEditor.Toolbar = Toolbar;
RichTextEditor.Body = Body;
