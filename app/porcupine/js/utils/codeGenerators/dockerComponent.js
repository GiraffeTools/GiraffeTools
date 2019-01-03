import React, { Fragment } from "react";

const LANGUAGE = "Docker";

class DockerCode extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      preamble: "",
      codeMappings: {},
      postamble: ""
    };
  }

  componentDidMount() {
    const toolboxes = ["afni", "ants", "freesurfer", "fsl", "mrtrix", "Nipype"];
    toolboxes.forEach(toolbox => {
      fetch(`/static/assets/neurodocker/${toolbox}.txt`)
        .then(response => response.text())
        .then(mapping => {
          this.setState({
            codeMappings: { ...this.state.codeMappings, [toolbox]: mapping }
          });
        });
    });
    fetch("/static/assets/neurodocker/preamble.txt")
      .then(response => response.text())
      .then(preamble => this.setState({ preamble }));
    fetch("/static/assets/neurodocker/postamble.txt")
      .then(response => response.text())
      .then(postamble => this.setState({ postamble }));
  }

  render() {
    const { codeMappings, preamble, postamble } = this.state;
    const { nodes } = this.props;
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
    const nodeCode =
      languagesInEditor &&
      // flat() breaks stuff in older browsers:
      // [...new Set(languagesInEditor.flat())]
      [...new Set(languagesInEditor.reduce((acc, val) => acc.concat(val), []))]
        .map(
          // remove white space from 'language' first
          language => codeMappings[language.replace(/\s/g, "")]
          // remove 'undefined' items and join
        )
        .filter(Boolean)
        .join("\r\n");
    // debugger;
    return [preamble, nodeCode, postamble].join("\r\n");
  }
}

export default DockerCode;
