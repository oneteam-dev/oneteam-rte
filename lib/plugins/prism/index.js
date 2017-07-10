'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _prismjs = require('prismjs');

var _prismjs2 = _interopRequireDefault(_prismjs);

var _draftJsPrism = require('draft-js-prism');

var _draftJsPrism2 = _interopRequireDefault(_draftJsPrism);

require('./languages');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var createPrismPlugin = function createPrismPlugin() {
  var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  var options = _extends({
    prism: _prismjs2.default,
    getSyntax: function getSyntax(block) {
      var language = block.getData().get('language');
      if (_typeof(window.Prism.languages[language]) === 'object') {
        return language;
      }
      return null;
    },
    render: function render(_ref) {
      var type = _ref.type,
          children = _ref.children;
      // eslint-disable-line react/prop-types
      return _react2.default.createElement(
        'span',
        { className: 'prism-token token ' + type },
        children
      );
    }
  }, config);

  return {
    decorators: [new _draftJsPrism2.default(options)]
  };
};

exports.default = createPrismPlugin;