import { createStore, combineReducers, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
// import { throttle } from 'lodash/throttle';

import { loadState, saveState } from './localStorage';
import porcupineApp from '../reducers/index';


const configureStore = () => {
  const persistedState = loadState();
  const store = createStore(
    porcupineApp,
    persistedState
  );

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers/index');
      store.replaceReducer(nextRootReducer);
    });
  }


  store.subscribe(() => {
    saveState(
      store.getState()
    );
  });
  // store.subscribe(throttle(() => {
  //   saveState(
  //     store.getState()
  //   );
  // }, 1000));

  return store;
};

export default configureStore;
