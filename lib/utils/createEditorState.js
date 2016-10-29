'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = createEditorState;

var _draftJs = require('draft-js');

var _convertFromHTML = require('oneteam-rte-converter/lib/convertFromHTML');

var _convertFromHTML2 = _interopRequireDefault(_convertFromHTML);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function createEditorState(htmlString) {
  var decorator = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

  return htmlString ? _draftJs.EditorState.createWithContent(_draftJs.ContentState.createFromBlockArray((0, _convertFromHTML2.default)(htmlString)), decorator) : _draftJs.EditorState.createEmpty(decorator);
}
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(createEditorState, 'createEditorState', 'src/utils/createEditorState.js');
}();

;