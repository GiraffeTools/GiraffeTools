import { combineReducers } from 'redux';

import links from './links';
import nodes from './nodes';
import parameters from './parameters';
import ports from './ports';
import sidebar from './sidebar';

const porcupineApp = combineReducers({
  sidebar,
});

export default porcupineApp;
