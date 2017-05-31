'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _draftJs = require('draft-js');

var _constants = require('draft-js-oneteam-rte-plugin/lib/constants');

var _DropdownButton = require('react-bootstrap/lib/DropdownButton');

var _DropdownButton2 = _interopRequireDefault(_DropdownButton);

var _MenuItem = require('react-bootstrap/lib/MenuItem');

var _MenuItem2 = _interopRequireDefault(_MenuItem);

var _findKey = require('lodash/findKey');

var _findKey2 = _interopRequireDefault(_findKey);

var _BaseButton = require('./BaseButton');

var _BaseButton2 = _interopRequireDefault(_BaseButton);

var _toggleBlockType = require('../functions/toggleBlockType');

var _toggleBlockType2 = _interopRequireDefault(_toggleBlockType);

var _getCurrentBlockType = require('../utils/getCurrentBlockType');

var _getCurrentBlockType2 = _interopRequireDefault(_getCurrentBlockType);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Heading = function (_Component) {
  _inherits(Heading, _Component);

  _createClass(Heading, null, [{
    key: 'propTypes',
    get: function get() {
      return {
        editorState: _react.PropTypes.instanceOf(_draftJs.EditorState).isRequired,
        onToggleBlockType: _react.PropTypes.func.isRequired,
        className: _react.PropTypes.string,
        name: _react.PropTypes.string,
        closeButtonNode: _react.PropTypes.node
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

      var blockType = (0, _getCurrentBlockType2.default)(this.props.editorState);

      return _react2.default.createElement(
        _BaseButton2.default,
        { className: this.props.className },
        _react2.default.createElement(
          _DropdownButton2.default,
          {
            id: 'rte-toolbar-heading',
            bsSize: 'small',
            title: this._createName(blockType),
            className: 'rte-toolbar-heading',
            onSelect: this.handleSelect },
          _constants.HEADER_BLOCK_TYPES.map(function (type) {
            return _react2.default.createElement(
              _MenuItem2.default,
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
        return _this3.props.onToggleBlockType((0, _toggleBlockType2.default)(_this3.props.editorState, type));
      }, 0);
    }
  }, {
    key: '_createName',
    value: function _createName(type) {
      var name = this.props.name;

      return _constants.HEADER_BLOCK_TYPES.some(function (t) {
        return t === type;
      }) ? name + ' ' + (0, _findKey2.default)(_constants.BLOCK_TYPES, function (t) {
        return t === type;
      }).slice(1) : name + ' 1';
    }
  }]);

  return Heading;
}(_react.Component);

exports.default = Heading;