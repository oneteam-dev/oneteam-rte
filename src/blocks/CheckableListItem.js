import React, { Component, PropTypes } from 'react';
import { EditorBlock } from 'draft-js';
import classNames from 'classnames';

export default class CheckableListItem extends Component {
  constructor(props) {
    super(props);
    this.handleChangeCheckbox = ev => this._handleChangeCheckbox(ev);
  }
  render() {
    const { blockProps, offsetKey } = this.props;
    const { checked } = blockProps;

    return (
      <div data-offset-key={offsetKey} className='checkable-list-item-body'>
        <div
          className={classNames('checkable-list-item-checkbox', {
            'is-checked': checked
          })}
          contentEditable='false'
          suppressContentEditableWarning>
          <input type='checkbox' checked={checked} onChange={this.handleChangeCheckbox} />
        </div>
        <div className='checkable-list-item-text'>
          <EditorBlock {...this.props} />
        </div>
      </div>
    );
  }
  _handleChangeCheckbox({ target }) {
    this.props.blockProps.onChangeChecked(target.checked);
  }
}

CheckableListItem.displayName = 'CheckableListItem';
CheckableListItem.propTypes = {
  offsetKey: PropTypes.string,
  blockProps: PropTypes.shape({
    checked: PropTypes.bool.isRequired,
    onChangeChecked: PropTypes.func.isRequired
  }).isRequired
};
