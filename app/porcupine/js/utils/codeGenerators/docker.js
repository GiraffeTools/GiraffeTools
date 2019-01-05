import to from "await-to-js";

const LANGUAGE = "Docker";

const codeMappings = {};
async function toolboxCode(toolbox) {
  if (!Object.keys(codeMappings).includes(toolbox)) {
    const code = await fetch(`/static/assets/neurodocker/${toolbox}.txt`);
    codeMappings[toolbox] = await code.text();
  }
  return codeMappings[toolbox];
}

async function nodeCode(nodes) {
  const languagesInEditor =
    nodes &&
    nodes.map(node => {
      const codeArgument =
        node.code && node.code.filter(a => a.language === LANGUAGE)[0];
      return (
        codeArgument &&
        codeArgument.argument &&
        codeArgument.argument.name &&
        codeArgument.argument.name.split(",")
      );
    });

  const availableToolboxes = [
    "afni",
    "ants",
    "freesurfer",
    "fsl",
    "mrtrix",
    "Nipype"
  ];
  const toolboxes = [
    ...new Set(languagesInEditor.reduce((acc, val) => acc.concat(val), []))
  ]
    .map(language => language.replace(/\s/g, ""))
    .filter(toolbox => availableToolboxes.includes(toolbox));

  const code = await Promise.all(
    toolboxes.map(toolbox => toolboxCode(toolbox))
  );
  return code.join("\r\n");
}

export default async function dockerCode(nodes, links) {
  const [error, dockerComponents] = await to(
    Promise.all([
      toolboxCode("preamble"),
      nodeCode(nodes),
      toolboxCode("postamble")
    ])
  );

  return dockerComponents.join("\r\n");
}
