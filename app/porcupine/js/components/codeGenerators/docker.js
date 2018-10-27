import React from "react";
import SyntaxHighlighter, {
  registerLanguage
} from "react-syntax-highlighter/light";
import dockerfile from "react-syntax-highlighter/languages/hljs/dockerfile";
import atomDark from "react-syntax-highlighter/styles/hljs/atom-one-dark";

registerLanguage("dockerfile", dockerfile);

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
    const languagesInEditor = nodes
      ? nodes.map(node => {
          const codeArgument =
            node.code && node.code.filter(a => a.language === LANGUAGE)[0];
          return (
            codeArgument &&
            codeArgument.argument &&
            codeArgument.argument.name &&
            codeArgument.argument.name.split(",")
          );
        })
      : [];
    console.log(languagesInEditor);
    const nodeCode = "";
      // Array.isArray(languagesInEditor) &&
      // [...new Set(languagesInEditor.flat())].map(
      //   language => codeMappings[language]
      // );
    return (
      <SyntaxHighlighter language="dockerfile" style={atomDark}>
        {[preamble, nodeCode, postamble].join("\r\n")}
      </SyntaxHighlighter>
    );
  }
}

export default DockerCode;
