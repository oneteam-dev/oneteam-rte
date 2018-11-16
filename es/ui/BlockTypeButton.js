function _instanceof(left, right) { if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) { return right[Symbol.hasInstance](left); } else { return left instanceof right; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!_instanceof(instance, Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { EditorState } from 'draft-js';
import BaseButton from './BaseButton';
import toggleBlockType from '../functions/toggleBlockType';
import checkCurrentBlockType from '../utils/checkCurrentBlockType';

var BlockTypeButton =
/*#__PURE__*/
function (_Component) {
  _inherits(BlockTypeButton, _Component);

  function BlockTypeButton(props) {
    var _this;

    _classCallCheck(this, BlockTypeButton);

    _this = _possibleConstructorReturn(this, (BlockTypeButton.__proto__ || Object.getPrototypeOf(BlockTypeButton)).call(this, props));

    _this.handleMouseDown = function (ev) {
      return _this._handleMouseDown(ev);
    };

    return _this;
  }

  _createClass(BlockTypeButton, [{
    key: "_handleMouseDown",
    value: function _handleMouseDown(ev) {
      ev.preventDefault();
      this.props.onToggle(toggleBlockType(this.props.editorState, this.props.type));
    }
  }, {
    key: "render",
    value: function render() {
      return React.createElement(BaseButton, {
        className: this.props.className,
        onMouseDown: this.handleMouseDown,
        active: checkCurrentBlockType(this.props.editorState, this.props.type)
      }, this.props.children);
    }
  }]);

  return BlockTypeButton;
}(Component);

Object.defineProperty(BlockTypeButton, "propTypes", {
  configurable: true,
  enumerable: true,
  writable: true,
  value: {
    type: PropTypes.string.isRequired,
    editorState: PropTypes.instanceOf(EditorState).isRequired,
    onToggle: PropTypes.func.isRequired,
    className: PropTypes.string,
    children: PropTypes.node,
    active: PropTypes.bool
  }
});
Object.defineProperty(BlockTypeButton, "defaultProps", {
  configurable: true,
  enumerable: true,
  writable: true,
  value: {
    className: ''
  }
});
export { BlockTypeButton as default };