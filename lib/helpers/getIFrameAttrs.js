'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getIFrameAttrs;
function getIFrameAttrs(htmlString) {
  var iframe = parseIFrameTag(htmlString);
  return [].reduce.call(iframe.attributes, function (result, _ref) {
    var nodeName = _ref.nodeName,
        nodeValue = _ref.nodeValue;

    result[nodeName] = nodeValue;
    return result;
  }, {});
}

function parseIFrameTag(string) {
  var el = document.createElement('div');
  el.innerHTML = string;
  return el.getElementsByTagName('iframe')[0];
}
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(getIFrameAttrs, 'getIFrameAttrs', 'src/helpers/getIFrameAttrs.js');

  __REACT_HOT_LOADER__.register(parseIFrameTag, 'parseIFrameTag', 'src/helpers/getIFrameAttrs.js');
}();

;