// Original can be found here:
// https://github.com/draft-js-plugins/draft-js-plugins/blob/master/draft-js-emoji-plugin/src/utils/positionSuggestions.js
const getRelativeParent = (element) => {
  if (!element) {
    return null;
  }

  const position = window.getComputedStyle(element).getPropertyValue('position');
  if (position !== 'static') {
    return element;
  }

  return getRelativeParent(element.parentElement);
};

// eslint-disable-next-line complexity
const createPositionSuggestions = (position, isDisplay) => arg => {
  const { decoratorRect, popover } = arg;
  const relativeParent = getRelativeParent(popover.parentElement);
  const relativeRect = {};

  if (relativeParent) {
    relativeRect.scrollLeft = relativeParent.scrollLeft;
    relativeRect.scrollTop = relativeParent.scrollTop;

    const relativeParentRect = relativeParent.getBoundingClientRect();
    relativeRect.left = decoratorRect.left - relativeParentRect.left;
    relativeRect.top = decoratorRect.top - relativeParentRect.top;
  } else {
    relativeRect.scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    relativeRect.scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;

    relativeRect.top = decoratorRect.top;
    relativeRect.left = decoratorRect.left;
  }

  const left = relativeRect.left + relativeRect.scrollLeft;
  const top = relativeRect.top + relativeRect.scrollTop;

  let transform;
  if (isDisplay(arg)) {
    transform = 'scale(1)';
  } else {
    transform = 'scale(0)';
  }

  const ret = {
    left: `${left}px`,
    transform,
    transformOrigin: '1em 0%',
    border: '1px solid rgba(0, 0, 0, .1)',
    borderRadius: 4,
    boxShadow: '0 2px 10px 0 rgba(0, 0, 0, .1)'
  };

  if (position === 'top') {
    ret.bottom = `${top + 30}px`; // FIXME: magic number 🎩
  } else {
    ret.top = `${top}px`;
  }

  return ret;
};

export default createPositionSuggestions;
