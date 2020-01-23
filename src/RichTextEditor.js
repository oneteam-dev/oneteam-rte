import React, { Component, Children, cloneElement } from 'react';
import { userMentionType, groupMentionType } from 'react-oneteam/lib/Mention';
import ErrorBoundary from 'react-minimal-error-boundary';
import PropTypes from 'prop-types';
import { EditorState } from 'draft-js';
import { insertText } from 'draft-js-modifiers';
import Editor from 'draft-js-plugins-editor';
import { INLINE_STYLES } from 'draft-js-oneteam-rte-plugin/lib/constants';
import * as modifiers from 'draft-js-oneteam-rte-plugin/lib/modifiers';
import { emojioneList } from 'emojione';
import classNames from 'classnames';
import { getCurrentBlockType, hasCurrentInlineStyle, createEditorState, updateEditorState, mentionSuggestionsFilter } from './utils';
import { contentToHTML, htmlToMarkdown } from './encoding'
import createPlugins from './plugins';
import { convertToMentions } from './plugins/hashtagList';
import MentionSuggestionsEntry from './plugins/mention/components/MentionSuggestionsEntry';
import 'draft-js/dist/Draft.css';
import 'draft-js-oneteam-rte-plugin/lib/plugin.css';
import 'draft-js-checkable-list-plugin/lib/plugin.css';
import '@sugarshin/draft-js-emoji-plugin/lib/plugin.css';
import 'draft-js-mention-plugin/lib/plugin.css';
import 'react-oneteam/lib/react-oneteam.css';

function normalizeSelection(editorState) {
  return EditorState.forceSelection(editorState, editorState.getSelection());
}

function isHeaderBlock(blockTypeName) {
  return ['one', 'two', 'three', 'four', 'five', 'six'].map(str => `header-${str}`).includes(blockTypeName);
}

