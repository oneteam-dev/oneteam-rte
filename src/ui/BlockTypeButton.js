import React, { Component, PropTypes } from 'react';
import { EditorState } from 'draft-js';
import BaseButton from './BaseButton';
import toggleBlockType from '../functions/toggleBlockType';
import checkCurrentBlockType from '../utils/checkCurrentBlockType';

export default class BlockTypeButton extends Component {
  static get propTypes() {
    return {
      type: PropTypes.string.isRequired,
      editorState: PropTypes.instanceOf(EditorState).isRequired,
      onToggle: PropTypes.func.isRequired,
      className: PropTypes.string,
      children: PropTypes.node,
      active: PropTypes.bool
    };
  }
  static get defaultProps() {
    return { className: '' };
  }
  constructor(props) {
    super(props);
    this.handleMouseDown = ev => this._handleMouseDown(ev);
  }
  _handleMouseDown(ev) {
    ev.preventDefault();
    this.props.onToggle(
      toggleBlockType(this.props.editorState, this.props.type)
    );
  }
  render() {
    return (
      <BaseButton
        className={this.props.className}
        onMouseDown={this.handleMouseDown}
        active={checkCurrentBlockType(this.props.editorState, this.props.type)}>
        {this.props.children}
      </BaseButton>
    );
  }
}
