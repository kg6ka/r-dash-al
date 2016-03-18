import React from 'react';
import ReactDOM from 'react-dom';
import createStore from 'redux/create';

const store = createStore();
const rootEl = document.querySelector('#content');
const renderApp = () => {
  const Root = require('./root').default;
  ReactDOM.render(
    <Root store={store} />,
    rootEl
  );
};

if (module.hot) {
  console.debug('Accepting hot reload');
  const renderError = (error) => {
    const RedBox = require('redbox-react');
    ReactDOM.render(
      <RedBox error={error} />,
      rootEl
    );
  };

  const render = () => {
    try {
      renderApp();
    } catch (error) {
      renderError(error);
    }
  };

  module.hot.accept('./root', () => {
    setTimeout(render);
  });
}
renderApp();
