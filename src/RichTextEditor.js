import React, { Component, PropTypes, Children, cloneElement } from 'react';
import stateToHTML from 'oneteam-rte-converter/lib/editorStateToHTML';
import { ENTITY_TYPES, INLINE_STYLES } from 'oneteam-rte-constants';
import isFunction from 'lodash/isFunction';
import Body from './Body';
import Toolbar from './Toolbar';
import { getCurrentBlockType, hasCurrentInlineStyle, createEditorState, updateEditorState } from './utils';
import { insertAtomicBlock } from './functions';
import { getIFrameAttrs } from './helpers';
import * as functions from './functions';
import { htmlToMarkdown, markdownToHTML } from './encoding';

export default class RichTextEditor extends Component {
  static get propTypes() {
    return {
      initialHtml: PropTypes.string,
      onChange: PropTypes.func,
      children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.element),
        PropTypes.element
      ])
    };
  }
  static get defaultProps() {
    return {
      initialHtml: ''
    };
  }
  createEditorState(html) {
    const cleanHTML = html.replace(/>\s+</g, '><'); // FIXME ;(
    const editorState = createEditorState(cleanHTML);
    return { editorState };
  }
  set html(html) {
    const editorState = updateEditorState(this.state.editorState, html);
    this.setState({ editorState });
  }
  get html() {
    return this.serializedHTML;
  }
  get serializedHTML() {
    return stateToHTML(this._contentState);
  }
  get markdown() {
    return htmlToMarkdown(this.html);
  }
  get _editorState() {
    return this.state.editorState;
  }
  get _contentState() {
    return this._editorState.getCurrentContent();
  }
  toHTML(text) {
    return markdownToHTML(text);
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
    this.insertImage = imageFile => this._insertImage(imageFile);
    this.insertDownloadLink = file => this._insertDownloadLink(file);
    this.insertIFrame = iframeTagString => this._insertIFrame(iframeTagString);
    this.insertPlaceholder = (...args) => this._insertPlaceholder(...args);
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
  render() {
    const { editorState, isOpenInsertLinkInput } = this.state;
    const content = Children.map((this.props.children || []), child => {
      return cloneElement(
        child,
        {
          editorState,
          isOpenInsertLinkInput,
          changeEditorState: this.changeEditorState,
          toggleInsertLinkInput: () => this.setState({ isOpenInsertLinkInput: !isOpenInsertLinkInput }),
          closeInsertLinkInput: () => this.setState({ isOpenInsertLinkInput: false })
        }
      );
    });

    return <div className='rich-text-editor' id='rich-text-editor'>{content}</div>;
  }
  _insertImage({ name, original_url, preview_url }) {
    const newEditorState = insertAtomicBlock(this.state.editorState, ENTITY_TYPES.IMAGE, 'IMMUTABLE', {
      src: preview_url,
      'data-original-url': original_url,
      alt: name
    });
    this.changeEditorState(newEditorState);
  }
  _insertDownloadLink({ name, download_url, size }) {
    const newEditorState = insertAtomicBlock(
      this.state.editorState,
      ENTITY_TYPES.DOWNLOAD_LINK,
      'MUTABLE',
      {
        name,
        size,
        url: download_url,
        target: '_blank'
      },
      name
    );
    this.changeEditorState(newEditorState);
  }
  _insertIFrame(iframeTag) {
    const attrs = getIFrameAttrs(iframeTag);

    setTimeout(() => { // FIXME
      const newEditorState = insertAtomicBlock(this.state.editorState, ENTITY_TYPES.IFRAME, 'IMMUTABLE', attrs);
      this.changeEditorState(newEditorState);
    }, 1000);
  }
  // NOTE: This method is unused, delete in future
  // _insertWebCard(url, imageRemoved) {
  //   const newEditorState = insertAtomicBlock(this.state.editorState, ENTITY_TYPES.WEB_CARD, 'IMMUTABLE', { url, imageRemoved });
  //   this.changeEditorState(newEditorState);
  // }
  _insertPlaceholder(data, name) {
    const newEditorState = insertAtomicBlock(
      this.state.editorState,
      'PLACEHOLDER',
      'IMMUTABLE',
      { ...data, name }
    );
    this.changeEditorState(newEditorState);
  }
}

RichTextEditor.Toolbar = Toolbar;
RichTextEditor.Body = Body;