function isDisableHashtagSuggest(blockTypeName) {
  return isHeaderBlock(blockTypeName) || blockTypeName === 'code-block';
}

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
    onFocus: PropTypes.func,
    onBlur: PropTypes.func,
    onReturnWithCommand: PropTypes.func,
    onPastedFiles: PropTypes.func,
    onPastedText: PropTypes.func,
    onBeforeInput: PropTypes.func,
    onKeyDown: PropTypes.func,
    onError: PropTypes.func,
    onRerenderedAfterError: PropTypes.func,
    customAtomicBlockRendererFn: PropTypes.func,
    atomicBlockRenderMap: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.element, PropTypes.func])),
    onCompleteFileUpload: PropTypes.func,
    priorityEmojiShortnames: PropTypes.arrayOf(PropTypes.string),
    emojiImagePath: PropTypes.string,
    rawMentions: PropTypes.arrayOf(
      PropTypes.oneOfType([userMentionType, groupMentionType])
    ),
    hashtagList: PropTypes.arrayOf(PropTypes.string),
    disableWebCardCreation: PropTypes.bool,
    stripPastedStyles: PropTypes.bool,
  }
  static defaultProps = {
    placeholder: 'Contents here...',
    readOnly: false,
    initialHtml: '',
    stripPastedStyles: false,
  }
  set html(html) {
    const { editorState, mentionSuggestions } = this.state;
    const newEditorState = updateEditorState(editorState, html, mentionSuggestions);
    this.setState({ editorState: newEditorState });
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
  get mentionPlugin() {
    return this.plugins.mentionPlugin;
  }

  get hashtagSuggestPlugin() {
    return this.plugins.hashtagSuggestPlugin;
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
  handleMentionSearchChange = ({ value }) => {
    this.setState({
      mentionSuggestions: mentionSuggestionsFilter(value, this.props.rawMentions)
    });
  }

  handleHashTagMentionSearchChange = ({ value }) => {
    this.setState({
      hashTagSuggestions: mentionSuggestionsFilter(value, convertToMentions(this.props.hashtagList))
    });
  }

  constructor(props) {
    super(props);
    const mentionSuggestions = this.props.rawMentions;
    const editorState = createEditorState(
      this.props.initialHtml,
      null,
      { mentions: mentionSuggestions }
    );
    this.state = {
      editorState,
      isOpenInsertLinkInput: false,
      mentionSuggestions,
      hashTagSuggestions: convertToMentions(this.props.hashtagList)
    };

    this._plugins = createPlugins({
      oneteamRTE: {
        customAtomicBlockRendererFn: this.props.customAtomicBlockRendererFn,
        onReturnWithCommand: this.props.onReturnWithCommand,
        onPastedFiles: this.props.onPastedFiles,
        atomicBlockRenderMap: this.props.atomicBlockRenderMap,
        onCompleteFileUpload: this.props.onCompleteFileUpload,
        disableWebCardCreation: this.props.disableWebCardCreation
      },
      emoji: {
        priorityList: this.props.priorityEmojiShortnames ?
          this.props.priorityEmojiShortnames.reduce((ret, shortname) => ({
            ...ret,
            [shortname]: emojioneList[shortname].unicode
          }), {}) :
          undefined,
        imagePath: this.props.emojiImagePath
      },
      hashtagList: this.props.hashtagList
    });

    this.changeEditorState = editorState => this.setState({ editorState }, this.props.onChange);
    this.getCurrentBlockType = (...args) => getCurrentBlockType(this.state.editorState, ...args);
    this.hasCurrentInlineStyle = (...args) => hasCurrentInlineStyle(this.state.editorState, ...args);
    this.handlePastedText = (...args) => {
      if (typeof this.props.onPastedText === 'function' && this.props.onPastedText(...args)) {
        return 'handled';
      }
      return 'not-handled';
    }
    this.handleBeforeInput = (...args) => {
      if (typeof this.props.onBeforeInput === 'function' && this.props.onBeforeInput(...args)) {
        return 'handled';
      }
      return 'not-handled';
    }
    this.handleFocus = () => {
      if (typeof this.props.onFocus === 'function') {
        this.props.onFocus();
      }
    }
    this.handleBlur = () => {
      if (typeof this.props.onBlur === 'function') {
        this.props.onBlur();
      }
    }

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

  getBlockTypeName = () => {
    const { editorState } = this.state;
    const selection = editorState.getSelection();
    return editorState
      .getCurrentContent()
      .getBlockForKey(selection.getStartKey())
      .getType();
  };
  render() {
    const { editorState } = this.state;
    const { className, readOnly, placeholder, onError, onRerenderedAfterError, stripPastedStyles } = this.props;
    const bodyClassName = classNames(
      'rich-text-editor-body',
      { 'RichEditor-hidePlaceholder': this._shouldHidePlaceholder() },
      className
    );

    return (
      <ErrorBoundary rerender onError={onError} onRerendered={onRerenderedAfterError}>
        <div className='rich-text-editor' id='rich-text-editor'>
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
              handlePastedText={this.handlePastedText}
              handleBeforeInput={this.handleBeforeInput}
              onChange={this.changeEditorState}
              onKeyDown={this.props.onKeyDown}
              onFocus={this.handleFocus}
              onBlur={this.handleBlur}
              placeholder={placeholder}
              stripPastedStyles={stripPastedStyles}
            />
            <this.emojiPlugin.EmojiSuggestions />
            <this.mentionPlugin.MentionSuggestions
              suggestions={this.state.mentionSuggestions}
              onSearchChange={this.handleMentionSearchChange}
              entryComponent={MentionSuggestionsEntry}
            />
            {isDisableHashtagSuggest(this.getBlockTypeName()) ? null : (
              <this.hashtagSuggestPlugin.MentionSuggestions
                onSearchChange={this.handleHashTagMentionSearchChange}
                suggestions={this.state.hashTagSuggestions}
              />
            )}
          </div>
        </div>
      </ErrorBoundary>
    );
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
  _applyEditorState(editorState) {
    const { onChange } = this.props;

    onChange // eslint-disable-line no-unused-expressions
      ? this.setState({ editorState }, onChange)
      : this.setState({ editorState });
  }

  /**
   * @public
   */
  focus = () => {
    if (this.editor) {
      this.editor.focus();
    }
  }
  blur = () => {
    if (this.editor) {
      this.editor.blur();
    }
  }
  insertText = (text) => {
    const nextEditorState = insertText(this.state.editorState, text);
    this._applyEditorState(normalizeSelection(nextEditorState));
  }
}
