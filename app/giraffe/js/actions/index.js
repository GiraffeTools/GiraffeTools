import { UPDATE_AUTH } from "./actionTypes";

export const updateAuth = user => ({
  type: UPDATE_AUTH,
  payload: {
    user
  }
});
