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

  return Promise.all(
    toolboxes.map(toolbox => {
      fetch(`/static/assets/neurodocker/${toolbox}.txt`).then(response => {
        let a = response.text();
        console.log(a);
        return a;
      });
    })
  ).then(result => {
    console.log(result);
    return result.join("\r\n");
  });
};

const preamble = () =>
  fetch("/static/assets/neurodocker/preamble.txt").then(response =>
    response.text()
  );

const postamble = () =>
  fetch("/static/assets/neurodocker/postamble.txt").then(response =>
    response.text()
  );

export default function dockerCode(nodes, links) {
  return Promise.all([preamble(), nodeCode(nodes), postamble()]).then(result =>
    result.join("\r\n")
  );
}
