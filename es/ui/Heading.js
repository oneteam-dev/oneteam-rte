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
import { BLOCK_TYPES, HEADER_BLOCK_TYPES } from 'draft-js-oneteam-rte-plugin/lib/constants';
import DropdownButton from 'react-bootstrap/lib/DropdownButton';
import MenuItem from 'react-bootstrap/lib/MenuItem';
import findKey from 'lodash/findKey';
import BaseButton from './BaseButton';
import toggleBlockType from '../functions/toggleBlockType';
import getCurrentBlockType from '../utils/getCurrentBlockType';

var Heading =
/*#__PURE__*/
function (_Component) {
  _inherits(Heading, _Component);

  function Heading(props) {
    var _this;

    _classCallCheck(this, Heading);

    _this = _possibleConstructorReturn(this, (Heading.__proto__ || Object.getPrototypeOf(Heading)).call(this, props));

    _this.handleSelect = function (eventKey) {
      return _this._handleSelect(eventKey);
    };

    return _this;
  }

  _createClass(Heading, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var blockType = getCurrentBlockType(this.props.editorState);
      return React.createElement(BaseButton, {
        className: this.props.className
      }, React.createElement(DropdownButton, {
        id: "rte-toolbar-heading",
        bsSize: "small",
        title: this._createName(blockType),
        className: "rte-toolbar-heading",
        onSelect: this.handleSelect
      }, HEADER_BLOCK_TYPES.map(function (type) {
        return React.createElement(MenuItem, {
          className: "rte-toolbar-heading-menu",
          key: type,
          eventKey: type,
          active: blockType === type
        }, _this2._createName(type), blockType === type ? _this2.props.closeButtonNode : null);
      })));
    }
  }, {
    key: "_handleSelect",
    value: function _handleSelect(type) {
      var _this3 = this;

      // this.props.onToggleBlockType(type);
      setTimeout(function () {
        return _this3.props.onToggleBlockType(toggleBlockType(_this3.props.editorState, type));
      }, 0);
    }
  }, {
    key: "_createName",
    value: function _createName(type) {
      var name = this.props.name;
      return HEADER_BLOCK_TYPES.some(function (t) {
        return t === type;
      }) ? "".concat(name, " ").concat(findKey(BLOCK_TYPES, function (t) {
        return t === type;
      }).slice(1)) : "".concat(name, " 1");
    }
  }]);

  return Heading;
}(Component);

Object.defineProperty(Heading, "propTypes", {
  configurable: true,
  enumerable: true,
  writable: true,
  value: {
    editorState: PropTypes.instanceOf(EditorState).isRequired,
    onToggleBlockType: PropTypes.func.isRequired,
    className: PropTypes.string,
    name: PropTypes.string,
    closeButtonNode: PropTypes.node
  }
});
Object.defineProperty(Heading, "defaultProps", {
  configurable: true,
  enumerable: true,
  writable: true,
  value: {
    className: '',
    name: 'Heading'
  }
});
export { Heading as default };