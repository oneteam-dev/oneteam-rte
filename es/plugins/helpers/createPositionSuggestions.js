// Original can be found here:
// https://github.com/draft-js-plugins/draft-js-plugins/blob/master/draft-js-emoji-plugin/src/utils/positionSuggestions.js
var getRelativeParent = function getRelativeParent(element) {
  if (!element) {
    return null;
  }

  var position = window.getComputedStyle(element).getPropertyValue('position');

  if (position !== 'static') {
    return element;
  }

  return getRelativeParent(element.parentElement);
};

var createPositionSuggestions = function createPositionSuggestions(position, isDisplay) {
  return function (arg) {
    var decoratorRect = arg.decoratorRect,
        popover = arg.popover;
    var relativeParent = getRelativeParent(popover.parentElement);
    var relativeRect = {};

    if (relativeParent) {
      relativeRect.scrollLeft = relativeParent.scrollLeft;
      relativeRect.scrollTop = relativeParent.scrollTop;
      var relativeParentRect = relativeParent.getBoundingClientRect();
      relativeRect.left = decoratorRect.left - relativeParentRect.left;
      relativeRect.top = decoratorRect.bottom - relativeParentRect.top;
    } else {
      relativeRect.scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      relativeRect.scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
      relativeRect.top = decoratorRect.bottom;
      relativeRect.left = decoratorRect.left;
    }

    var left = relativeRect.left + relativeRect.scrollLeft;
    var top = relativeRect.top + relativeRect.scrollTop;
    var transform;
    var transition;

    if (isDisplay(arg)) {
      transform = 'scale(1)';
      transition = 'all 0.25s cubic-bezier(.3,1.2,.2,1)';
    } else {
      transform = 'scale(0)';
      transition = 'all 0.35s cubic-bezier(.3,1,.2,1)';
    }

    var ret = {
      left: "".concat(left, "px"),
      transform: transform,
      transformOrigin: '1em 0%',
      transition: transition
    };

    if (position === 'top') {
      ret.bottom = "".concat(top + 30, "px"); // FIXME: magic number 🎩
    } else {
      ret.top = "".concat(top, "px");
    }

    return ret;
  };
};

export default createPositionSuggestions;