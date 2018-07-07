import { combineReducers } from 'redux';
import { createReducer } from 'redux-orm';

import orm from '../models/index';
import sidebar from './sidebar';


const porcupineApp = combineReducers({
  orm: createReducer(orm), // database components
  sidebar,
});

export default porcupineApp;
