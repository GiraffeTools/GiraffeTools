import { v4 } from "uuid";
import nodeData from "../../static/assets/nipype.json";
import { load as loadYaml } from "yaml-js";
import { isUUID } from "../utils";

export const savePorkFile = (nodes, links, user, token, commit_message) => {
  const url = `https://api.github.com/repos/${user.user}/${
    user.repository
  }/contents/${user.pork_file}`;
  const commit_branch = user.branch || "master";
  fetch(`${url}?ref=${commit_branch}`, {
    method: "GET",
    Authorization: `token ${token}`
  })
    .then(response => response.json())
    .then(data => {
      const base64content = btoa(
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
      if (data.content === base64content) {
        console.log("No changes to be made");
        return;
      }
      const message = {
        message: commit_message,
        branch: commit_branch,
        content: base64content,
        sha: data.sha
      };
      fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `token ${token}`
        },
        body: JSON.stringify(message)
      })
        .then(response => {
          console.log(response);
          return response.status;
          // if (response.status == 200){
          //   console.log("Committed!");
          // } else {
          //   console.log("Not committed... something went wrong, probably.");
          // }
        })
        .catch(response => {
          console.log("Probably something went wrong");
        });
    });
  return;
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
      iterator: false,
      name: parameter.name,
      output: parameter.output ? true : false,
      outputPort: parameter.output || false,
      value: parameter.value,
      visible: parameter.isVisible
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
