import React from 'react';
import { Provider } from 'react-redux';
import createRouter from './routes';

export default ({ store }) =>
  <Provider store={store}>
    { createRouter() }
  </Provider>
;
