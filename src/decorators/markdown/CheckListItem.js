import React, { PropTypes } from 'react';
import findWithRegex from '../../utils/findWithRegex';

export default {
  strategy(contentBlock, callback) {
    if (contentBlock.getType() === 'unstyled') {
      findWithRegex(/^\-\s+\[\s*\]\s+([^\n]+)/g, contentBlock, callback);
    }
  },
  component: MarkdownCheckListItem
}

function MarkdownCheckListItem({ decoratedText }) {
  const text = decoratedText.replace(/\-\s+\[\s*\]\s+/, '');
  return (
    <div className='checkable-list-item-block'>
      <div className='checkable-list-item-block__checkbox' contentEditable='false'>
        <input type='checkbox' value='on' />
      </div>
      <div className='checkable-list-item-block__text'>
        {text}
      </div>
    </div>
  )
}

MarkdownCheckListItem.propTypes = {
  decoratedText: PropTypes.string,
};
