import React from 'react';
import PropTypes from 'prop-types';
import { EditorState } from 'draft-js';
import { BLOCK_TYPES } from 'draft-js-oneteam-rte-plugin/lib/constants';
import BlockTypeButton from './BlockTypeButton';

var Blockquote = function Blockquote(_ref) {
  var editorState = _ref.editorState,
      onToggleBlockType = _ref.onToggleBlockType,
      className = _ref.className,
      children = _ref.children;
  return React.createElement(BlockTypeButton, {
    type: BLOCK_TYPES.BLOCKQUOTE,
    editorState: editorState,
    onToggle: onToggleBlockType,
    className: className
  }, children);
};

Blockquote.propTypes = {
  editorState: PropTypes.instanceOf(EditorState).isRequired,
  onToggleBlockType: PropTypes.func.isRequired,
  children: PropTypes.node,
  className: PropTypes.string
};
Blockquote.defaultProps = {
  className: ''
};
export default Blockquote;