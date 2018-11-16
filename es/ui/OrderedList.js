import React from 'react';
import PropTypes from 'prop-types';
import { EditorState } from 'draft-js';
import { BLOCK_TYPES } from 'draft-js-oneteam-rte-plugin/lib/constants';
import BlockTypeButton from './BlockTypeButton';

var OrderedList = function OrderedList(_ref) {
  var editorState = _ref.editorState,
      onToggleBlockType = _ref.onToggleBlockType,
      className = _ref.className,
      children = _ref.children;
  return React.createElement(BlockTypeButton, {
    type: BLOCK_TYPES.ORDERED_LIST_ITEM,
    editorState: editorState,
    onToggle: onToggleBlockType,
    className: className
  }, children);
};

OrderedList.propTypes = {
  editorState: PropTypes.instanceOf(EditorState).isRequired,
  onToggleBlockType: PropTypes.func.isRequired,
  children: PropTypes.node,
  className: PropTypes.string
};
OrderedList.defaultProps = {
  className: ''
};
export default OrderedList;