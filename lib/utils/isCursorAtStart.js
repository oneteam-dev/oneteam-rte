"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isCursorAtStart;
/**
 * @param {SelectionState} selection
 * @returns {Boolean}
 */
function isCursorAtStart(selection) {
  return selection.getStartOffset() === 0;
}
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(isCursorAtStart, "isCursorAtStart", "src/utils/isCursorAtStart.js");
}();

;