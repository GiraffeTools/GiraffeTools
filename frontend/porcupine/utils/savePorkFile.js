import {} from '../utils';
import {getCsrfToken} from '../../giraffe/utils/auth';
import {API_HOST} from '../../giraffe/config';
import to from 'await-to-js';

import store from '../store';
import {
  nodesWithParameters,
  linksWithPortsAndNodes,
  languageNames,
  stickies,
} from '../selectors/selectors';

export async function savePorkFile(configuration) {
  const state = store.getState();
  const {grammars} = state.grammars;

  const nodes = nodesWithParameters(state);
  const links = linksWithPortsAndNodes(state);
  const allStickies = stickies(state);
  const languages = languageNames(state);

  const saveFiles = await Promise.all(
      grammars
          .filter((grammar) => languages.includes(grammar.language))
          .map((grammar) => grammar.save(nodes, links))
  );
  const fileContent = {};
  saveFiles.forEach((files) =>
    Object.keys(files).forEach((name) => (fileContent[name] = files[name]))
  );

  const {file, files} = configuration;
  let porkFilename = file || files[0];
  if (!porkFilename) {
    porkFilename = 'GIRAFFE/porcupipeline.pork';
    const giraffeFilename = 'GIRAFFE.yml';
    configuration.tools.porcupine.files = [porkFilename];
    fileContent[giraffeFilename] = saveYml(configuration);
  }

  const contents = {
    ...fileContent,
    [porkFilename]: JSON.stringify(
        porkFile(nodes, links, allStickies), null, 2
    ),
  };
  return contents;
}

export async function initPorkFile(configuration) {
  if (!configuration) return;
  if (!configuration.tools) configuration.tools = {};
  if (!configuration.tools.porcupine) configuration.tools.porcupine = {};
  configuration.tools.porcupine.files = ['GIRAFFE/porcupipeline.pork'];

  const saveContent = await savePorkFile(configuration);
  const giraffeFilename = 'GIRAFFE.yml';
  const contents = {
    ...saveContent,
    [giraffeFilename]: await (await fetch(
        '/static/assets/giraffe/GIRAFFE.yml'
    )).text(),
  };

  return contents;
}

export async function initGiraffeProject() {
  // #TODO hard-coded, for now
  const giraffeFilename = 'GIRAFFE.yml';
  const porkFilename = 'GIRAFFE/porcupipeline.pork';

  const contents = {
    [giraffeFilename]: await (await fetch(
        '/static/assets/giraffe/GIRAFFE.yml'
    )).text(),
    [porkFilename]: JSON.stringify(porkFile(), null, 2),
  };

  return contents;
}

export async function pushToGithub(commit, contents) {
  const body = {
    user: commit.user,
    repository: commit.repository,
    branch: commit.branch || 'master',
    message: commit.message,
    contents,
  };
  const [error, response] = await to(
      fetch(`${API_HOST}/push_to_github`, {
        method: 'POST',
        headers: {'X-CSRFToken': await getCsrfToken()},
        body: JSON.stringify(body),
        credentials: 'include',
      })
  );
  return error || response;
}

const porkFile = (nodes, links, allStickies) => {
  return {
    links: links && linksToSaveDict(links),
    nodes: nodes && nodesToSaveDict(nodes),
    stickies: stickies && stickiesToSaveDict(allStickies),
    version: 'v1',
  };
};

const stickiesToSaveDict = (allStickies) =>
  allStickies.map((sticky) => ({
    id: sticky.id,
    title: sticky.title,
    content: sticky.content,
    position: [sticky.x, sticky.y],
  }));

const linksToSaveDict = (links) =>
  links.map((link) => ({
    id: link.id,
    from: link.portFrom.id,
    to: link.portTo.id,
  }));

const nodesToSaveDict = (nodes) =>
  nodes.map((node) => {
    const ports = node.parameters.map((parameter) => ({
      base: parameter.name,
      code: parameter.code,
      editable: parameter.isEnabled,
      id: parameter.id,
      input: parameter.input ? true : false,
      inputPort: parameter.input || false,
      type: parameter.type || undefined,
      name: parameter.name,
      output: parameter.output ? true : false,
      outputPort: parameter.output || false,
      value: parameter.value,
      visible: parameter.isVisible,
      iterator: parameter.isIterable || false,
    }));
    return {
      id: node.id,
      name: node.name,
      class: node.class,
      ports: ports,
      position: [node.x, node.y],
      code: node.code,
      web_url: node.web_url,
      colour: node.colour,
    };
  });
