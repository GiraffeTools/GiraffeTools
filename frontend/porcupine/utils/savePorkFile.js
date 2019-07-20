import { v4 } from "uuid";
import { load as loadYaml } from "yaml-js";
import { isUUID } from "../utils";
import { getCsrfToken } from "../../giraffe/utils/auth";
import { API_HOST } from "../../giraffe/config";
import to from "await-to-js";

import store from "../store";
import {
  nodesWithParameters,
  linksWithPortsAndNodes,
  languageNames,
  stickies
} from "../selectors/selectors";

export async function savePorkFile(content) {
  const state = store.getState();
  const { grammars } = state.grammars;

  const nodes = nodesWithParameters(state);
  const links = linksWithPortsAndNodes(state);
  const allStickies = stickies(state);
  const languages = languageNames(state);

  const saveFiles = await Promise.all(
    grammars
      .filter(grammar => languages.includes(grammar.language))
      .map(grammar => grammar.save(nodes, links))
  );
  const fileContent = {};
  saveFiles.forEach(files =>
    Object.keys(files).forEach(name => (fileContent[name] = files[name]))
  );

  const { pork_file } = content;
  const contents = {
    [pork_file]: JSON.stringify(porkFile(nodes, links, allStickies), null, 2),
    ...fileContent
  };
  debugger;
  return contents;
}

export async function initPorkFile(content) {
  const giraffe_file = "GIRAFFE.yml";
  content.pork_file = "GIRAFFE/porcupipeline.pork";

  const saveContent = await savePorkFile(content);
  const contents = {
    [giraffe_file]: await (await fetch(
      "/static/assets/giraffe/GIRAFFE.yml"
    )).text(),
    ...saveContent
  };

  return contents;
}

export async function initGiraffeProject() {
  // #TODO hard-coded, for now
  const giraffe_file = "GIRAFFE.yml";
  const pork_file = "GIRAFFE/porcupipeline.pork";

  const contents = {
    [giraffe_file]: await (await fetch(
      "/static/assets/giraffe/GIRAFFE.yml"
    )).text(),
    [pork_file]: JSON.stringify(porkFile(), null, 2)
  };

  return contents;
}

export async function pushToGithub(commit, contents) {
  const body = {
    user: commit.user,
    repository: commit.repository,
    branch: commit.branch || "master",
    message: commit.commit_message,
    contents
  };

  const [error, response] = await to(
    fetch(`${API_HOST}/push_to_github`, {
      method: "POST",
      headers: { "X-CSRFToken": await getCsrfToken() },
      body: JSON.stringify(body),
      credentials: "include"
    })
  );
  return error || response;
}

const porkFile = (nodes, links, allStickies) => {
  return {
    links: links && linksToSaveDict(links),
    nodes: nodes && nodesToSaveDict(nodes),
    stickies: stickies && stickiesToSaveDict(allStickies),
    version: "v1"
  };
};

const stickiesToSaveDict = allStickies =>
  allStickies.map(sticky => ({
    id: sticky.id,
    title: sticky.title,
    content: sticky.content
  }));

const linksToSaveDict = links =>
  links.map(link => ({
    id: link.id,
    from: link.portFrom.id,
    to: link.portTo.id
  }));

const nodesToSaveDict = nodes =>
  nodes.map(node => {
    const ports = node.parameters.map(parameter => ({
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
      iterator: parameter.isIterable || false
    }));
    return {
      id: node.id,
      name: node.name,
      class: node.class,
      ports: ports,
      position: [node.x, node.y],
      code: node.code,
      web_url: node.web_url,
      colour: node.colour
    };
  });
