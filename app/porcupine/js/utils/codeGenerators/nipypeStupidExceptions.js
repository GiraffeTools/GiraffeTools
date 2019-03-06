import { iterableCode, mapNodeFields } from "./nipype";

const LANGUAGE = "Nipype";

export const exceptionNodes = [
  "utility.IdentityInterface()",
  "io.SelectFiles()",
  "io.MySQLSink()",
  "io.SQLiteSink()",
  "io.S3DataGrabber()",
  "io.DataGrabber()"
];

export const exceptionCode = node => {
  const codeArgument =
    node.code && node.code.filter(a => a.language === LANGUAGE)[0];

  if (codeArgument.argument.name === "utility.IdentityInterface()")
    return codeForIdentityInterface(node);
  if (codeArgument.argument.name === "io.SelectFiles()")
    return codeForSelectFiles(node);
  if (codeArgument.argument.name === "io.MySQLSink()")
    return codeForMySQLSink(node);
  if (codeArgument.argument.name === "io.SQLiteSink()")
    return codeForSQLiteSink(node);
  if (codeArgument.argument.name === "io.S3DataGrabber()")
    return codeForS3DataGrabber(node);
  if (codeArgument.argument.name === "io.DataGrabber()")
    return codeForDataGrabber(node);
  return "";
};

export const codeForIdentityInterface = node => {
  const codeArgument =
    node.code && node.code.filter(a => a.language === LANGUAGE)[0];

  let code = `#${codeArgument.comment}\r\n`;
  let iteratorFields = mapNodeFields(node);
  // let nodeType = iteratorFields.length ? "MapNode" : "Node"; // #TODO condition on baing iterable
  let nodeType = "Node"; // #TODO condition on baing iterable

  const fieldNodes =
    node.parameters &&
    node.parameters
      .filter(parameter => parameter.input && parameter.output)
      .map(parameter => parameter.name);

  let givenName = node.name;
  code += `${givenName} = pe.${nodeType}`;
  code += `(utility.IdentityInterface(fields=["${fieldNodes.join(
    '", "'
  )}"]), name='${givenName}'`;
  if (iteratorFields.length) {
    code += `, iterfield = ['${iteratorFields.join("','")}']`;
  }
  code += `)\r\n`;
  code += iterableCode(node);
  return code;
};

export const codeForSelectFiles = node => {
  const codeArgument =
    node.code && node.code.filter(a => a.language === LANGUAGE)[0];

  let code = `#${codeArgument.comment}\r\n`;
  let iteratorFields = mapNodeFields(node);
  let nodeType = iteratorFields.length ? "MapNode" : "Node"; // #TODO condition on baing iterable
  let givenName = node.name;
  code += `${givenName} = pe.${nodeType}`;

  const templateDictionary =
    node.parameters &&
    node.parameters
      .filter(
        parameter => parameter.input && parameter.output && parameter.value
      )
      .map(parameter => `'${parameter.name}':${parameter.value}`);

  code += `(io.SelectFiles(templates={${templateDictionary.join()}}), name='${givenName}'`;
  if (!iteratorFields.length) {
    code += ")\r\n";
  } else {
    `, iterfield = ['${iteratorFields.join('", "')}'])\n`;
  }
  code += `)\r\n`;
  code += iterableCode(node);
  return code;
};

export const codeForMySQLSink = node => {
  const codeArgument =
    node.code && node.code.filter(a => a.language === LANGUAGE)[0];

  let code = `#${codeArgument.comment}\r\n`;
  let iteratorFields = mapNodeFields(node);
  let nodeType = iteratorFields.length ? "MapNode" : "Node"; // #TODO condition on baing iterable

  const fieldNodes =
    node.parameters &&
    node.parameters
      .filter(parameter => parameter.input && parameter.output)
      .map(parameter => parameter.name);

  let givenName = node.name;
  code += `(io.MySQLSink(fields=['${fieldNodes.join(
    ","
  )}']), name='${givenName}'`;
  if (!iteratorFields.length) {
    code += `, iterfield = ['${iteratorFields.join(`', '`)}']`;
  }
  code += `)\r\n`;
  code += iterableCode(node);
  return code;
};

