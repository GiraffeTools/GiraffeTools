import {
  SET_USER,
  SET_REPOSITORY,
  SET_BRANCH,
  SET_COMMIT,
  SET_ARMA_FILE
} from "./actionTypes";

///// SCENE /////
export const setUser = user => ({
  type: SET_USER,
  payload: {
    user
  }
});
export const setRepository = repository => ({
  type: SET_REPOSITORY,
  payload: {
    repository
  }
});
export const setBranch = branch => ({
  type: SET_BRANCH,
  payload: {
    branch
  }
});
export const setCommit = commit => ({
  type: SET_COMMIT,
  payload: {
    commit
  }
});
export const setArmaFile = arma_file => ({
  type: SET_ARMA_FILE,
  payload: {
    arma_file
  }
});
