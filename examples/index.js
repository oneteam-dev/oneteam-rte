import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

const rootEl = document.body.appendChild(document.createElement('div'));

const runApp = () => {
  ReactDOM.render(<App />, rootEl);
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
