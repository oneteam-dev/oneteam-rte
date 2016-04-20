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
      <div data-offset-key={offsetKey}>
        <span
          className={classNames('checkable-list-item-checkbox', {
            'is-checked': checked
          })}
          contentEditable='false'
          suppressContentEditableWarning>
          <input type='checkbox' checked={checked} onChange={onChangeChecked}/>
        </span>
        <span className='checkable-list-item-text' data-offset-key={offsetKey}>
          <EditorBlock {...this.props} />
        </span>
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
