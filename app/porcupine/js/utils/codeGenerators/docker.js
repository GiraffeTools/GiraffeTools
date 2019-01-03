import afni from "./neurodocker/afni.txt";
import ants from "./neurodocker/ants.txt";
import freesurfer from "./neurodocker/freesurfer.txt";
import fsl from "./neurodocker/fsl.txt";
import mrtrix from "./neurodocker/mrtrix.txt";
import Nipype from "./neurodocker/Nipype.txt";
import postamble from "./neurodocker/postamble.txt";
import preamble from "./neurodocker/preamble.txt";

const LANGUAGE = "Docker";

const nodeCode = nodes => {
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

  const availableToolboxes = {
    afni,
    ants,
    freesurfer,
    fsl,
    mrtrix,
    Nipype
  };

  const toolboxes = [
    ...new Set(languagesInEditor.reduce((acc, val) => acc.concat(val), []))
  ]
    .map(language => language.replace(/\s/g, ""))
    .filter(toolbox => Object.keys(availableToolboxes).includes(toolbox));

  return toolboxes.map(toolbox => availableToolboxes[toolbox]);
};

export default function dockerCode(nodes, links) {
  return [preamble, nodeCode(nodes).join("\r\n"), postamble].join("\r\n");
}
