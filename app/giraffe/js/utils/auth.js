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
  const config = {
    method: 'GET',
    mode: 'no-cors',
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
    },
    withCredentials: true,
    credentials: 'same-origin',
  }
  return axios
    .get(`${LOGIN}?redirect_uri=/`, config)
    .then(function(response) {
      console.log(response);
      console.log(response.header);
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
