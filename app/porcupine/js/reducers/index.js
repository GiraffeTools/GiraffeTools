import { createReducer } from "redux-orm";
import { persistCombineReducers } from "redux-persist";
import storage from "redux-persist/lib/storage";

import orm from "../models";
import auth from "../../../giraffe/js/reducers/auth";
import alerts from "../../../giraffe/js/reducers/alerts";
import modals from "./modals";
import ui from "./ui";
import project from "./project";
import scene from "./scene";

const config = {
  key: "porcupine",
  storage
};

const porcupineApp = persistCombineReducers(config, {
  orm: createReducer(orm), // database components
  scene,
  ui,
  alerts,
  modals,
  project,
  auth
});

export default porcupineApp;
