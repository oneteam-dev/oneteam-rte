"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isCursorAtEnd;
function isCursorAtEnd(block, selection) {
  return block.getLength() === selection.getStartOffset();
}