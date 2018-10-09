import { SET_TOKEN, TOGGLE_NAVIGATION } from "./actionTypes";

export const setToken = token => ({
  type: SET_TOKEN,
  payload: token
});

export const toggleNavigation = () => ({
  type: TOGGLE_NAVIGATION
});
