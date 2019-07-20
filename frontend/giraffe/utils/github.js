export async function initRepository(user, repository, branch) {
  // #TODO make this an array instead of dict
  // #TODO file names are hard-coded, for now
  const giraffeFilename = 'GIRAFFE.yml';
  const porkFilename = 'GIRAFFE/porcupipeline.pork';

  const contents = {
    [giraffeFilename]: await (await fetch(
        '/static/assets/giraffe/GIRAFFE.yml'
    )).text(),
    [porkFilename]: await (await fetch(
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
