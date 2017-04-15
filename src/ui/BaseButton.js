import isFunction from 'lodash/isFunction';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

export default class BaseButton extends Component {
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
        className={classnames('rich-text-editor-toolbar-button', className, { active })}
        onMouseDown={this.handleMouseDown}
        onClick={this.handleClick}>
        <span className='rich-text-editor-toolbar-button-inner'>
          {children ? children : null}
        </span>
      </span>
    );
  }
  _handleMouseDown(ev) {
    if (isFunction(this.props.onMouseDown)) {
      this.props.onMouseDown(ev);
    }
  }
  _handleClick(ev) {
    if (isFunction(this.props.onClick)) {
      this.props.onClick(ev);
    }
  }
}