export const codeForSQLiteSink = node => {
  const codeArgument =
    node.code && node.code.filter(a => a.language === LANGUAGE)[0];

  let code = `#${codeArgument.comment}\r\n`;
  let iteratorFields = mapNodeFields(node);
  let nodeType = iteratorFields.length ? "MapNode" : "Node"; // #TODO condition on baing iterable

  const fieldNodes =
    node.parameters &&
    node.parameters
      .filter(parameter => parameter.input && parameter.output)
      .map(parameter => parameter.name);

  let givenName = node.name;
  code += `(utility.SQLiteSink(fields=['${fieldNodes.join(
    ","
  )}']), name='${givenName}'`;
  if (!iteratorFields.length) {
    code += `, iterfield = ['${iteratorFields.join(`', '`)}']`;
  }
  code += `)\r\n`;
  code += iterableCode(node);
  return code;
};

export const codeForS3DataGrabber = node => {
  const standardPorts = [
    "anon",
    "region",
    "bucket",
    "bucket_path",
    "local_directory",
    "raise_on_empty",
    "sort_filelist",
    "template",
    "template_args",
    "ignore_exception"
  ];

  const infields = node.parameters
    .filter(p => p.input)
    .filter(p => !standardPorts.includes(p.name))
    .map(p => p.name);

  const outfields = node.parameters
    .filter(p => p.output)
    .filter(p => !standardPorts.includes(p.name))
    .map(p => p.name);

  const codeArgument =
    node.code && node.code.filter(a => a.language === LANGUAGE)[0];

  let code = `#${codeArgument.comment}\r\n`;
  let iteratorFields = mapNodeFields(node);
  let nodeType = iteratorFields.length ? "MapNode" : "Node"; // #TODO condition on baing iterable
  let givenName = node.name;
  code += `${givenName} = pe.${nodeType}(io.S3DataGrabber(`;
  if (infields.length) code += `infields=["${infields.join('", "')}"]`;
  if (infields.length && outfields.length) code += ", ";
  if (outfields.length) code += `outfields=["${outfields.join('", "')}"]`;
  code += `), name = '${givenName}'`;
  if (!iteratorFields.length) {
    code += ")\r\n";
  } else {
    `, iterfield = ['${iteratorFields.join('", "')}'])\n`;
  }

  code += iterableCode(node);
  return code;
};

export const codeForDataGrabber = node => {
  const standardPorts = [
    "sort_filelist",
    "template",
    "base_directory",
    "raise_on_empty",
    "drop_blank_outputs",
    "template_args"
  ];

  const infields = node.parameters
    .filter(p => p.input)
    .filter(p => !standardPorts.includes(p.name))
    .map(p => p.name);

  const outfields = node.parameters
    .filter(p => p.output)
    .filter(p => !standardPorts.includes(p.name))
    .map(p => p.name);

  const codeArgument =
    node.code && node.code.filter(a => a.language === LANGUAGE)[0];

  let code = `#${codeArgument.comment}\r\n`;
  let iteratorFields = mapNodeFields(node);
  let nodeType = iteratorFields.length ? "MapNode" : "Node"; // #TODO condition on baing iterable
  let givenName = node.name;
  code += `${givenName} = pe.${nodeType}(io.DataGrabber(`;
  if (infields.length) code += `infields=["${infields.join('", "')}"]`;
  if (infields.length && outfields.length) code += ", ";
  if (outfields.length) code += `outfields=["${outfields.join('", "')}"]`;
  code += `), name = '${givenName}'`;
  if (!iteratorFields.length) {
    code += ")\r\n";
  } else {
    `, iterfield = ['${iteratorFields.join('", "')}'])\n`;
  }

  code += iterableCode(node);
  return code;
};
