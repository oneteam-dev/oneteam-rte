import React from 'react';
import Prism from 'prismjs';
import PrismDecorator from 'draft-js-prism';
import './languages';

const createPrismPlugin = (config = {}) => {
  const options = {
    prism: Prism,
    getSyntax(block) {
      const language = block.getData().get('language');
      if (typeof window.Prism.languages[language] === 'object') {
        return language;
      }
      return null;
    },
    render({ type, children }) { // eslint-disable-line react/prop-types
      return <span className={`prism-token token ${type}`}>{children}</span>;
    },
    ...config
  };

  return {
    decorators: [
      new PrismDecorator(options)
    ]
  };
};

export default createPrismPlugin;
