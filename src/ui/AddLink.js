import React, { Component, PropTypes } from 'react';
import { EditorState } from 'draft-js';
import ButtonBase from './ButtonBase';
import toggleLink from '../functions/toggleLink';
import classnames from 'classnames';

export default class AddLink extends Component {
  static get propTypes() {
    return {
      editorState: PropTypes.instanceOf(EditorState).isRequired,
      onSubmit: PropTypes.func.isRequired,
      className: PropTypes.string,
      iconClassName: PropTypes.string,
      placeholder: PropTypes.string,
      validationErrorMessage: PropTypes.string,
      children: PropTypes.node,
      buttonText: PropTypes.string
    };
  }
  static get defaultProps() {
    return {
      className: '',
      placeholder: 'Enter a URL...',
      validationErrorMessage: 'Please enter a valid URL.',
      buttonText: '✔'
    };
  }
  constructor(props) {
    super(props);
    this.state = { value: '', validValue: true, isOpen: false };

    this.handleChangeValue = ({ target }) => this.setState({ value: target.value });
    this.handleSubmit = ev => this._handleSubmit(ev);
  }
  render() {
    return (
      <span className={classnames('rte-toolbar-button-add-link', this.props.className)}>
        <ButtonBase className={this.props.iconClassName} onMouseDown={ev => {
          ev.preventDefault();
          this.setState({ isOpen: !this.state.isOpen });
        }}>
          {this.props.children}
        </ButtonBase>
        <div className={classnames('rte-toolbar-button-add-link-input', {
          'is-show': this.state.isOpen
        })}>
          <input
            type='text'
            pattern='^https?:\/\/.+'
            placeholder={this.props.placeholder}
            value={this.state.value}
            onChange={this.handleChangeValue} />
          <button onClick={this.handleSubmit}>{this.props.buttonText}</button>
          <span className={classnames('add-link-error-message', {
            'is-show': !this.state.validValue
          })}>{this.props.validationErrorMessage}</span>
        </div>
      </span>
    );
  }
  close() {
    this.setState({ isOpen: false });
  }
  _handleSubmit(ev) {
    ev.preventDefault();
    if (this._validateValue()) {
      const newEditorState = toggleLink(this.props.editorState, this.state.value);
      this.props.onSubmit(newEditorState);
      this.setState({ value: '', isOpen: false });
    } else {
      this.setState({ validValue: false }, () => {
        setTimeout(() => this.setState({ validValue: true }), 2000);
      });
    }
  }
  _validateValue() {
    return this.state.value !== '' && /^https?:\/\/.+/.test(this.state.value);
  }
}
