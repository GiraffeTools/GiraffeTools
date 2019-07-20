import {v4} from 'uuid';
import to from 'await-to-js';

import {getCsrfToken} from './auth';
import {API_HOST} from '../config';

export async function initRepository(user, repository, branch) {
  // #TODO make this an array instead of dict
  // #TODO file names are hard-coded, for now
  const giraffe_file = 'GIRAFFE.yml';
  const pork_file = 'GIRAFFE/porcupipeline.pork';

  const contents = {
    [giraffe_file]: await (await fetch(
        '/static/assets/giraffe/GIRAFFE.yml'
    )).text(),
    [pork_file]: await (await fetch(
        '/static/assets/giraffe/porcupipeline.pork'
    )).text(),
  };

  const body = {
    user,
    repository,
    branch: branch || 'master',
    message: 'Init as GiraffeTools project',
    contents,
  };

  return body;
}
