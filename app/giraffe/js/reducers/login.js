import { combineReducers } from 'redux';
import {
  SET_TOKEN
} from "../actions/actionTypes"

const tokenInitialState = null;

const login = (state = tokenInitialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case SET_TOKEN:
      return payload.token;
    default:
      return state;
  }
}

const appReducer = combineReducers({
  login,
})

const rootReducer = (state, action) => {
  return appReducer(state, action);
}

export default rootReducer;
