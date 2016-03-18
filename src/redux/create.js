import { createStore, applyMiddleware, compose } from 'redux';
import createLogger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import reducer, { sagas } from './modules';

const logger = createLogger({
  collapsed: true,
});

export default function createAppStore() {
  const middleware = [
    logger,
    createSagaMiddleware(...sagas),
  ];

  const finalCreateStore = compose(
    applyMiddleware(...middleware)
  )(createStore);

  const store = finalCreateStore(reducer);
  window.store = store;
  return store;
}
