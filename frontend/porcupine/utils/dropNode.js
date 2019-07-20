export const drop = (item, offset) => {
  const {addNode, addPortToNode} = this.props;

  this.placeholder = false;
  const rec = document.getElementById('main').getBoundingClientRect();
  // #TODO to be updated as part of #73:
  // const zoom = instance.getZoom();
  const zoom = 1;

  const node = item.element_type;
  const name = node.name;
  const code = node.code;
  node.parameters ? node.parameters : {};
  node.parameters = node.parameters.map((port) => {
    // #TODO link to a proper default value
    return {
      ...port,
      id: v4(),
      value: port.value || port.default || '',
    };
  });

  const newNode = {
    id: v4(),
    name: name,
    // #TODO fix positioning of dropped node, issue #73
    x: (offset.x - rec.left) / zoom - 45,
    y: (offset.y - rec.top) / zoom - 25,
    width: name.length * 12,
    colour: node.colour,
    parameters: node.parameters,
    web_url: node.web_url || '',
    code: code || '',
  };

  addNode(newNode);
  updateNode(newNode.id);
};
