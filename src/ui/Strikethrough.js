import React from 'react';
import PropTypes from 'prop-types';
import { EditorState } from 'draft-js';
import { INLINE_STYLES } from 'draft-js-oneteam-rte-plugin/lib/constants';
import InlineStyleButton from './InlineStyleButton';

const Strikethrough = ({ editorState, onToggleInlineStyle, className, children }) => {
  return (
    <InlineStyleButton
      type={INLINE_STYLES.STRIKETHROUGH}
      editorState={editorState}
      onToggle={onToggleInlineStyle}
      className={className}
    >
      {children}
    </InlineStyleButton>
  );
};

Strikethrough.propTypes = {
  editorState: PropTypes.instanceOf(EditorState).isRequired,
  onToggleInlineStyle: PropTypes.func.isRequired,
  children: PropTypes.node,
  className: PropTypes.string
};

Strikethrough.defaultProps = { className: '' };

export default Strikethrough;
