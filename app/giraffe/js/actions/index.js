import {
  UPDATE_AUTH,
  TOGGLE_SMALLSCREEN_ALERT,
  TOGGLE_BROWSER_ALERT
} from "./actionTypes";

export const updateAuth = user => ({
  type: UPDATE_AUTH,
  payload: {
    user
  }
});

export const toggleSmallScreenAlert = () => ({
  type: TOGGLE_SMALLSCREEN_ALERT
});

export const toggleBrowserAlert = () => ({
  type: TOGGLE_BROWSER_ALERT
});
