import React from 'react';
import PropTypes from 'prop-types';
import { EditorState } from 'draft-js';
import { BLOCK_TYPES } from 'draft-js-oneteam-rte-plugin/lib/constants';
import BlockTypeButton from './BlockTypeButton';

const UnorderedList = ({ editorState, onToggleBlockType, className, children }) => {
  return (
    <BlockTypeButton
      type={BLOCK_TYPES.UNORDERED_LIST_ITEM}
      editorState={editorState}
      onToggle={onToggleBlockType}
      className={className}
    >
      {children}
    </BlockTypeButton>
  );
};

UnorderedList.propTypes = {
  editorState: PropTypes.instanceOf(EditorState).isRequired,
  onToggleBlockType: PropTypes.func.isRequired,
  children: PropTypes.node,
  className: PropTypes.string
};

UnorderedList.defaultProps = { className: '' };

export default UnorderedList;
