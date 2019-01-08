import { createReducer } from "redux-orm";
import { persistCombineReducers } from "redux-persist";
import storage from "redux-persist/lib/storage";

import alerts from "./alerts";
import auth from "./auth";
import modals from "../../../porcupine/js/reducers/modals";

const config = {
  key: "giraffe",
  storage
};

const giraffeApp = persistCombineReducers(config, {
  alerts,
  auth,
  modals
});

export default giraffeApp;
