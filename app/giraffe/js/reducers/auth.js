import { UPDATE_AUTH } from "../actions/actionTypes";

const INITIAL_STATE = {
  access_token: false,
  github_email: false,
  github_handle: false,
  github_name: false
};

const auth = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;
  switch (type) {
    case UPDATE_AUTH:
      return { ...state, ...payload.user };
    default:
      return state;
  }
  return state;
};

export default auth;
