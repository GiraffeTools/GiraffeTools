import {getCsrfToken} from '../../giraffe/utils/auth';
import {API_HOST} from '../../giraffe/config';
import to from 'await-to-js';

export async function apiPost() {
  const body = {};
  const [error, response] = await to(
      fetch(`${API_HOST}/api_post`, {
        method: 'POST',
        headers: {'X-CSRFToken': await getCsrfToken()},
        body: JSON.stringify(body),
        credentials: 'include',
      })
  );
  return error || response;
}
