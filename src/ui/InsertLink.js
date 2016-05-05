import React, { Component, PropTypes } from 'react';
import FormControl from 'react-bootstrap/lib/FormControl'
import Button from 'react-bootstrap/lib/Button'
import { EditorState } from 'draft-js';
import BaseButton from './BaseButton';
import toggleLink from '../functions/toggleLink';
import classnames from 'classnames';

export default class InsertLink extends Component {
  static get propTypes() {
    return {
      editorState: PropTypes.instanceOf(EditorState).isRequired,
      onInsertLink: PropTypes.func.isRequired,
      className: PropTypes.string,
      iconClassName: PropTypes.string,
      placeholder: PropTypes.string,
      validationErrorMessage: PropTypes.string,
      children: PropTypes.node,
      buttonText: PropTypes.string,
      isOpen: PropTypes.bool,
      onMouseDownToggle: PropTypes.func.isRequired
    };
  }
  static get defaultProps() {
    return {
      className: '',
      iconClassName: '',
      placeholder: 'Enter a URL...',
      validationErrorMessage: 'Please enter a valid URL.',
      buttonText: '✔',
      isOpen: false
    };
  }
  constructor(props) {
    super(props);
    this.state = { value: '', validValue: true };

    this.handleChangeValue = ({ target }) => this.setState({ value: target.value });
    this.handleClickButton = ev => this._handleClickButton(ev);
  }
  render() {
    const {
      className, children, isOpen, onMouseDownToggle, placeholder, buttonText, validationErrorMessage
    } = this.props;
    return (
      <span className={classnames('rich-text-editor-toolbar-button-insert-link', className)}>
        <BaseButton className={this.props.iconClassName} onMouseDown={onMouseDownToggle}>
          {children}
        </BaseButton>
        <div className={classnames('rich-text-editor-toolbar-button-insert-link-input', {
          'is-show': isOpen
        })}>
          <FormControl
            type='text'
            pattern='^https?:\/\/.+'
            placeholder={placeholder}
            value={this.state.value}
            onChange={this.handleChangeValue} />
          <Button onClick={this.handleClickButton}>{buttonText}</Button>
          <span className={classnames('insert-link-error-message', {
            'is-show': !this.state.validValue
          })}>{validationErrorMessage}</span>
        </div>
      </span>
    );
  }
  close() {
    this.setState({ isOpen: false });
  }
  _handleClickButton(ev) {
    ev.preventDefault();
    if (this._isValidValue()) {
      const value = this._hasHTTPProtocol(this.state.value) ? this.state.value :
        this._addHTTPProtocol(this.state.value);
      const newEditorState = toggleLink(this.props.editorState, value);
      this.props.onInsertLink(newEditorState);
      this.setState({ value: '', isOpen: false });
    } else {
      this.setState({ validValue: false }, () => {
        setTimeout(() => this.setState({ validValue: true }), 2000);
      });
    }
  }
  _isValidValue() {
    return this.state.value !== '';
  }
  _hasHTTPProtocol(value) {
    return /^https?:\/\/.+/.test(value);
  }
  _addHTTPProtocol(value) {
    return `http://${value}`;
  }
}
