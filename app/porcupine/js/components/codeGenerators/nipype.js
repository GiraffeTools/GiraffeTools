import React, { Fragment } from "react";
import SyntaxHighlighter, {
  registerLanguage
} from "react-syntax-highlighter/light";
import python from "react-syntax-highlighter/languages/hljs/python";
import atomDark from "react-syntax-highlighter/styles/hljs/atom-one-dark";

registerLanguage("python", python);

const LANGUAGE = "Nipype";

const writePreamble = nodes => {
  const preamble = `#This is a Nipype generator. Warning, here be dragons.
#!/usr/bin/env python

import sys
import nipype
import nipype.pipeline as pe
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

  return [preamble, [...new Set(imports)].join("\r\n"), ""].join("\r\n");
};

const writeNodes = nodes => {
  const code = nodes && nodes.map(node => itemToCode(node));
  return code && code.join("\r\n");
};

const writeLinks = links => {
  let code = "";
  code += "#Create a workflow to connect all those nodes\r\n";
  code += "analysisflow = nipype.Workflow('MyWorkflow')\r\n";
  code += links && links.map(link => linkToCode(link)).join("\r\n");

  return code;
};

const linkToCode = link => {
  if (
    link &&
    link.portFrom &&
    link.portTo &&
    link.portFrom.node &&
    link.portTo.node
  ) {
    let source = `my_${link.portFrom.node.name}`;
    let sourceAttribute = `${link.portFrom.name}`;
    let destination = `my_${link.portTo.node.name}`;
    let destinationAttribute = `${link.portTo.name}`;
    return `analysisflow.connect(${source}, "${sourceAttribute}", ${destination}, "${destinationAttribute}")`;
  } else {
    return "";
  }
};

const itemToCode = node => {
  const codeArgument =
    node.code && node.code.filter(a => a.language === LANGUAGE)[0];
  if (!codeArgument) {
    return "";
  }

  let code = `#${codeArgument.comment}\r\n`;
  let nodeType = true ? "Node" : "MapNode"; // #TODO condition on baing iterable
  let givenName = `my_${node.name}`;
  code += `${givenName} = pe.${nodeType}(interface = ${
    codeArgument.argument.name
  }, name='${givenName}')\r\n`;
  node.parameters &&
    node.parameters
      .filter(parameter => parameter.value !== "")
      .forEach(parameter => {
        if (parameter.input) {
          code += `${givenName}.inputs.${parameter.name} = ${
            parameter.value
          }\r\n`;
        }
      });
  return code;
};

const writePostamble = () => {
  return `
#Run the workflow
plugin = 'MultiProc' #adjust your desired plugin here
plugin_args = {'n_procs': 1} #adjust to your number of cores
analysisflow.write_graph(graph2use='flat', format='png', simple_form=False)
analysisflow.run(plugin=plugin, plugin_args=plugin_args)
`;
};

const NipypeCode = ({ nodes, links }) => {
  const preamble = writePreamble(nodes);
  const nodeCode = writeNodes(nodes);
  const linkCode = writeLinks(links);
  // #TODO Make parameter editor and write out
  // const parametrs = writeParameters();
  const postAmble = writePostamble();

  return (
    <SyntaxHighlighter language="python" style={atomDark}>
      {[preamble, nodeCode, linkCode, postAmble].join("\r\n")}
    </SyntaxHighlighter>
  );
};

export default NipypeCode;
