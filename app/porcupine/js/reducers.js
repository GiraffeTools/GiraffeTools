import { combineReducers } from 'redux';

import { nodeReducers } from './reducers/nodeReducers.js';

const porcupineApp = combineReducers({
  nodeReducers: nodeReducers
});

export default porcupineApp;
