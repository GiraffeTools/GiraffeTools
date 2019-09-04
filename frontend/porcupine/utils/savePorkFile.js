import {getCsrfToken} from '../../giraffe/utils/auth';
import {API_HOST} from '../../giraffe/config';
import to from 'await-to-js';
import {dump as saveYaml} from 'yaml-js';

import store from '../store';
import {
  nodesWithParameters,
  linksWithPortsAndNodes,
  languageNames,
  stickies,
} from '../selectors/selectors';

export async function savePorkFile() {
  const state = store.getState();
  const configuration = state.projectConfig;
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

  // #TODO grab this from local state
  const {files} = configuration;
  if (!files || !files.length) {
    const porkFilename = 'GIRAFFE/porcupipeline.pork';
    // #TODO set project file
    files.push(porkFilename);
    configuration.files = [porkFilename];
    const giraffeFilename = 'GIRAFFE.yml';
    const ymlConfig = {tools: {porcupine: configuration}};
    fileContent[giraffeFilename] = saveYaml(ymlConfig);
  }
  const contents = {
    ...fileContent,
    [files[0]]: JSON.stringify(
        porkFile(nodes, links, allStickies, state.ui), null, 2
    ),
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

const porkFile = (nodes, links, allStickies, ui) => {
  const {showToolboxes} = ui;
  return {
    links: links && linksToSaveDict(links),
    nodes: nodes && nodesToSaveDict(nodes),
    stickies: stickies && stickiesToSaveDict(allStickies),
    ui: {
      showToolboxes,
    },
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
