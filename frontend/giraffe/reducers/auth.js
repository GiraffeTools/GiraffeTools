import {UPDATE_AUTH} from '../actions/actionTypes';

const INITIAL_STATE = {
  access_token: false,
  github_email: false,
  github_handle: false,
  github_name: false,
};

const auth = (state = INITIAL_STATE, action) => {
  const {type, payload} = action;
  switch (type) {
    case UPDATE_AUTH:
      return {
        ...state,
        access_token: payload.user && payload.user.access_token,
        github_email: payload.user && payload.user.github_email,
        github_handle: payload.user && payload.user.github_handle,
        github_name: payload.user && payload.user.github_name,
      };
    default:
      return state;
  }
  return state;
};

export default auth;
