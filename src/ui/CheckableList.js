import React, { Component, PropTypes } from 'react';
import { EditorState } from 'draft-js';
import { CHECKABLE_LIST_ITEM } from 'draft-js-checkable-list-item';
import BlockTypeButton from './BlockTypeButton';

export default class CheckableList extends Component {
  static get propTypes() {
    return {
      editorState: PropTypes.instanceOf(EditorState).isRequired,
      onToggleBlockType: PropTypes.func.isRequired,
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
      <BlockTypeButton
        type={CHECKABLE_LIST_ITEM}
        editorState={this.props.editorState}
        onToggle={this.props.onToggleBlockType}
        className={this.props.className}>
        {this.props.children}
      </BlockTypeButton>
    );
  }
}
