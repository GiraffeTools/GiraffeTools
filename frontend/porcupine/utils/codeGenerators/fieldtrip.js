const LANGUAGE = "Fieldtrip";

const writePreamble = nodes => {
  const preamble = `% This is a Fieldtrip generator. Warning, here be dragons.`;
  return preamble;
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
  return code;
};

const writePostamble = () => {
  let code = "\r\n";
  return code;
};

export default function kerasCode(nodes, links) {
  const preamble = writePreamble(nodes);
  const nodeCode = writeNodes(nodes);
  // const parameters = writeParameters();
  const postAmble = writePostamble();

  // return [preamble, nodeCode, linkCode, postAmble].join("\r\n");
  return [preamble, nodeCode, postAmble].join("\r\n");
}
