import React, { Component, PropTypes } from 'react';
import { EditorBlock } from 'draft-js';
import classNames from 'classnames';

export default class CheckableListItem extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { blockProps, offsetKey } = this.props;
    const { checked, onChangeChecked } = blockProps;

    return (
      <div data-offset-key={offsetKey} className='checkable-list-item-body'>
        <div className={classNames('checkable-list-item-checkbox', {
          'is-checked': checked
        })}>
          <input
            type='checkbox'
            contentEditable='false'
            suppressContentEditableWarning
            checked={checked} onChange={onChangeChecked} />
        </div>
        <div className='checkable-list-item-text'>
          <EditorBlock {...this.props} />
        </div>
      </div>
    );
  }
}

CheckableListItem.displayName = 'CheckableListItem';
CheckableListItem.propTypes = {
  blockProps: PropTypes.shape({
    checked: PropTypes.bool.isRequired,
    onChangeChecked: PropTypes.func.isRequired
  }).isRequired
};
