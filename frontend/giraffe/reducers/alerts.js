import {
  TOGGLE_SMALLSCREEN_ALERT,
  TOGGLE_BROWSER_ALERT,
} from '../actions/actionTypes';

const INITIAL_STATE = {
  smallScreen: true,
  incompatibleBrowser: true,
};

const ui = (state = INITIAL_STATE, action) => {
  const {type, payload} = action;
  switch (type) {
    case TOGGLE_SMALLSCREEN_ALERT:
      return {...state, smallScreen: !state.smallScreen};
    case TOGGLE_BROWSER_ALERT:
      return {...state, incompatibleBrowser: !state.incompatibleBrowser};
    default:
      return state;
  }
  return state;
};

export default ui;
