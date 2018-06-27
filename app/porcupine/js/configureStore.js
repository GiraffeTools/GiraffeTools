import { createStore } from 'redux';
import { throttle } from 'lodash/throttle';
import { loadState, saveState } from './localStorage';
import porcupineApp from './reducers.js';

const configureStore = () => {
  const persistedState = loadState();
  const store = createStore(
    porcupineApp,
    persistedState
  );
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
