'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

exports.default = csstextToObjectify;

var _camelCase = require('lodash/camelCase');

var _camelCase2 = _interopRequireDefault(_camelCase);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function csstextToObjectify(csstext) {
  var rules = csstext.split(';').filter(function (str) {
    return str !== '';
  }).map(function (str) {
    return str.trim();
  });
  return rules.reduce(function (result, rule) {
    var _rule$split$map = rule.split(':').map(function (str) {
      return str.trim();
    }),
        _rule$split$map2 = _slicedToArray(_rule$split$map, 2),
        prop = _rule$split$map2[0],
        val = _rule$split$map2[1];

    result[(0, _camelCase2.default)(prop)] = val;
    return result;
  }, {});
}
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(csstextToObjectify, 'csstextToObjectify', 'src/helpers/csstextToObjectify.js');
}();

;