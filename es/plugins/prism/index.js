var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

import React from 'react';
import Prism from 'prismjs';
import PrismDecorator from 'draft-js-prism';
import './languages';

var createPrismPlugin = function createPrismPlugin() {
  var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  var options = _extends({
    prism: Prism,
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
      return React.createElement(
        'span',
        { className: 'prism-token token ' + type },
        children
      );
    }
  }, config);

  return {
    decorators: [new PrismDecorator(options)]
  };
};

export default createPrismPlugin;