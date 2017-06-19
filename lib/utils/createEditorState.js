'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = createEditorState;

var _draftJs = require('draft-js');

var _encoding = require('../encoding');

function createEditorState(html) {
  var decorator = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

  return html ? _draftJs.EditorState.createWithContent((0, _encoding.htmlToContent)(html), decorator) : _draftJs.EditorState.createEmpty(decorator);
}