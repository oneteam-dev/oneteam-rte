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

// eslint-disable-next-line complexity
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
      relativeRect.top = decoratorRect.top - relativeParentRect.top;
    } else {
      relativeRect.scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      relativeRect.scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;

      relativeRect.top = decoratorRect.top;
      relativeRect.left = decoratorRect.left;
    }

    var left = relativeRect.left + relativeRect.scrollLeft;
    var top = relativeRect.top + relativeRect.scrollTop;

    var transform = void 0;
    if (isDisplay(arg)) {
      transform = 'scale(1)';
    } else {
      transform = 'scale(0)';
    }

    var ret = {
      left: left + 'px',
      transform: transform,
      transformOrigin: '1em 0%',
      border: '1px solid rgba(0, 0, 0, .1)',
      borderRadius: 4,
      boxShadow: '0 2px 10px 0 rgba(0, 0, 0, .1)'
    };

    if (position === 'top') {
      ret.bottom = top + 30 + 'px'; // FIXME: magic number 🎩
    } else {
      ret.top = top + 'px';
    }

    return ret;
  };
};

export default createPositionSuggestions;