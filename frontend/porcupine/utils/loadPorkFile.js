import {v4} from 'uuid';
import {isUUID} from '../utils';

export async function loadPorkFile(json, setPercent) {
  switch (json.version) {
    case '1':
      return await loadingVersion1(json, setPercent);
    case '2':
      // leaving room for future implementations
      break;
    default:
      return await loadingVersion1(json, setPercent);
  }
}

async function loadingVersion1(json, setPercent) {
  const {nodes, links, stickies} = json;
  const nodeData = [];
  const linkData = [];
  const stickyData = [];

  // load nodes
  setPercent(20);
  nodes &&
    nodes.forEach((node) => {
      const newNode = {
        id: node.id || v4(),
        name:
          (node.title && node.title.name.replace('.', '_')) ||
          (node.name && node.name.replace('.', '_')) ||
          '',
        class:
          (node.title && (node.title.class || node.title.name)) ||
          node.class ||
          node.name,
        x: node.position[0],
        y: node.position[1],
        colour: node.colour || '#BBB',
        web_url: (node.title && node.title.web_url) || node.web_url || '',
        code: (node.title && node.title.code) || node.code,
      };

      newNode.parameters = node.ports.map((parameter) => ({
        node: newNode.id,
        id: isUUID(parameter.id) ? parameter.id : v4(),
        code: parameter.code,
        name: parameter.name,
        type: parameter.type,
        input: parameter.input ? parameter.inputPort : null,
        output: parameter.output ? parameter.outputPort : null,
        isVisible: parameter.visible || false,
        isEditable: parameter.editable || false,
        isIterable: parameter.iterator || false,
        value: parameter.value || '', // TODO insert proper default value
      }));

      nodeData.push(newNode);
      // setPercent(10 + (20 * nodeData.length) / nodes.length);
    });
  // load links
  links &&
    links.forEach((link) => {
      const newLink = {
        id: link.id || v4(),
        portFrom: link.from,
        portTo: link.to,
      };
      linkData.push(newLink);
      // setPercent(30 + (20 * linkData.length) / links.length);
    });
  stickies &&
    stickies.forEach((sticky) => {
      const {id, position, title, content} = sticky;
      const newSticky = {
        id: id || v4(),
        title,
        content,
        x: position && position[0],
        y: position && position[1],
      };
      stickyData.push(newSticky);
      // setPercent(30 + (20 * linkData.length) / links.length);
    });
  return {nodes: nodeData, links: linkData, stickies: stickyData};
}
