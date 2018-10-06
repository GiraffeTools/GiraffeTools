import axios from "axios";
import _ from "lodash";
import cookie from "react-cookies";

import store from "../store";
import { setToken } from "../actions";
import { URL, LOGIN } from "../config";

export function InvalidCredentialsException(message) {
  this.message = message;
  this.name = "InvalidCredentialsException";
}

export function login(username, password) {
  axios.defaults.xsrfCookieName = 'csrftoken';
  axios.defaults.xsrfHeaderName = 'X-CSRFToken';

  const csrftoken = cookie.load('csrftoken');
  const config = {
    headers: {'HTTP_X_CSRFTOKEN': csrftoken},
    "Content-Type": 'text/plain;',
  }
  return axios
    .post(`${LOGIN}?redirect_uri=/`, config)
    .then(function(response) {
      console.log(response);
      store.dispatch(setToken(response.data.token));
    })
    .catch(function(error) {
      // raise different exception if due to invalid credentials
      if (_.get(error, "response.status") === 400) {
        throw new InvalidCredentialsException(error);
      }
      throw error;
    });
}

export function loggedIn() {
  return store.getState().token !== null;
}
