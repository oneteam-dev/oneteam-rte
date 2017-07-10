var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

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

var Heading = function (_Component) {
  _inherits(Heading, _Component);

  _createClass(Heading, null, [{
    key: 'propTypes',
    get: function get() {
      return {
        editorState: PropTypes.instanceOf(EditorState).isRequired,
        onToggleBlockType: PropTypes.func.isRequired,
        className: PropTypes.string,
        name: PropTypes.string,
        closeButtonNode: PropTypes.node
      };
    }
  }, {
    key: 'defaultProps',
    get: function get() {
      return { className: '', name: 'Heading' };
    }
  }]);

  function Heading(props) {
    _classCallCheck(this, Heading);

    var _this = _possibleConstructorReturn(this, (Heading.__proto__ || Object.getPrototypeOf(Heading)).call(this, props));

    _this.handleSelect = function (eventKey) {
      return _this._handleSelect(eventKey);
    };
    return _this;
  }

  _createClass(Heading, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var blockType = getCurrentBlockType(this.props.editorState);

      return React.createElement(
        BaseButton,
        { className: this.props.className },
        React.createElement(
          DropdownButton,
          {
            id: 'rte-toolbar-heading',
            bsSize: 'small',
            title: this._createName(blockType),
            className: 'rte-toolbar-heading',
            onSelect: this.handleSelect },
          HEADER_BLOCK_TYPES.map(function (type) {
            return React.createElement(
              MenuItem,
              {
                className: 'rte-toolbar-heading-menu',
                key: type,
                eventKey: type,
                active: blockType === type },
              _this2._createName(type),
              blockType === type ? _this2.props.closeButtonNode : null
            );
          })
        )
      );
    }
  }, {
    key: '_handleSelect',
    value: function _handleSelect(type) {
      var _this3 = this;

      // this.props.onToggleBlockType(type);
      setTimeout(function () {
        return _this3.props.onToggleBlockType(toggleBlockType(_this3.props.editorState, type));
      }, 0);
    }
  }, {
    key: '_createName',
    value: function _createName(type) {
      var name = this.props.name;

      return HEADER_BLOCK_TYPES.some(function (t) {
        return t === type;
      }) ? name + ' ' + findKey(BLOCK_TYPES, function (t) {
        return t === type;
      }).slice(1) : name + ' 1';
    }
  }]);

  return Heading;
}(Component);

export default Heading;