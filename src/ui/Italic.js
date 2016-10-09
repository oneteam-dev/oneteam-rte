import React, { Component, PropTypes } from 'react';
import { EditorState } from 'draft-js';
import { INLINE_STYLES } from 'oneteam-rte-utils';
import InlineStyleButton from './InlineStyleButton';

export default class Italic extends Component {
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
        type={INLINE_STYLES.ITALIC}
        editorState={this.props.editorState}
        onToggle={this.props.onToggleInlineStyle}
        className={this.props.className}>
        {this.props.children}
      </InlineStyleButton>
    );
  }
}
