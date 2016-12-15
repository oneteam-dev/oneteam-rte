import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import App from './App';

const runApp = () => {
  const rootEl = document.body.appendChild(document.createElement('div'));
  render(<AppContainer><App /></AppContainer>, rootEl);

  if (module.hot) {
    module.hot.accept('./App', () => {
      const NextApp = require('./App').default;
      render(<AppContainer><NextApp /></AppContainer>, rootEl);
    });
  }
};

const prependChild = (parentNode, newNode, referenceNode) => {
  parentNode.insertBefore(newNode, referenceNode);
};

const main = () => {
  const bootstrapcdn = document.createElement('link');
  bootstrapcdn.rel = 'stylesheet';
  bootstrapcdn.href = '//maxcdn.bootstrapcdn.com/bootstrap/latest/css/bootstrap.min.css';
  bootstrapcdn.onload = runApp;
  prependChild(document.head, bootstrapcdn, document.head.firstChild);
};

main();
