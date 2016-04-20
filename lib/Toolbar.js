'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _findKey = require('lodash/findKey');

var _findKey2 = _interopRequireDefault(_findKey);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactBootstrap = require('react-bootstrap');

var _draftJs = require('draft-js');

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _ToolbarButton = require('./ToolbarButton');

var _ToolbarButton2 = _interopRequireDefault(_ToolbarButton);

var _constants = require('./constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
// import  from 'react-bootstrap/lib/MenuItem';
// import DropdownButton from 'react-bootstrap/lib/DropdownButton';
// import MenuItem from 'react-bootstrap/lib/MenuItem';


var Toolbar = function (_Component) {
  _inherits(Toolbar, _Component);

  function Toolbar(props) {
    _classCallCheck(this, Toolbar);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Toolbar).call(this, props));

    _this.handleClickAddImage = function (ev) {
      return _this._handleClickAddImage(ev);
    };
    _this.handleClickFileAttach = function (ev) {
      return _this._handleClickFileAttach(ev);
    };
    _this.handleSelectHeading = function (ev, eventKey) {
      return _this._handleSelectHeading(ev, eventKey);
    };
    return _this;
  }

  _createClass(Toolbar, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var editorState = this.props.editorState;

      var currentInlineStyle = editorState.getCurrentInlineStyle();
      var selection = editorState.getSelection();
      var blockType = editorState.getCurrentContent().getBlockForKey(selection.getStartKey()).getType();

      return _react2.default.createElement(
        'div',
        { className: 'rich-editor-toolbar' },
        _react2.default.createElement(_ToolbarButton2.default, {
          type: 'file-photo',
          iconName: 'file-photo',
          active: false,
          onClickButton: this.handleClickAddImage,
          buttonNode: 'Add image' }),
        _react2.default.createElement(_ToolbarButton2.default, {
          type: 'file-attach',
          iconName: 'file-attach',
          active: false,
          onClickButton: this.handleClickFileAttach,
          buttonNode: 'Attach file' }),
        _react2.default.createElement('span', { className: 'rich-editor-toolbar-separate' }),
        _react2.default.createElement(
          'span',
          { className: (0, _classnames2.default)('rich-editor-toolbar-button', {
              active: _constants.HEADER_BLOCK_TYPES.some(function (t) {
                return t === blockType;
              })
            }) },
          _react2.default.createElement(
            'span',
            { className: 'rich-editor-toolbar-button-inner width-auto' },
            _react2.default.createElement(
              _reactBootstrap.DropdownButton,
              {
                id: 'rich-editor-toolbar-headings',
                bsSize: 'small',
                title: this._getHeadingLabel(blockType),
                className: 'rich-editor-toolbar-headings',
                onSelect: this.handleSelectHeading },
              _constants.HEADER_BLOCK_TYPES.map(function (type) {
                return _react2.default.createElement(
                  _reactBootstrap.MenuItem,
                  {
                    key: type,
                    eventKey: type,
                    active: blockType === type },
                  _this2._getHeadingLabel(type)
                );
              })
            )
          )
        ),
        _constants.ORDERED_INLINE_STYLES.map(function (type) {
          return _react2.default.createElement(_ToolbarButton2.default, {
            key: type,
            type: type,
            iconName: _this2._getSvgIconName(type),
            active: currentInlineStyle.has(type),
            onClickButton: _this2.props.onClickInlineStyle,
            buttonNode: _this2.props.buttonNodes[type] });
        }),
        _constants.ORDERED_BLOCK_TYPES.filter(function (type) {
          return !/^header\-/.test(type);
        }).map(function (type) {
          return _react2.default.createElement(_ToolbarButton2.default, {
            key: type,
            type: type,
            iconName: _this2._getSvgIconName(type),
            active: type === blockType,
            onClickButton: _this2.props.onClickBlockType,
            buttonNode: _this2.props.buttonNodes[(0, _findKey2.default)(_constants.BLOCK_TYPES, function (t) {
              return t === type;
            })] });
        })
      );
    }
  }, {
    key: '_handleClickAddImage',
    value: function _handleClickAddImage() {
      this.props.onClickAddImage();
    }
  }, {
    key: '_handleClickFileAttach',
    value: function _handleClickFileAttach() {
      this.props.onClickFileAttach();
    }
  }, {
    key: '_handleSelectHeading',
    value: function _handleSelectHeading(eventKey) {
      var _this3 = this;

      // ev.preventDefault();
      // this.props.onSelectHeading(eventKey);
      setTimeout(function () {
        return _this3.props.onSelectHeading(eventKey);
      }, 0);
    }
  }, {
    key: '_getHeadingLabel',
    value: function _getHeadingLabel(type) {
      var headingLabel = this.props.headingLabel;

      return _constants.HEADER_BLOCK_TYPES.some(function (t) {
        return t === type;
      }) ? headingLabel + ' ' + (0, _findKey2.default)(_constants.BLOCK_TYPES, function (t) {
        return t === type;
      }).slice(1) : headingLabel + ' 1';
    }
  }, {
    key: '_getSvgIconName',
    value: function _getSvgIconName(type) {
      // eslint-disable-line complexity
      switch (type) {
        case _constants.BLOCK_TYPES.UNORDERED_LIST_ITEM:
          return 'list-point';
        case _constants.BLOCK_TYPES.ORDERED_LIST_ITEM:
          return 'list-number';
        case _constants.BLOCK_TYPES.CHECKABLE_LIST_ITEM:
          return 'list-checkbox';
        case _constants.BLOCK_TYPES.BLOCKQUOTE:
          return 'text-quote';
        case _constants.INLINE_STYLES.BOLD:
          return 'text-bold';
        case _constants.INLINE_STYLES.ITALIC:
          return 'text-italics';
        case _constants.INLINE_STYLES.STRIKETHROUGH:
          return 'text-string';
        default:
          return '';
      }
    }
  }]);

  return Toolbar;
}(_react.Component);

exports.default = Toolbar;


Toolbar.displayName = 'Toolbar';
Toolbar.propTypes = {
  headingLabel: _react.PropTypes.string.isRequired,
  editorState: _react.PropTypes.instanceOf(_draftJs.EditorState).isRequired,
  onClickAddImage: _react.PropTypes.func.isRequired,
  onClickFileAttach: _react.PropTypes.func.isRequired,
  onSelectHeading: _react.PropTypes.func.isRequired,
  onClickInlineStyle: _react.PropTypes.func.isRequired,
  onClickBlockType: _react.PropTypes.func.isRequired,
  buttonNodes: _react.PropTypes.objectOf(_react.PropTypes.node)
};