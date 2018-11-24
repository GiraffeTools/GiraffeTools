import { createReducer } from "redux-orm";
import { persistCombineReducers } from "redux-persist";
import storage from "redux-persist/lib/storage";

import orm from "../models";
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
  modals,
  user
});

export default porcupineApp;
