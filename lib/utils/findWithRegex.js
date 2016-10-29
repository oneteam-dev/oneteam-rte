"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = findWithRegex;
function findWithRegex(regex, contentBlock, callback) {
  var text = contentBlock.getText();
  var matchArr = void 0,
      start = void 0;
  while ((matchArr = regex.exec(text)) !== null) {
    start = matchArr.index;
    callback(start, start + matchArr[0].length);
  }
}
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(findWithRegex, "findWithRegex", "src/utils/findWithRegex.js");
}();

;