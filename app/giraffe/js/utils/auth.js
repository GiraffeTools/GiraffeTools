import store from "../store";
import { updateAuth } from "../actions";
import { API_HOST, LOGIN } from "../config";

export function addTokenToQuery(url) {
  const { access_token } = store.getState().auth;
  if (access_token) {
    url.searchParams.append("access_token", access_token);
  }
  return url;
}

let _csrfToken = null;
export async function getCsrfToken() {
  if (_csrfToken === null) {
    const response = await fetch(`${API_HOST}/csrf`, {
      credentials: "include"
    });
    const data = await response.json();
    _csrfToken = data.csrfToken;
  }
  return _csrfToken;
}
