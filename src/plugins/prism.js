import React from 'react';
import Prism from 'prismjs';
import PrismDecorator from 'draft-js-prism';
import './prism-languages';

const prismPlugin = {
  decorators: [
     new PrismDecorator({
       prism: Prism,
       getSyntax(block) {
         const language = block.getData().get('language');
         if (typeof window.Prism.languages[language] === 'object') {
           return language;
         }
         return null;
       },
       render({ type, children }) { // eslint-disable-line
         return <span className={`prism-token token ${type}`}>{children}</span>;
       }
    })
  ]
};

export default prismPlugin;
