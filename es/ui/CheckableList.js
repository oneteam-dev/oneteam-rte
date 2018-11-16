import React from 'react';
import PropTypes from 'prop-types';
import { EditorState } from 'draft-js';
import { CHECKABLE_LIST_ITEM } from 'draft-js-checkable-list-item';
import BlockTypeButton from './BlockTypeButton';

var CheckableList = function CheckableList(_ref) {
  var editorState = _ref.editorState,
      onToggleBlockType = _ref.onToggleBlockType,
      className = _ref.className,
      children = _ref.children;
  return React.createElement(BlockTypeButton, {
    type: CHECKABLE_LIST_ITEM,
    editorState: editorState,
    onToggle: onToggleBlockType,
    className: className
  }, children);
};

CheckableList.propTypes = {
  editorState: PropTypes.instanceOf(EditorState).isRequired,
  onToggleBlockType: PropTypes.func.isRequired,
  children: PropTypes.node,
  className: PropTypes.string
};
CheckableList.defaultProps = {
  className: ''
};
export default CheckableList;