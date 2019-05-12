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
(X_train, y_train), (X_test, y_test) = mnist.load_data()

X_train = X_train.reshape(X_train.shape[0], 1, 28, 28)
X_test = X_test.reshape(X_test.shape[0], 1, 28, 28)
X_train = X_train.astype('float32')
X_test = X_test.astype('float32')
X_train /= 255
X_test /= 255

Y_train = np_utils.to_categorical(y_train, 10)
Y_test = np_utils.to_categorical(y_test, 10)

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

  let code = ``;
  if (codeArgument.comment) `#${codeArgument.comment}\r\n`;
  code += `model.add(${codeArgument.argument.name}())`;

  return code;
};

const writePostamble = () => {
  let code = "\r\n";
  code += `model.compile(loss='categorical_crossentropy', optimizer='adam', metrics=['accuracy'])\r\n`;
  code += `model.fit(X_train, Y_train, batch_size=32, nb_epoch=10, verbose=1)\r\n`;
  code += `score = model.evaluate(X_test, Y_test, verbose=0)\r\n`;
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
