import { combineReducers } from 'redux';

import nodes from './reducers/nodes.js';
import sidebar from './reducers/sidebar.js';
import parameters from './reducers/parameters.js';

const porcupineApp = combineReducers({
  nodes,
  sidebar,
  parameters,
});

export default porcupineApp;
