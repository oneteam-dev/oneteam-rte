import React, { Component, PropTypes } from 'react';
import { EditorState } from 'draft-js';
import InlineStyleButton from './InlineStyleButton';
import { INLINE_STYLES } from '../constants';

export default class Italic extends Component {
  static get propTypes() {
    return {
      editorState: PropTypes.instanceOf(EditorState).isRequired,
      onToggle: PropTypes.func.isRequired,
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
        onToggle={this.props.onToggle}
        className={this.props.className}>
        {this.props.children}
      </InlineStyleButton>
    );
  }
}
