import { combineReducers } from 'redux';
import { createReducer } from 'redux-orm';

import orm from '../models/index';
import sidebar from './sidebar';
import scene from './scene';


const porcupineApp = combineReducers({
  orm: createReducer(orm), // database components
  scene,
  sidebar,
});

export default porcupineApp;
