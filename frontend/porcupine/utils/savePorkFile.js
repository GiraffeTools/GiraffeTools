import { v4 } from "uuid";
import { load as loadYaml } from "yaml-js";
import { isUUID } from "../utils";
import { getCsrfToken } from "../../giraffe/utils/auth";
import { API_HOST } from "../../giraffe/config";
import nipypeCode from "./codeGenerators/nipype";
import dockerCode from "./codeGenerators/docker";
import to from "await-to-js";

export async function savePorkFile(content) {
  // #TODO hard-coded, for now
  const python_file = "GIRAFFE/code/workflow.py";
  const docker_file = "GIRAFFE/code/Dockerfile";
  const docker_compose_file = "GIRAFFE/code/docker-compose.yml";
  const empty_file_temp = "GIRAFFE/code/temp/.empty";
  const empty_file_output = "GIRAFFE/code/output/.empty";

  const { pork_file, nodes, links } = content;
  const contents = {
    [pork_file]: JSON.stringify(porkFile(nodes, links), null, 2),
    [python_file]: await nipypeCode(nodes, links),
    [docker_file]: await dockerCode(nodes),
    [docker_compose_file]: await (await fetch(
      "/static/assets/misc/docker-compose.yml"
    )).text(),
    [empty_file_temp]: await (await fetch(
      "/static/assets/misc/empty.txt"
    )).text(),
    [empty_file_output]: await (await fetch(
      "/static/assets/misc/empty.txt"
    )).text()
  };

  return contents;
}

export async function initPorkFile(content) {
  // #TODO hard-coded, for now
  const giraffe_file = "GIRAFFE.yml";
  const pork_file = "GIRAFFE/porcupipeline.pork";
  const python_file = "GIRAFFE/code/workflow.py";
  const docker_file = "GIRAFFE/code/Dockerfile";
  const docker_compose_file = "GIRAFFE/code/docker-compose.yml";
  const empty_file_temp = "GIRAFFE/code/temp/.empty";
  const empty_file_output = "GIRAFFE/code/output/.empty";

  const { nodes, links } = content;
  const contents = {
    [giraffe_file]: await (await fetch(
      "/static/assets/giraffe/GIRAFFE.yml"
    )).text(),
    [pork_file]: JSON.stringify(porkFile(nodes, links), null, 2),
    [python_file]: await nipypeCode(nodes, links),
    [docker_file]: await dockerCode(nodes),
    [docker_compose_file]: await (await fetch(
      "/static/assets/misc/docker-compose.yml"
    )).text(),
    [empty_file_temp]: await (await fetch(
      "/static/assets/misc/empty.txt"
    )).text(),
    [empty_file_output]: await (await fetch(
      "/static/assets/misc/empty.txt"
    )).text()
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

const porkFile = (nodes, links) => {
  return {
    links: links && linksToSaveDict(links),
    nodes: nodes && nodesToSaveDict(nodes),
    version: "v1"
  };
};

const linksToSaveDict = links =>
  links.map(link => ({
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
      name: parameter.name,
      output: parameter.output ? true : false,
      outputPort: parameter.output || false,
      value: parameter.value,
      visible: parameter.isVisible,
      iterator: parameter.isIterable || false
    }));
    return {
      toolbox: node.toolbox,
      name: node.name,
      class: node.class,
      category: node.category,
      ports: ports,
      position: [node.x, node.y],
      code: node.code,
      web_url: node.web_url,
      colour: node.colour
    };
  });
