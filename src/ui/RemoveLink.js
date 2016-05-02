import React, { Component, PropTypes } from 'react';
import { EditorState } from 'draft-js';
import classnames from 'classnames';
import ButtonBase from './ButtonBase';
import toggleLink from '../functions/toggleLink';

export default class RemoveLink extends Component {
  static get propTypes() {
    return {
      editorState: PropTypes.instanceOf(EditorState).isRequired,
      onClick: PropTypes.func.isRequired,
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
      <ButtonBase className={classnames(this.props.className)} onMouseDown={this.handleMouseDown}>
        {this.props.children}
      </ButtonBase>
    );
  }
  _handleMouseDown(ev) {
    ev.preventDefault();
    const newEditorState = toggleLink(this.props.editorState);
    this.props.onClick(newEditorState);
  }
}
