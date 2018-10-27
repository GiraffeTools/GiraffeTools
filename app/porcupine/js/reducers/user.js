// A file with general preferences (UI theme, object sizes/colours)
import {
  SET_USER,
  SET_REPOSITORY,
  SET_BRANCH,
  SET_COMMIT
} from "../actions/actionTypes";

const user = (state = {}, action) => {
  const { type, payload } = action;
  switch (type) {
    case SET_USER:
      return { ...state, user: payload.user };
    case SET_REPOSITORY:
      return { ...state, repository: payload.repository };
    case SET_BRANCH:
      return { ...state, branch: payload.branch };
    case SET_COMMIT:
      return { ...state, commit: payload.commit };
    default:
      return state;
  }
  return state;
};

export default user;
