import React from 'react';
import PropTypes from 'prop-types';
import { EditorState } from 'draft-js';
import { INLINE_STYLES } from 'draft-js-oneteam-rte-plugin/lib/constants';
import InlineStyleButton from './InlineStyleButton';

var Bold = function Bold(_ref) {
  var editorState = _ref.editorState,
      onToggleInlineStyle = _ref.onToggleInlineStyle,
      className = _ref.className,
      children = _ref.children;
  return React.createElement(InlineStyleButton, {
    type: INLINE_STYLES.BOLD,
    editorState: editorState,
    onToggle: onToggleInlineStyle,
    className: className
  }, children);
};

Bold.propTypes = {
  editorState: PropTypes.instanceOf(EditorState).isRequired,
  onToggleInlineStyle: PropTypes.func.isRequired,
  children: PropTypes.node,
  className: PropTypes.string
};
Bold.defaultProps = {
  className: ''
};
export default Bold;