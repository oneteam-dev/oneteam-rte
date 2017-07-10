var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import isFunction from 'lodash/isFunction';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

var BaseButton = function (_Component) {
  _inherits(BaseButton, _Component);

  _createClass(BaseButton, null, [{
    key: 'propTypes',
    get: function get() {
      return {
        className: PropTypes.string,
        active: PropTypes.bool,
        children: PropTypes.node,
        onMouseDown: PropTypes.func,
        onClick: PropTypes.func
      };
    }
  }]);

  function BaseButton(props) {
    _classCallCheck(this, BaseButton);

    var _this = _possibleConstructorReturn(this, (BaseButton.__proto__ || Object.getPrototypeOf(BaseButton)).call(this, props));

    _this.handleMouseDown = function (ev) {
      return _this._handleMouseDown(ev);
    };
    _this.handleClick = function (ev) {
      return _this._handleClick(ev);
    };
    return _this;
  }

  _createClass(BaseButton, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          className = _props.className,
          active = _props.active,
          children = _props.children;

      return React.createElement(
        'span',
        {
          className: classnames('rich-text-editor-toolbar-button', className, { active: active }),
          onMouseDown: this.handleMouseDown,
          onClick: this.handleClick },
        React.createElement(
          'span',
          { className: 'rich-text-editor-toolbar-button-inner' },
          children ? children : null
        )
      );
    }
  }, {
    key: '_handleMouseDown',
    value: function _handleMouseDown(ev) {
      if (isFunction(this.props.onMouseDown)) {
        this.props.onMouseDown(ev);
      }
    }
  }, {
    key: '_handleClick',
    value: function _handleClick(ev) {
      if (isFunction(this.props.onClick)) {
        this.props.onClick(ev);
      }
    }
  }]);

  return BaseButton;
}(Component);

export default BaseButton;