import {createReducer} from 'redux-orm';
import {persistCombineReducers} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import orm from '../models';
import auth from '../../giraffe/reducers/auth';
import alerts from '../../giraffe/reducers/alerts';
import modals from './modals';
import ui from './ui';
import grammars from './grammars';
import project from './project';
import projectConfig from './projectConfig';
import scene from './scene';

const config = {
  key: 'porcupine',
  storage,
};

const porcupineApp = persistCombineReducers(config, {
  orm: createReducer(orm), // database components
  scene,
  ui,
  alerts,
  grammars,
  modals,
  project,
  projectConfig,
  auth,
});

export default porcupineApp;
