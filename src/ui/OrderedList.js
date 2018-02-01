import React from 'react';
import PropTypes from 'prop-types';
import { EditorState } from 'draft-js';
import { BLOCK_TYPES } from 'draft-js-oneteam-rte-plugin/lib/constants';
import BlockTypeButton from './BlockTypeButton';

const OrderedList = ({ editorState, onToggleBlockType, className, children }) => {
  return (
    <BlockTypeButton
      type={BLOCK_TYPES.ORDERED_LIST_ITEM}
      editorState={editorState}
      onToggle={onToggleBlockType}
      className={className}
    >
      {children}
    </BlockTypeButton>
  );
};

OrderedList.propTypes = {
  editorState: PropTypes.instanceOf(EditorState).isRequired,
  onToggleBlockType: PropTypes.func.isRequired,
  children: PropTypes.node,
  className: PropTypes.string
};

OrderedList.defaultProps = { className: '' };

export default OrderedList;
