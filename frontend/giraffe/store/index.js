import {createStore, applyMiddleware} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import {createLogger} from 'redux-logger';
import {persistStore} from 'redux-persist';

import giraffeApp from '../reducers';

const store = createStore(
    giraffeApp,
    composeWithDevTools(applyMiddleware(/* createLogger()*/))
);

persistStore(store, null, () => store.getState());

export default store;
