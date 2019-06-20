const LANGUAGE = "Keras";

const writePreamble = nodes => {
  const preamble = `#This is a Keras generator. Warning, here be dragons.
#!/usr/bin/env python

import numpy as np
np.random.seed(123)  # for reproducibility
`;
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

  const preprocess = `
# load your own data here...

model = Sequential()
`;

  return [preamble, [...new Set(imports)].join("\r\n"), preprocess].join(
    "\r\n"
  );
};

const writeNodes = nodes => {
  const code = nodes && nodes.map(node => itemToCode(node));
  return code && code.join("\r\n");
};

const itemToCode = node => {
  const codeArgument =
    node.code && node.code.filter(a => a.language === LANGUAGE)[0];
  if (!codeArgument) {
    return "";
  }

  let code = "";
  const { parameters } = node;
  code += `model.add(${codeArgument.argument.name}(`;

  const argumentString =
    parameters &&
    parameters
      .filter(
        parameter =>
          parameter.name !== undefined &&
          parameter.value !== undefined &&
          parameter.value !== ""
      )
      .map(parameter => `\r\n\t${parameter.name}=${parameter.value}`)
      .join(",");
  code += argumentString;
  code += `)\r\n)`;

  return code;
};

const writePostamble = () => {
  let code = "\r\n";
  code += `# compile model, for example: \r\n`;
  code += `model.compile(loss='categorical_crossentropy', optimizer='adam', metrics=['accuracy'])\r\n`;
  code += `# fit your model here: \r\n`;
  code += `model.fit(..., ..., batch_size=..., nb_epoch=..., verbose=1)\r\n`;
  code += `# test your model: \r\n`;
  code += `score = model.evaluate(..., ..., verbose=0)\r\n`;
  return code;
};

export default function kerasCode(nodes, links) {
  const preamble = writePreamble(nodes);
  const nodeCode = writeNodes(nodes);
  // #TODO Make parameter editor and write out
  // const parametrs = writeParameters();
  const postAmble = writePostamble();

  // return [preamble, nodeCode, linkCode, postAmble].join("\r\n");
  return [preamble, nodeCode, postAmble].join("\r\n");
}
