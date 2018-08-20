import { combineReducers } from "redux";
import { createReducer } from "redux-orm";

import orm from "../models";
import ui from "./ui";
import scene from "./scene";

const porcupineApp = combineReducers({
  orm: createReducer(orm), // database components
  scene,
  ui,
});

export default porcupineApp;
