import React, { PropTypes } from 'react';
import markit from '../../markit';

export default {
  strategy(contentBlock, callback) {
    const original = contentBlock.getText();
    const rendered = markit(original).replace(/^<p>/g, '').replace(/<\/p>\n*$/g, '');
    console.info(JSON.stringify(original), JSON.stringify(rendered));
    if (original !== rendered) {
      callback(0, rendered.length);
    }
  },
  component: MarkdownBold
}

function MarkdownBold({ decoratedText, offsetKey }) {
  const rendered = markit(decoratedText).replace(/^<p>/g, '').replace(/<\/p>$/g, '');
  return <span data-offset-key={offsetKey} dangerouslySetInnerHTML={{__html: rendered}} />
}

MarkdownBold.propTypes = {
  decoratedText: PropTypes.string,
  offsetKey: PropTypes.string
};
