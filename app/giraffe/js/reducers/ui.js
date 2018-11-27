import { TOGGLE_NAVIGATION } from "../actions/actionTypes";

const ui = (state = { showNavigation: false }, action) => {
  const { type, payload } = action;
  switch (type) {
    case TOGGLE_NAVIGATION:
      return { ...state, showNavigation: !state.showNavigation };
    default:
      return state;
  }
  return state;
};

export default ui;
