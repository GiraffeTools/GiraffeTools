const LANGUAGE = "Keras";

const writePreamble = nodes => {
  const header = `'''
Created by the GiraffeTools Keras generator.
Warning, here be dragons.

'''`;

  const moduleImports = `
import tensorflow as tf`;

  const imports =
    nodes &&
    nodes.map(node => {
      const codeArgument =
        node.code && node.code.filter(a => a.language === LANGUAGE)[0];
      return (
        codeArgument &&
        codeArgument.argument &&
        `${codeArgument.argument.import}`
      );
    });

  const model = `
# Model
def NeuralNet(
    optimizer='adam',
    loss='sparse_categorical_crossentropy',
    metrics=['accuracy']
  ):
`;

  return [
    header,
    moduleImports,
    [...new Set(imports)].join("\r\n"),
    model
  ].join("\r\n");
};

const writeNodes = (nodes, links) => {
  const inputs = links.map(link => link.portTo.id);
  const first_node = nodes.filter(node => {
    const input = node.parameters.filter(
      parameter => parameter.input && parameter.name === ""
    )[0];
    // if the input port is not connected, it's the first
    return input && !inputs.includes(input.input);
  })[0];

  if (!first_node) return null;

  const getChild = nodeId => {
    const link = links.filter(link => link.portFrom.node.id === nodeId)[0];
    return link && link.portTo.node.id;
  };
  const nodeSequence = [first_node.id];
  let child = getChild(first_node.id);
  while (child && !nodeSequence.includes(child)) {
    nodeSequence.push(child);
    child = getChild(child);
  }

  const nodeList = nodeSequence.map(
    id => nodes.filter(node => node.id === id)[0]
  );
  const code =
    nodeList.length &&
    nodeList
      .map((node, index) => {
        const nextNodeName = nodeList[index].name;
        return itemToCode(node, nextNodeName);
      })
      .filter(code => code !== null);
  return code && code.join("\r\n");
};

const argFromParam = parameter => {
  const code =
    parameter.code && parameter.code.filter(a => a.language === LANGUAGE);
  return code.length && code[0].argument;
};

const itemToCode = (node, nextNodeName) => {
  const codeArgument =
    node.code && node.code.filter(a => a.language === LANGUAGE)[0];
  if (!codeArgument) {
    return null;
  }

  let code = "";

  const { parameters } = node;
  const nodeName = node.name.toLowerCase();
  code += `    ${nodeName} = ${codeArgument.argument.name}(`;

  let args, kwargs;
  args =
    parameters &&
    parameters
      // filter the positional arguments
      .filter(parameter => {
        const argument = argFromParam(parameter);
        return typeof argument.arg === "number" && parameter.name !== undefined;
      })
      // sort them by position, just to be sure
      .sort((a, b) => argFromParam(a).arg < argFromParam(b).arg)
      // fill in the values
      .map(parameter => `\r\n      ${parameter.value || "#mandatory argument"}`)
      // join them up, comma separated
      .join(",");

  kwargs =
    parameters &&
    parameters
      // filter the keyword arguments
      .filter(parameter => {
        const argument = argFromParam(parameter);
        return (
          argument.kwarg &&
          parameter.name !== undefined &&
          parameter.value !== undefined &&
          parameter.value !== ""
        );
      })
      // fill in the values
      .map(parameter => {
        const argument = argFromParam(parameter);
        return `\r\n      ${parameter.name}=${parameter.value}`;
      })
      // join them up, comma separated
      .join(",");

  const name = `,\r\n      name='${nodeName}'`;

  // if both args and kwargs are defined, they need to be separated by a comma
  const comma = kwargs !== "" && kwargs !== "" ? "," : "";
  code += args + comma + kwargs + name;
  code += `
    )`;

  if (nextNodeName)
    code += `(${nextNodeName})
  `;

  return code;
};

const writePostamble = () => {
  const first_node = "";
  const last_node = "";

  const createModel = `
    # Creating model
    _model = tf.keras.models.Model(
      inputs  = [${first_node}],
      outputs = [${last_node}]
    )
`;
  const compileModel = `
    _model.compile(
      optimizer = optimizer,
      loss      = loss,
      metrics   = metrics
    )
`;

  const returnModel = `
    # Returning model
    return _model
`;

  return createModel + compileModel + returnModel;
};

export default function kerasCode(nodes, links) {
  const preamble = writePreamble(nodes);
  const nodeCode = writeNodes(nodes, links);
  // #TODO Make parameter editor and write out
  // const parametrs = writeParameters();
  const postAmble = writePostamble();

  // return [preamble, nodeCode, linkCode, postAmble].join("\r\n");
  return [preamble, nodeCode, postAmble].join("\r\n");
}
