
import { v4 } from 'node-uuid';
import nodeData from '../../static/assets/nipype.json';


export const loadPorkFile = (json, nodes, links) => {
  switch(json['version']) {
  case '1':
    loadingVersion1(json, nodes, links);
    break;
  case '2':
    // leaving room for future implementations
    break;
  default:
    loadingVersion1(json, nodes, links);
    break;
  }
}

const loadingVersion1 = (json, nodes, links) => {

  // load nodes
  json['nodes'].forEach(node => {

    // This block is only for obtaining the colour:
    let category = node['category'].splice(1);
    let name = node.title.name;
    let currentNodes = nodeData;
    category.forEach(function (c) {
      currentNodes = currentNodes['categories'][c];
    })

    const newNode = {
      id: node.id || v4(),
      name: node.title.name || '',
      // HACK: get position right for example
      x: node['position'][0] + 1000,
      y: node['position'][1] + 400,
			width: node.title.name.length * 12,
      colour: currentNodes.colour || '#BBB',
      web_url: node.web_url || '',
    };
    newNode.ports = node.ports.map(port => {
      const portId = port.input ? port.inputPort : port.outputPort;
      return {
        node: newNode.id,
        id: portId || v4(),
        name: port.name,
        input: port.input,
        output: port.output,
        visible: port.visible,
        editable: port.editable,
        value: port.value || '',  // TODO insert proper default value
      }
    });

    nodes.push(newNode);
  });

  // load links
  json['links'].forEach(link => {
    const newLink = {
      id: v4(),
      portFrom: link.from,
      portTo: link.to,
    };
    links.push(newLink);
  });
}
