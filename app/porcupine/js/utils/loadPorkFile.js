import { v4 } from "uuid";
import { API_HOST } from "../../../giraffe/js/config";
import { load as loadYaml } from "yaml-js";
import { isUUID } from "../utils";

export async function loadPorkFile(json, nodes, links, setPercent) {
  switch (json.version) {
    case "1":
      return await loadingVersion1(json, nodes, links, setPercent);
      break;
    case "2":
      // leaving room for future implementations
      break;
    default:
      return await loadingVersion1(json, nodes, links, setPercent);
      break;
  }
}

async function loadingVersion1(json, setPercent) {
  const nodes = [];
  const links = [];
  const nodeData = await (await fetch(`${API_HOST}/nodes`)).json();

  // load nodes
  setPercent(20);
  json.nodes.forEach(node => {
    // This block is only for obtaining the colour:

    let category;
    let toolbox;
    if (node.toolbox || node.category[0] !== "Nipype") {
      category = node.category;
      toolbox = node.toolbox || "Nipype";
    } else {
      toolbox = node.category[0];
      category = node.category.splice(1);
    }

    let currentNodes = nodeData.toolboxes.filter(
      currentToolbox => currentToolbox.name == toolbox
    )[0];
    category.forEach(function(c) {
      currentNodes = currentNodes.categories[c];
    });

    const newNode = {
      toolbox,
      id: node.id || v4(),
      name: node.title.name.replace(".", "_") || "",
      class: node.title.class || node.title.name,
      x: node.position[0],
      y: node.position[1],
      colour: (currentNodes && currentNodes.colour) || "#BBB",
      web_url: node.title.web_url || "",
      code: node.title.code,
      category: category
    };

    newNode.parameters = node.ports.map(parameter => ({
      node: newNode.id,
      id: isUUID(parameter.id) ? parameter.id : v4(),
      name: parameter.name,
      input: parameter.input ? parameter.inputPort : null,
      output: parameter.output ? parameter.outputPort : null,
      isVisible: parameter.visible || false,
      isEditable: parameter.editable || false,
      isIterable: parameter.iterator || false,
      value: parameter.value || "" // TODO insert proper default value
    }));

    nodes.push(newNode);
    setPercent(10 + (20 * nodes.length) / json.nodes.length);
  });

  // load links
  json.links.forEach(link => {
    const newLink = {
      id: v4(),
      portFrom: link.from,
      portTo: link.to
    };
    links.push(newLink);
    setPercent(30 + (20 * links.length) / json.links.length);
  });
  return { nodes, links };
}
