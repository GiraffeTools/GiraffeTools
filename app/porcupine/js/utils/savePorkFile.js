import { v4 } from "uuid";
import nodeData from "../../static/assets/nipype.json";
import { load as loadYaml } from "yaml-js";
import { isUUID } from "../utils";
import { getCsrfToken } from "../../../giraffe/js/utils/auth";
import { API_HOST } from "../../../giraffe/js/config";
import nipypeCode from "./codeGenerators/nipype";
import dockerCode from "./codeGenerators/docker";
import to from "await-to-js";

export async function savePorkFile(nodes, links, user, commit_message) {
  const commit_branch = user.branch || "master";

  // #TODO hard-coded, for now
  const python_file = "GIRAFFE/code/workflow.py";
  const docker_file = "GIRAFFE/code/Dockerfile";

  const contents = {
    [user.pork_file]: JSON.stringify(porkFile(nodes, links), null, 2),
    [python_file]: await nipypeCode(nodes, links),
    [docker_file]: await dockerCode(nodes)
  };

  const body = {
    filename: user.pork_file,
    user: user.user,
    repository: user.repository,
    branch: user.branch || "master",
    message: commit_message,
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
    links: linksToSaveDict(links),
    nodes: nodesToSaveDict(nodes),
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
      category: node.category,
      ports: ports,
      position: [node.x, node.y],
      title: {
        code: node.code,
        name: node.name,
        web_url: node.web_url
      }
    };
  });
