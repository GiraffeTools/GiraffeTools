import { createReducer } from "redux-orm";
import { persistCombineReducers } from "redux-persist";
import storage from "redux-persist/lib/storage";

import ui from "./ui";

const config = {
  key: "armadillo",
  storage
};

const armadilloApp = persistCombineReducers(config, {
  ui,
});

export default armadilloApp;
