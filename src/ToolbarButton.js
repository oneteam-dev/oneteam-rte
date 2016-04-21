import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';

export default class ToolbarButton extends Component {
  constructor(props) {
    super(props);
    this.handleMouseDown = ev => this._handleMouseDown(ev);
  }
  render() {
    const { active, type } = this.props;
    return (
      <span
        className={classNames('rich-editor-toolbar-button', { active })}
        onMouseDown={this.handleMouseDown}>
        <span className='rich-editor-toolbar-button-inner'>
          <span className={`rich-editor-toolbar-button-icon ${type}`}>
            {this.props.children ? this.props.children : ''}
          </span>
        </span>
      </span>
    );
  }
  _handleMouseDown(ev) {
    ev.preventDefault();
    this.props.onClickButton(this.props.type);
  }
}

ToolbarButton.displayName = 'ToolbarButton';
ToolbarButton.propTypes = {
  type: PropTypes.string.isRequired,
  active: PropTypes.bool.isRequired,
  onClickButton: PropTypes.func,
  children: PropTypes.node
};
