var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { EditorState } from 'draft-js';
import { BLOCK_TYPES } from 'draft-js-oneteam-rte-plugin/lib/constants';
import BlockTypeButton from './BlockTypeButton';

var OrderedList = function (_Component) {
  _inherits(OrderedList, _Component);

  _createClass(OrderedList, null, [{
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

  function OrderedList(props) {
    _classCallCheck(this, OrderedList);

    return _possibleConstructorReturn(this, (OrderedList.__proto__ || Object.getPrototypeOf(OrderedList)).call(this, props));
  }

  _createClass(OrderedList, [{
    key: 'render',
    value: function render() {
      return React.createElement(
        BlockTypeButton,
        {
          type: BLOCK_TYPES.ORDERED_LIST_ITEM,
          editorState: this.props.editorState,
          onToggle: this.props.onToggleBlockType,
          className: this.props.className },
        this.props.children
      );
    }
  }]);

  return OrderedList;
}(Component);

export default OrderedList;