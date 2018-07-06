import { combineReducers } from 'redux';

import sidebar from './sidebar';


const porcupineApp = combineReducers({
  sidebar,
});

export default porcupineApp;
