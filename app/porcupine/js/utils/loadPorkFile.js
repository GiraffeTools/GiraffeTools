import { v4 } from "uuid";
import nodeData from "../../static/assets/nipype.json";
import { load as loadYaml } from "yaml-js";
import { isUUID } from "../utils";

export const loadPorkFile = (json, nodes, links, setPercent) => {
  switch (json["version"]) {
    case "1":
      loadingVersion1(json, nodes, links, setPercent);
      break;
    case "2":
      // leaving room for future implementations
      break;
    default:
      loadingVersion1(json, nodes, links, setPercent);
      break;
  }
};

const loadingVersion1 = (json, nodes, links, setPercent) => {
  // load nodes
  setPercent(20);
  json["nodes"].forEach(node => {
    // This block is only for obtaining the colour:
    let category = node["category"].splice(1);
    let name = node.title.name;
    let currentNodes = nodeData;
    category.forEach(function(c) {
      currentNodes = currentNodes["categories"][c];
    });

    const newNode = {
      id: node.id || v4(),
      name: node.title.name || "",
      x: node["position"][0],
      y: node["position"][1],
      width: node.title.name.length * 12,
      colour: (currentNodes && currentNodes.colour) || "#BBB",
      web_url: node.web_url || "",
      code: node.title.code
    };
    newNode.parameters = node.ports.map(parameter => ({
      node: newNode.id,
      id: isUUID(parameter.id) ? parameter.id : v4(),
      name: parameter.name,
      input: parameter.input ? parameter.inputPort : null,
      output: parameter.output ? parameter.outputPort : null,
      isVisible: parameter.visible,
      isEditable: parameter.editable,
      value: parameter.value || "" // TODO insert proper default value
    }));

    nodes.push(newNode);
    setPercent(20 + (40 * nodes.length) / json["nodes"].length);
  });

  // load links
  json["links"].forEach(link => {
    const newLink = {
      id: v4(),
      portFrom: link.from,
      portTo: link.to
    };
    links.push(newLink);
    setPercent(60 + (40 * links.length) / json["links"].length);
  });
};
