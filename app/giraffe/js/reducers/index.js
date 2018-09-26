import { combineReducers } from "redux";
import { createReducer } from "redux-orm";
import { persistCombineReducers } from "redux-persist";
import storage from "redux-persist/lib/storage";

import ui from "./ui";
import login from "./login";

const config = {
  key: "primary",
  storage
};

const giraffeApp = persistCombineReducers(config, {
  ui,
  login
});

export default giraffeApp;
