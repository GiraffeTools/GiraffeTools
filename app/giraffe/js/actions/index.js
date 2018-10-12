import {
  SET_TOKEN,
  TOGGLE_NAVIGATION,
  TOGGLE_SMALL_SCREEN_ALERT
} from "./actionTypes";

export const setToken = token => ({
  type: SET_TOKEN,
  payload: token
});

export const toggleNavigation = () => ({
  type: TOGGLE_NAVIGATION
});

export const toggleSmallScreenAlert = () => ({
  type: TOGGLE_SMALL_SCREEN_ALERT
});
