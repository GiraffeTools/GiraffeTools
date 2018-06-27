import porcupineApp from './reducers.js';
import { throttle } from 'lodash/throttle';
import { createStore } from 'redux';
import { loadState, saveState } from './localStorage';

const configureStore = () => {
  const persistedState = { loadState };
  const store = createStore(
    porcupineApp,
    persistedState
  );
  store.subscribe(throttle(() => {
    saveState(
      store.getState()
    )
  }), 1000);

  return store;
};

export default configureStore;
