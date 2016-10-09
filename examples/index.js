import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import App from './App';

const main = () => {
  let rootEl;
  render(<AppContainer><App /></AppContainer> , rootEl = document.querySelector('#app-root'));

  if (module.hot) {
    module.hot.accept('./App', () => {
      const NextApp = require('./App').default;
      render(<AppContainer><NextApp /></AppContainer>, rootEl);
    });
  }
};

main();
