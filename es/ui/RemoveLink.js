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
import classnames from 'classnames';
import BaseButton from './BaseButton';
import toggleLink from '../functions/toggleLink';

var RemoveLink =
/*#__PURE__*/
function (_Component) {
  _inherits(RemoveLink, _Component);

  function RemoveLink(props) {
    var _this;

    _classCallCheck(this, RemoveLink);

    _this = _possibleConstructorReturn(this, (RemoveLink.__proto__ || Object.getPrototypeOf(RemoveLink)).call(this, props));

    _this.handleMouseDown = function (ev) {
      return _this._handleMouseDown(ev);
    };

    return _this;
  }

  _createClass(RemoveLink, [{
    key: "render",
    value: function render() {
      return React.createElement(BaseButton, {
        className: classnames(this.props.className),
        onMouseDown: this.handleMouseDown
      }, this.props.children);
    }
  }, {
    key: "_handleMouseDown",
    value: function _handleMouseDown(ev) {
      ev.preventDefault();
      var newEditorState = toggleLink(this.props.editorState);
      this.props.onRemoveLink(newEditorState);
    }
  }]);

  return RemoveLink;
}(Component);

Object.defineProperty(RemoveLink, "propTypes", {
  configurable: true,
  enumerable: true,
  writable: true,
  value: {
    editorState: PropTypes.instanceOf(EditorState).isRequired,
    onRemoveLink: PropTypes.func.isRequired,
    children: PropTypes.node,
    className: PropTypes.string
  }
});
Object.defineProperty(RemoveLink, "defaultProps", {
  configurable: true,
  enumerable: true,
  writable: true,
  value: {
    className: ''
  }
});
export { RemoveLink as default };