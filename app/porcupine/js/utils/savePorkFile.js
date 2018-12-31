import { v4 } from "uuid";
import nodeData from "../../static/assets/nipype.json";
import { load as loadYaml } from "yaml-js";
import { isUUID } from "../utils";
import { getCsrfToken } from "../../../giraffe/js/utils/auth";
import { API_HOST } from "../../../giraffe/js/config";

export const savePorkFile = (nodes, links, user, commit_message) => {
  const commit_branch = user.branch || "master";
  const content = btoa(
    JSON.stringify(
      {
        links: linksToSaveDict(links),
        nodes: nodesToSaveDict(nodes),
        version: "v1"
      },
      null,
      2
    )
  );
  const body = {
    filename: user.pork_file,
    user: user.user,
    repository: user.repository,
    branch: user.branch || "master",
    message: commit_message,
    content
  };

  return getCsrfToken()
    .then(token => {
      return fetch(`${API_HOST}/push_to_github`, {
        method: "POST",
        headers: { "X-CSRFToken": token },
        body: JSON.stringify(body),
        credentials: "include"
      });
    })
    .catch(error => {
      console.log(error);
    });
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
