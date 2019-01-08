import { createReducer } from "redux-orm";
import { persistCombineReducers } from "redux-persist";
import storage from "redux-persist/lib/storage";

import orm from "../models";
import auth from "../../../giraffe/js/reducers/auth";
import alerts from "../../../giraffe/js/reducers/alerts";
import modals from "./modals";
import ui from "./ui";
import user from "./user";
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
  user,
  auth
});

export default porcupineApp;
