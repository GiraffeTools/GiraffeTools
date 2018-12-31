import { createReducer } from "redux-orm";
import { persistCombineReducers } from "redux-persist";
import storage from "redux-persist/lib/storage";

import ui from "./ui";
import auth from "./auth";

const config = {
  key: "giraffe",
  storage
};

const giraffeApp = persistCombineReducers(config, {
  ui,
  auth
});

export default giraffeApp;
