import { createReducer } from "redux-orm";
import { persistCombineReducers } from "redux-persist";
import storage from "redux-persist/lib/storage";

import ui from "./ui";
import auth from "./auth";
import modals from "../../../porcupine/js/reducers/modals";

const config = {
  key: "giraffe",
  storage
};

const giraffeApp = persistCombineReducers(config, {
  ui,
  auth,
  modals
});

export default giraffeApp;
