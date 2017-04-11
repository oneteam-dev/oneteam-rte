import React, { Component, PropTypes, Children, cloneElement } from 'react';
import Editor from 'draft-js-plugins-editor';
import { INLINE_STYLES } from 'draft-js-oneteam-rte-plugin/lib/constants';
import * as modifiers from 'draft-js-oneteam-rte-plugin/lib/modifiers';
import { emojioneList } from 'emojione';
import isFunction from 'lodash/isFunction';
import classNames from 'classnames';
import { getCurrentBlockType, hasCurrentInlineStyle, createEditorState, updateEditorState } from './utils';
import { contentToHTML, htmlToMarkdown } from './encoding'
import createPlugins from './plugins';
import 'draft-js/dist/Draft.css';
import 'draft-js-oneteam-rte-plugin/lib/plugin.css';
import 'draft-js-checkable-list-plugin/lib/plugin.css';
import 'draft-js-emoji-plugin/lib/plugin.css';

export default class RichTextEditor extends Component {
  static propTypes = {
    initialHtml: PropTypes.string,
    onChange: PropTypes.func,
    className: PropTypes.string,
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.element),
      PropTypes.element
    ]),
    placeholder: PropTypes.string,
    readOnly: PropTypes.bool,
    onReturnWithCommand: PropTypes.func,
    onPastedFiles: PropTypes.func,
    onKeyDown: PropTypes.func,
    customAtomicBlockRendererFn: PropTypes.func,
    atomicBlockRenderMap: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.element, PropTypes.func])),
    onCompleteFileUpload: PropTypes.func,
    priorityEmojiShortnames: PropTypes.arrayOf(PropTypes.string)
  }
  static defaultProps = {
    placeholder: 'Contents here...',
    readOnly: false,
    initialHtml: ''
  }
  set html(html) {
    const editorState = updateEditorState(this.state.editorState, html);
    this.setState({ editorState });
  }
  get html() {
    return contentToHTML(this._contentState);
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
  get plugins() {
    return this._plugins;
  }
  get oneteamRTEPlugin() {
    return this.plugins.oneteamRTEPlugin;
  }
  get emojiPlugin() {
    return this.plugins.emojiPlugin;
  }
  get firstBlockText() {
    return this._contentState.getFirstBlock().getText();
  }
  get modifiers() {
    return modifiers;
  }
  get plainText() {
    return this._contentState.getPlainText();
  }
  closeInsertLinkInput = () => this.setState({ isOpenInsertLinkInput: false })
  toggleInsertLinkInput = () => this.setState({ isOpenInsertLinkInput: !this.state.isOpenInsertLinkInput })
  handleContainerMouseDown = () => {
    if (this.state.isOpenInsertLinkInput) {
      this.closeInsertLinkInput();
    }
  }

  constructor(props) {
    super(props);
    this.state = {
      editorState: createEditorState(this.props.initialHtml),
      isOpenInsertLinkInput: false
    };

    this._plugins = createPlugins({
      oneteamRTE: {
        customAtomicBlockRendererFn: this.props.customAtomicBlockRendererFn,
        onReturnWithCommand: this.props.onReturnWithCommand,
        onPastedFiles: this.props.onPastedFiles,
        atomicBlockRenderMap: this.props.atomicBlockRenderMap,
        onCompleteFileUpload: this.props.onCompleteFileUpload
      },
      emoji: {
        priorityList: this.props.priorityEmojiShortnames.reduce((ret, shortname) => ({
          ...ret,
          [shortname]: emojioneList[shortname].unicode
        }), {})
      }
    });

    let triggerLock = 0; // To reduce triggering change callbacks.
    const triggerOnChange = () => {
      const { onChange } = this.props;
      if (isFunction(onChange) && triggerLock === 0) {
        triggerLock = setTimeout(() => {
          onChange(this);
          triggerLock = 0;
        }, 100);
      }
    }

    this.changeEditorState = editorState => this.setState({ editorState }, triggerOnChange);
    this.getCurrentBlockType = (...args) => getCurrentBlockType(this.state.editorState, ...args);
    this.hasCurrentInlineStyle = (...args) => hasCurrentInlineStyle(this.state.editorState, ...args);

    Object.keys(this.oneteamRTEPlugin.modifiers).forEach((k) => {
      this[k] = this.oneteamRTEPlugin.modifiers[k];
    });
  }
  getCurrentInlineStyles() {
    let ret = [];
    for (const key in INLINE_STYLES) {
      const value = INLINE_STYLES[key];
      if (this.hasCurrentInlineStyle(value)) {
        ret.push(value);
      }
    }
    return ret;
  }
  renderChildren() {
    const { editorState, isOpenInsertLinkInput } = this.state;

    const children = Children.map((this.props.children || []), child => {
      return cloneElement(
        child,
        {
          editorState,
          isOpenInsertLinkInput,
          onChange: this.changeEditorState,
          toggleInsertLinkInput: this.toggleInsertLinkInput
        }
      );
    });

    return children;
  }
  render() {
    const { editorState } = this.state;
    const { className, readOnly, placeholder } = this.props;
    const bodyClassName = classNames(
      'rich-text-editor-body',
      { 'RichEditor-hidePlaceholder': this._shouldHidePlaceholder() },
      className
    );

    return <div className='rich-text-editor' id='rich-text-editor'>
      {this.renderChildren()}
      <div
        className={bodyClassName}
        onMouseDown={this.handleContainerMouseDown}
      >
        <Editor
          plugins={this._plugins.all}
          ref={c => this.editor = c}
          editorState={editorState}
          readOnly={readOnly}
          onChange={this.changeEditorState}
          onKeyDown={this.props.onKeyDown}
          placeholder={placeholder}
        />
        <this.emojiPlugin.EmojiSuggestions />
      </div>
    </div>;
  }
  _shouldHidePlaceholder() {
    const contentState = this.state.editorState.getCurrentContent();
    if (!contentState.hasText()) {
      if (contentState.getFirstBlock().getType() !== 'unstyled') {
        return true;
      }
    }
    return false;
  }

  /**
   * @public
   */
  focus = () => this.editor.focus()
  blur = () => this.editor.blur()
}
