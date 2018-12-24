import { UPDATE_AUTH } from "./actionTypes";

export const updateAuth = auth => ({
  type: UPDATE_AUTH,
  payload: {
    auth
  }
});
