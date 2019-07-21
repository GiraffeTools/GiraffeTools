import store from '../store';
import {API_HOST} from '../config';

export async function addTokenToQuery(url) {
  const {auth} = store.getState();
  const accessToken = auth.access_token;
  if (accessToken) {
    url.searchParams.append('access_token', accessToken);
  } else {
    const response = await (await fetch('/api/get_user')).json();
    if (response.access_token) {
      url.searchParams.append('access_token', response.access_token);
    }
  }
  return url;
}

let _csrfToken = null;
export async function getCsrfToken() {
  if (_csrfToken === null) {
    const response = await fetch(`${API_HOST}/csrf`, {
      credentials: 'include',
    });
    const data = await response.json();
    _csrfToken = data.csrfToken;
  }
  return _csrfToken;
}
