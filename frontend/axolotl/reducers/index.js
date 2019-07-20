import {createReducer} from 'redux-orm';
import {persistCombineReducers} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import alerts from './alerts';
import ui from './ui';

const config = {
  key: 'axolotl',
  storage,
};

const axolotlApp = persistCombineReducers(config, {
  alerts,
  ui,
});

export default axolotlApp;
