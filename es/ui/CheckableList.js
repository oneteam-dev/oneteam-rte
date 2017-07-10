var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { EditorState } from 'draft-js';
import { CHECKABLE_LIST_ITEM } from 'draft-js-checkable-list-item';
import BlockTypeButton from './BlockTypeButton';

var CheckableList = function (_Component) {
  _inherits(CheckableList, _Component);

  _createClass(CheckableList, null, [{
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

  function CheckableList(props) {
    _classCallCheck(this, CheckableList);

    return _possibleConstructorReturn(this, (CheckableList.__proto__ || Object.getPrototypeOf(CheckableList)).call(this, props));
  }

  _createClass(CheckableList, [{
    key: 'render',
    value: function render() {
      return React.createElement(
        BlockTypeButton,
        {
          type: CHECKABLE_LIST_ITEM,
          editorState: this.props.editorState,
          onToggle: this.props.onToggleBlockType,
          className: this.props.className },
        this.props.children
      );
    }
  }]);

  return CheckableList;
}(Component);

export default CheckableList;