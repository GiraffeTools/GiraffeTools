import {
  TOGGLE_NAVIGATION,
  TOGGLE_SMALL_SCREEN_ALERT
} from "../actions/actionTypes";

const ui = (
  state = { showNavigation: false, showSmallScreenAlert: true },
  action
) => {
  const { type, payload } = action;
  switch (type) {
    case TOGGLE_NAVIGATION:
      return { ...state, showNavigation: !state.showNavigation };
    case TOGGLE_SMALL_SCREEN_ALERT:
      return { ...state, showSmallScreenAlert: !state.showSmallScreenAlert };
    default:
      return state;
  }
  return state;
};

export default ui;
