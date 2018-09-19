import { combineReducers } from "redux";
import { createReducer } from "redux-orm";

import orm from "../models";
import ui from "./ui";
import user from "./user";
import scene from "./scene";

const porcupineApp = combineReducers({
  orm: createReducer(orm), // database components
  scene,
  ui,
  user
});

export default porcupineApp;
