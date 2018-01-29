import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import App from './App';

const rootEl = document.body.appendChild(document.createElement('div'));

const render = Component => {
  ReactDOM.render(<AppContainer><Component /></AppContainer>, rootEl);
};

const runApp = () => {
  render(App)

  if (module.hot) {
    module.hot.accept('./App', () => {
      render(App)
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
