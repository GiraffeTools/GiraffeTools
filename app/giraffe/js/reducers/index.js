import { combineReducers } from "redux";
import { createReducer } from "redux-orm";

import ui from "./ui";

const giraffeApp = combineReducers({
  ui
});

export default giraffeApp;
