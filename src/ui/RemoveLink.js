import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { EditorState } from 'draft-js';
import classnames from 'classnames';
import BaseButton from './BaseButton';
import toggleLink from '../functions/toggleLink';

export default class RemoveLink extends Component {
  static get propTypes() {
    return {
      editorState: PropTypes.instanceOf(EditorState).isRequired,
      onRemoveLink: PropTypes.func.isRequired,
      children: PropTypes.node,
      className: PropTypes.string
    };
  }
  static get defaultProps() {
    return {
      className: ''
    };
  }
  constructor(props) {
    super(props);
    this.handleMouseDown = ev => this._handleMouseDown(ev);
  }
  render() {
    return (
      <BaseButton className={classnames(this.props.className)} onMouseDown={this.handleMouseDown}>
        {this.props.children}
      </BaseButton>
    );
  }
  _handleMouseDown(ev) {
    ev.preventDefault();
    const newEditorState = toggleLink(this.props.editorState);
    this.props.onRemoveLink(newEditorState);
  }
}
