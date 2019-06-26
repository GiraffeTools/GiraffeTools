import { v4 } from "uuid";
import { API_HOST } from "../../giraffe/config";
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
  const { nodes, links } = json;
  const nodeData = [];
  const linkData = [];

  const toolboxData = await (await fetch(`${API_HOST}/nodes`)).json();

  // load nodes
  setPercent(20);
  nodes &&
    nodes.forEach(node => {
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

      let currentNodes = toolboxData.toolboxes.find(
        currentToolbox => currentToolbox.name == toolbox
      );
      try {
        category.forEach(c => {
          currentNodes = currentNodes.categories.find(node => node.name == c);
        });
      } catch (e) {}
      const newNode = {
        toolbox,
        id: node.id || v4(),
        name:
          (node.title && node.title.name.replace(".", "_")) ||
          (node.name && node.name.replace(".", "_")) ||
          "",
        class:
          (node.title && (node.title.class || node.title.name)) ||
          node.class ||
          node.name,
        x: node.position[0],
        y: node.position[1],
        colour: node.colour || (currentNodes && currentNodes.colour) || "#BBB",
        web_url: (node.title && node.title.web_url) || node.web_url || "",
        code: (node.title && node.title.code) || node.code,
        category: category
      };

      newNode.parameters = node.ports.map(parameter => ({
        node: newNode.id,
        id: isUUID(parameter.id) ? parameter.id : v4(),
        code: parameter.code,
        name: parameter.name,
        input: parameter.input ? parameter.inputPort : null,
        output: parameter.output ? parameter.outputPort : null,
        isVisible: parameter.visible || false,
        isEditable: parameter.editable || false,
        isIterable: parameter.iterator || false,
        value: parameter.value || "" // TODO insert proper default value
      }));

      nodeData.push(newNode);
      setPercent(10 + (20 * nodeData.length) / nodes.length);
    });
  // load links
  links &&
    links.forEach(link => {
      const newLink = {
        id: v4(),
        portFrom: link.from,
        portTo: link.to
      };
      linkData.push(newLink);
      setPercent(30 + (20 * linkData.length) / links.length);
    });
  return { nodes: nodeData, links: linkData };
}
