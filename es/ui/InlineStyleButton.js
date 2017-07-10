var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { EditorState } from 'draft-js';
import BaseButton from './BaseButton';
import toggleInlineStyle from '../functions/toggleInlineStyle';
import hasCurrentInlineStyle from '../utils/hasCurrentInlineStyle';

var InlineStyleButton = function (_Component) {
  _inherits(InlineStyleButton, _Component);

  _createClass(InlineStyleButton, null, [{
    key: 'propTypes',
    get: function get() {
      return {
        type: PropTypes.string.isRequired,
        editorState: PropTypes.instanceOf(EditorState).isRequired,
        onToggle: PropTypes.func.isRequired,
        className: PropTypes.string,
        children: PropTypes.node,
        active: PropTypes.bool
      };
    }
  }, {
    key: 'defaultProps',
    get: function get() {
      return { className: '' };
    }
  }]);

  function InlineStyleButton(props) {
    _classCallCheck(this, InlineStyleButton);

    var _this = _possibleConstructorReturn(this, (InlineStyleButton.__proto__ || Object.getPrototypeOf(InlineStyleButton)).call(this, props));

    _this.handleMouseDown = function (ev) {
      return _this._handleMouseDown(ev);
    };
    return _this;
  }

  _createClass(InlineStyleButton, [{
    key: '_handleMouseDown',
    value: function _handleMouseDown(ev) {
      ev.preventDefault();
      this.props.onToggle(toggleInlineStyle(this.props.editorState, this.props.type));
    }
  }, {
    key: 'render',
    value: function render() {
      return React.createElement(
        BaseButton,
        {
          className: this.props.className,
          onMouseDown: this.handleMouseDown,
          active: hasCurrentInlineStyle(this.props.editorState, this.props.type) },
        this.props.children
      );
    }
  }]);

  return InlineStyleButton;
}(Component);

export default InlineStyleButton;