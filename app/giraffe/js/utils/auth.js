import axios from "axios";
import _ from "lodash";
import cookie from "react-cookies";

import store from "../store";
import { updateAuth } from "../actions";
import { API_HOST, LOGIN } from "../config";

export function InvalidCredentialsException(message) {
  this.message = message;
  this.name = "InvalidCredentialsException";
}

export function login() {
  const config = {
    method: "GET",
    mode: "no-cors",
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json"
    },
    withCredentials: true,
    credentials: "same-origin"
  };
  return axios
    .get(`${LOGIN}?redirect_uri=/`, config)
    .then(function(response) {
      store.dispatch(
        updateAuth({
          access_token: response.data.token
        })
      );
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

export function getCsrfToken() {
  return fetch(`${API_HOST}/csrf`, {
    credentials: "include"
  })
    .then(response => response.json())
    .then(response => response.csrfToken)
    .catch(error => {
      throw "Cannot obtain CSRF token";
    });
}

export function testRequest(method) {
  return getCsrfToken()
    .then(token => {
      console.log({ token, method });
      return fetch(`${API_HOST}/ping`, {
        method: method,
        headers: method === "POST" ? { "X-CSRFToken": token } : {},
        credentials: "include"
      })
        .then(response => response.json())
        .then(response => response.result);
    })
    .catch(error => {
      throw "Ping error";
    });
}
