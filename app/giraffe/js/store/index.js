import { compose, createStore, applyMiddleware } from "redux";
import { createLogger } from "redux-logger";
import { persistStore } from "redux-persist";

import giraffeApp from "../reducers";

const store = createStore(giraffeApp, compose(applyMiddleware(createLogger())));

persistStore(store, null, () => store.getState());

export default store;
