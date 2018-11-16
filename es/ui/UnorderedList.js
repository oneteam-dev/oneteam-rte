import React from 'react';
import PropTypes from 'prop-types';
import { EditorState } from 'draft-js';
import { BLOCK_TYPES } from 'draft-js-oneteam-rte-plugin/lib/constants';
import BlockTypeButton from './BlockTypeButton';

var UnorderedList = function UnorderedList(_ref) {
  var editorState = _ref.editorState,
      onToggleBlockType = _ref.onToggleBlockType,
      className = _ref.className,
      children = _ref.children;
  return React.createElement(BlockTypeButton, {
    type: BLOCK_TYPES.UNORDERED_LIST_ITEM,
    editorState: editorState,
    onToggle: onToggleBlockType,
    className: className
  }, children);
};

UnorderedList.propTypes = {
  editorState: PropTypes.instanceOf(EditorState).isRequired,
  onToggleBlockType: PropTypes.func.isRequired,
  children: PropTypes.node,
  className: PropTypes.string
};
UnorderedList.defaultProps = {
  className: ''
};
export default UnorderedList;