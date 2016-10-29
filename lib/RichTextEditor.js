'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _draftJs = require('draft-js');

var _editorStateToHTML = require('oneteam-rte-converter/lib/editorStateToHTML');

var _editorStateToHTML2 = _interopRequireDefault(_editorStateToHTML);

var _oneteamRteUtils = require('oneteam-rte-utils');

var _isFunction = require('lodash/isFunction');

var _isFunction2 = _interopRequireDefault(_isFunction);

var _Body = require('./Body');

var _Body2 = _interopRequireDefault(_Body);

var _Toolbar = require('./Toolbar');

var _Toolbar2 = _interopRequireDefault(_Toolbar);

var _utils = require('./utils');

var _functions = require('./functions');

var functions = _interopRequireWildcard(_functions);

var _helpers = require('./helpers');

var _LinkDecorator = require('./decorators/LinkDecorator');

var _LinkDecorator2 = _interopRequireDefault(_LinkDecorator);

var _DownloadLinkDecorator = require('./decorators/DownloadLinkDecorator');

var _DownloadLinkDecorator2 = _interopRequireDefault(_DownloadLinkDecorator);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var RichTextEditor = function (_Component) {
  _inherits(RichTextEditor, _Component);

  _createClass(RichTextEditor, [{
    key: 'createEditorState',
    value: function createEditorState(html) {
      var decorator = new _draftJs.CompositeDecorator([_LinkDecorator2.default, _DownloadLinkDecorator2.default].concat(_toConsumableArray(this.props.decorators)));
      var cleanHTML = html.replace(/>\s+</g, '><'); // FIXME ;(
      var editorState = (0, _utils.createEditorState)(cleanHTML, decorator);
      var checkedState = (0, _utils.createCheckedState)(editorState.getCurrentContent().getBlocksAsArray());
      return { editorState: editorState, checkedState: checkedState };
    }
  }, {
    key: 'html',
    set: function set(html) {
      this.setState(this.createEditorState(html));
    },
    get: function get() {
      return this.serializedHTML;
    }
  }, {
    key: 'serializedHTML',
    get: function get() {
      return (0, _editorStateToHTML2.default)(this._contentState, this._checkedState);
    }
  }, {
    key: '_editorState',
    get: function get() {
      return this.state.editorState;
    }
  }, {
    key: '_contentState',
    get: function get() {
      return this._editorState.getCurrentContent();
    }
  }, {
    key: '_checkedState',
    get: function get() {
      return this.state.checkedState;
    }
  }], [{
    key: 'propTypes',
    get: function get() {
      return {
        initialHtml: _react.PropTypes.string,
        decorators: _react.PropTypes.arrayOf(_react.PropTypes.instanceOf(_draftJs.CompositeDecorator)),
        onChange: _react.PropTypes.func,
        children: _react.PropTypes.oneOfType([_react.PropTypes.arrayOf(_react.PropTypes.element), _react.PropTypes.element])
      };
    }
  }, {
    key: 'defaultProps',
    get: function get() {
      return {
        initialHtml: '',
        decorators: []
      };
    }
  }]);

  function RichTextEditor(props) {
    _classCallCheck(this, RichTextEditor);

    var _this = _possibleConstructorReturn(this, (RichTextEditor.__proto__ || Object.getPrototypeOf(RichTextEditor)).call(this, props));

    var state = _this.createEditorState(_this.props.initialHtml);
    state.isOpenInsertLinkInput = false;
    _this.state = state;

    var triggerLock = 0; // To reduce triggering change callbacks.
    var triggerOnChange = function triggerOnChange() {
      var onChange = _this.props.onChange;

      if ((0, _isFunction2.default)(onChange) && triggerLock === 0) {
        triggerLock = setTimeout(function () {
          onChange(_this);
          triggerLock = 0;
        }, 100);
      }
    };
    _this.changeEditorState = function (editorState) {
      return _this.setState({ editorState: editorState }, triggerOnChange);
    };
    _this.changeCheckedState = function (checkedState) {
      return _this.setState({ checkedState: checkedState }, triggerOnChange);
    };
    _this.insertImage = function (imageFile) {
      return _this._insertImage(imageFile);
    };
    _this.insertDownloadLink = function (file) {
      return _this._insertDownloadLink(file);
    };
    _this.insertIFrame = function (iframeTagString) {
      return _this._insertIFrame(iframeTagString);
    };
    _this.insertPlaceholder = function () {
      return _this._insertPlaceholder.apply(_this, arguments);
    };
    _this.getCurrentBlockType = function () {
      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return _utils.getCurrentBlockType.apply(undefined, [_this.state.editorState].concat(args));
    };
    _this.hasCurrentInlineStyle = function () {
      for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }

      return _utils.hasCurrentInlineStyle.apply(undefined, [_this.state.editorState].concat(args));
    };

    for (var key in functions) {
      _this[key] = function (fn) {
        return function () {
          for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
            args[_key3] = arguments[_key3];
          }

          _this.changeEditorState(fn.apply(undefined, [_this.state.editorState].concat(args)));
        };
      }(functions[key]);
    }
    return _this;
  }

  _createClass(RichTextEditor, [{
    key: 'getCurrentInlineStyles',
    value: function getCurrentInlineStyles() {
      var ret = [];
      for (var key in _oneteamRteUtils.INLINE_STYLES) {
        var value = _oneteamRteUtils.INLINE_STYLES[key];
        if (this.hasCurrentInlineStyle(value)) {
          ret.push(value);
        }
      }
      return ret;
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _state = this.state,
          editorState = _state.editorState,
          checkedState = _state.checkedState,
          isOpenInsertLinkInput = _state.isOpenInsertLinkInput;

      var content = _react.Children.map(this.props.children || [], function (child) {
        return (0, _react.cloneElement)(child, {
          editorState: editorState,
          checkedState: checkedState,
          isOpenInsertLinkInput: isOpenInsertLinkInput,
          changeEditorState: _this2.changeEditorState,
          changeCheckedState: _this2.changeCheckedState,
          toggleInsertLinkInput: function toggleInsertLinkInput() {
            return _this2.setState({ isOpenInsertLinkInput: !isOpenInsertLinkInput });
          },
          closeInsertLinkInput: function closeInsertLinkInput() {
            return _this2.setState({ isOpenInsertLinkInput: false });
          }
        });
      });

      return _react2.default.createElement(
        'div',
        { className: 'rich-text-editor', id: 'rich-text-editor' },
        content
      );
    }
  }, {
    key: '_insertImage',
    value: function _insertImage(_ref) {
      var name = _ref.name,
          original_url = _ref.original_url,
          preview_url = _ref.preview_url;

      var newEditorState = (0, _functions.insertAtomicBlock)(this.state.editorState, _oneteamRteUtils.ENTITY_TYPES.IMAGE, 'IMMUTABLE', {
        src: preview_url,
        'data-original-url': original_url,
        alt: name
      });
      this.changeEditorState(newEditorState);
    }
  }, {
    key: '_insertDownloadLink',
    value: function _insertDownloadLink(_ref2) {
      var name = _ref2.name,
          download_url = _ref2.download_url,
          size = _ref2.size;

      var newEditorState = (0, _functions.insertAtomicBlock)(this.state.editorState, _oneteamRteUtils.ENTITY_TYPES.DOWNLOAD_LINK, 'MUTABLE', {
        name: name,
        size: size,
        url: download_url,
        target: '_blank'
      }, name);
      this.changeEditorState(newEditorState);
    }
  }, {
    key: '_insertIFrame',
    value: function _insertIFrame(iframeTag) {
      var _this3 = this;

      var attrs = (0, _helpers.getIFrameAttrs)(iframeTag);

      setTimeout(function () {
        // FIXME
        var newEditorState = (0, _functions.insertAtomicBlock)(_this3.state.editorState, _oneteamRteUtils.ENTITY_TYPES.IFRAME, 'IMMUTABLE', attrs);
        _this3.changeEditorState(newEditorState);
      }, 1000);
    }
    // NOTE: This method is unused
    // _insertWebCard(url, imageRemoved) {
    //   const newEditorState = insertAtomicBlock(this.state.editorState, ENTITY_TYPES.WEB_CARD, 'IMMUTABLE', { url, imageRemoved });
    //   this.changeEditorState(newEditorState);
    // }

  }, {
    key: '_insertPlaceholder',
    value: function _insertPlaceholder(data, name) {
      var newEditorState = (0, _functions.insertAtomicBlock)(this.state.editorState, 'PLACEHOLDER', 'IMMUTABLE', _extends({}, data, { name: name }));
      this.changeEditorState(newEditorState);
    }
  }]);

  return RichTextEditor;
}(_react.Component);

var _default = RichTextEditor;
exports.default = _default;


RichTextEditor.Toolbar = _Toolbar2.default;
RichTextEditor.Body = _Body2.default;
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(RichTextEditor, 'RichTextEditor', 'src/RichTextEditor.js');

  __REACT_HOT_LOADER__.register(_default, 'default', 'src/RichTextEditor.js');
}();

;