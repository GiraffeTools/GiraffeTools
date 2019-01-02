export const drop = (item, offset) => {
  const { addNode, addPortToNode, repositionPorts } = this.props;

  this.placeholder = false;
  const rec = document.getElementById("main").getBoundingClientRect();
  // #TODO to be updated as part of #73:
  // const canvas = document.getElementById('jsplumbContainer');
  // const zoom = instance.getZoom();
  const zoom = 1;

  const templateNode = item.element_type;
  const node = $.extend(true, {}, templateNode);

  const name = node.title.name;
  const code = node.title.code;
  node.parameters ? node.parameters : {};
  node.parameters = node.parameters.map(port => {
    // #TODO link to a proper default value
    return {
      ...port,
      id: v4(),
      value: port.value || port.default || ""
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
    web_url: node.title.web_url || "",
    code: code || ""
  };

  addNode(newNode);
  repositionPorts(newNode.id);
};
