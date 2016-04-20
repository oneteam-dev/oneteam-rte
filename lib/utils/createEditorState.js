'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = createEditorState;

var _draftJs = require('draft-js');

function createEditorState(htmlString) {
  var decorator = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];

  return htmlString ? _draftJs.EditorState.createWithContent(_draftJs.ContentState.createFromBlockArray((0, _draftJs.convertFromHTML)(htmlString)), decorator) : _draftJs.EditorState.createEmpty(decorator);
}