import React from 'react';
import PropTypes from 'prop-types';
import { EditorState } from 'draft-js';
import { INLINE_STYLES } from 'draft-js-oneteam-rte-plugin/lib/constants';
import InlineStyleButton from './InlineStyleButton';

var Italic = function Italic(_ref) {
  var editorState = _ref.editorState,
      onToggleInlineStyle = _ref.onToggleInlineStyle,
      className = _ref.className,
      children = _ref.children;
  return React.createElement(InlineStyleButton, {
    type: INLINE_STYLES.ITALIC,
    editorState: editorState,
    onToggle: onToggleInlineStyle,
    className: className
  }, children);
};

Italic.propTypes = {
  editorState: PropTypes.instanceOf(EditorState).isRequired,
  onToggleInlineStyle: PropTypes.func.isRequired,
  children: PropTypes.node,
  className: PropTypes.string
};
Italic.defaultProps = {
  className: ''
};
export default Italic;