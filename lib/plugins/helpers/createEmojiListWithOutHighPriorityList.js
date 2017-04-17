"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var createEmojiListWithOutHighPriorityList = function createEmojiListWithOutHighPriorityList(highPriorityKeys, emojiList) {
  var list = {};
  var highPriorityList = {};
  for (var key in emojiList) {
    if (highPriorityKeys.includes(key)) {
      highPriorityList[key] = emojiList[key];
      continue;
    }
    list[key] = emojiList[key];
  }
  return _extends({}, highPriorityList, list);
};

exports.default = createEmojiListWithOutHighPriorityList;