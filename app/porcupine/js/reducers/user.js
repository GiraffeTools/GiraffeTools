// A file with general preferences (UI theme, object sizes/colours)
import {
  SET_USER,
  SET_REPOSITORY,
  SET_BRANCH,
  SET_COMMIT,
} from "../actions/actionTypes";

const user = (state = {} , action) => {
  switch (action.type) {
    case SET_USER:
      return { ...state, user: action.user };
    case SET_REPOSITORY:
      return { ...state, repository: action.repository };
    case SET_BRANCH:
      return { ...state, branch: action.branch };
    case SET_COMMIT:
      return { ...state, commit: action.commit };
    default:
      return state;
  }
  return state;
};

export default user;
