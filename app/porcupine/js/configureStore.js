import { createStore } from 'redux';
import createLogger from 'redux-logger';
// import { throttle } from 'lodash/throttle';

// import { loadState, saveState } from './localStorage';
import bootstrap from './bootstrap';
import { orm } from './orm';
import porcupineApp from './reducers/index';


const rootReducer = combineReducers({
    orm: orm.reducer(), // database components
    porcupineApp,  // non-database components
});

const configureStore = () => {

  const createStoreWithMiddleware = applyMiddleware(createLogger())(createStore);
  const store = createStoreWithMiddleware(rootReducer, bootstrap(schema));

  return store;
}

// const configureStore = () => {
//   const persistedState = loadState();
//   const store = createStore(
//     porcupineApp,
//     persistedState
//   );
//   store.subscribe(() => {
//     saveState(
//       store.getState()
//     );
//   });
//   // store.subscribe(throttle(() => {
//   //   saveState(
//   //     store.getState()
//   //   );
//   // }, 1000));
//
//   return store;
// };

export default configureStore;
