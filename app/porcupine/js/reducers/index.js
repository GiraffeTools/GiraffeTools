import { combineReducers } from 'redux';

import nodes from './nodes.js';
import sidebar from './sidebar.js';
import parameters from './parameters.js';

const porcupineApp = combineReducers({
  nodes,
  sidebar,
  parameters,
});

export default porcupineApp;
