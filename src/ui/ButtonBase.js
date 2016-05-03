import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';

export default class ButtonBase extends Component {
  static get propTypes() {
    return {
      className: PropTypes.string,
      active: PropTypes.bool,
      children: PropTypes.node,
      onMouseDown: PropTypes.func,
      onClick: PropTypes.func
    };
  }
  constructor(props) {
    super(props);
    this.handleMouseDown = ev => this._handleMouseDown(ev);
    this.handleClick = ev => this._handleClick(ev);
  }
  render() {
    const { className, active, children } = this.props;
    return (
      <span
        className={classnames('rte-toolbar-button', className, { active })}
        onMouseDown={this.handleMouseDown}
        onClick={this.handleClick}>
        <span className='rte-toolbar-button-inner'>
          {children ? children : null}
        </span>
      </span>
    );
  }
  _handleMouseDown(ev) {
    if (typeof this.props.onMouseDown === 'function') {
      this.props.onMouseDown(ev);
    }
  }
  _handleClick(ev) {
    if (typeof this.props.onClick === 'function') {
      this.props.onClick(ev);
    }
  }
}
