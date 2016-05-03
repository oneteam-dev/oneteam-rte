import React, { Component, PropTypes } from 'react';
import { EditorState } from 'draft-js';
import InlineStyleButton from './InlineStyleButton';
import { INLINE_STYLES } from '../constants';

export default class Strikethrough extends Component {
  static get propTypes() {
    return {
      editorState: PropTypes.instanceOf(EditorState).isRequired,
      onToggleInlineStyle: PropTypes.func.isRequired,
      children: PropTypes.node,
      className: PropTypes.string
    };
  }
  static get defaultProps() {
    return { className: '' };
  }
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <InlineStyleButton
        type={INLINE_STYLES.STRIKETHROUGH}
        editorState={this.props.editorState}
        onToggle={this.props.onToggleInlineStyle}
        className={this.props.className}>
        {this.props.children}
      </InlineStyleButton>
    );
  }
}
