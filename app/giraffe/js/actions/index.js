import {
  SET_TOKEN
} from '../actions/types';


export const setToken = token => ({
  type: SET_TOKEN,
  payload: token
});
