var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { EditorState } from 'draft-js';
import { BLOCK_TYPES } from 'draft-js-oneteam-rte-plugin/lib/constants';
import BlockTypeButton from './BlockTypeButton';

var UnorderedList = function (_Component) {
  _inherits(UnorderedList, _Component);

  _createClass(UnorderedList, null, [{
    key: 'propTypes',
    get: function get() {
      return {
        editorState: PropTypes.instanceOf(EditorState).isRequired,
        onToggleBlockType: PropTypes.func.isRequired,
        children: PropTypes.node,
        className: PropTypes.string
      };
    }
  }, {
    key: 'defaultProps',
    get: function get() {
      return { className: '' };
    }
  }]);

  function UnorderedList(props) {
    _classCallCheck(this, UnorderedList);

    return _possibleConstructorReturn(this, (UnorderedList.__proto__ || Object.getPrototypeOf(UnorderedList)).call(this, props));
  }

  _createClass(UnorderedList, [{
    key: 'render',
    value: function render() {
      return React.createElement(
        BlockTypeButton,
        {
          type: BLOCK_TYPES.UNORDERED_LIST_ITEM,
          editorState: this.props.editorState,
          onToggle: this.props.onToggleBlockType,
          className: this.props.className },
        this.props.children
      );
    }
  }]);

  return UnorderedList;
}(Component);

export default UnorderedList;