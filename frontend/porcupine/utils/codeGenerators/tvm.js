const LANGUAGE = "TvM";

const CFG = "configuration";

const nodeToCode = node => {
  const codeArgument =
    node.code && node.code.find(a => a.language === LANGUAGE);
  if (!codeArgument) {
    return "";
  }
  let code = "";
  code += `%% ${codeArgument.comment}\r\n`;
  code += `${CFG} = [];\r\n`;

  code +=
    node.parameters &&
    node.parameters
      .filter(parameter => parameter.value !== "")
      .map(parameter => `${CFG}.${parameter.name} = ${parameter.value}\r\n`)
      .join("");

  //add function
  code += `${codeArgument.argument.name}(${CFG});\n\n`;
  return code;
};

export default async function tvmCode(nodes, links) {
  const [error, components] = await to(Promise.all([nodeToCode(nodes)]));

  return components.join("\r\n");
}
