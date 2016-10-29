"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getMatches;

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

/**
 * @param {String} str
 * @param {RegExp} regex
 * @returns {Array|null} [ { value, index }, ]
 */
function getMatches(str, regex) {
  var match = void 0;
  var matches = [];
  while (match = regex.exec(str)) {
    // eslint-disable-line no-cond-assign
    matches.push(match);
  }
  return matches.length > 0 ? matches.reduce(function (ret, m) {
    return [].concat(_toConsumableArray(ret), [{ value: m[0], index: m.index }]);
  }, []) : null;
}
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(getMatches, "getMatches", "src/helpers/getMatches.js");
}();

;