import React from "react";
import { Light as SyntaxHighlighter } from "react-syntax-highlighter";

import AwesomeDebouncePromise from "awesome-debounce-promise";
import python from "react-syntax-highlighter/dist/esm/languages/hljs/python";
import dockerfile from "react-syntax-highlighter/dist/esm/languages/hljs/dockerfile";
import atomDark from "react-syntax-highlighter/dist/esm/styles/hljs/atom-one-dark";

SyntaxHighlighter.registerLanguage("python", python);
SyntaxHighlighter.registerLanguage("dockerfile", dockerfile);

import nipypeCode from "../../utils/codeGenerators/nipype";
import dockerCode from "../../utils/codeGenerators/docker";
import kerasCode from "../../utils/codeGenerators/keras";
import fieldtripCode from "../../utils/codeGenerators/fieldtrip";
import unknownCode from "../../utils/codeGenerators/unknown";

const formattingDictionary = {
  Nipype: "python",
  Docker: "dockerfile",
  Fieldtrip: "matlab",
  Keras: "python"
};

function recomputeCode(language, nodes, links) {
  switch (language) {
    case "Nipype":
      return nipypeCode(nodes, links);
      break;
    case "Docker":
      return dockerCode(nodes, links);
      break;
    case "Fieldtrip":
      return fieldtripCode(nodes, links);
      break;
    case "Keras":
      return kerasCode(nodes, links);
      break;
    default:
      return unknownCode(nodes, links);
      break;
  }
}

const interval = 1000; //ms
const generateCodeDebounced = AwesomeDebouncePromise(recomputeCode, interval, {
  key: language => language
});

class Code extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      code: "",
      computing: false,
      current_props: {}
    };
    this.generateCode = this.generateCode.bind(this);
  }

  static getDerivedStateFromProps(nextProps, prev_state) {
    if (
      prev_state.current_props.nodes !== nextProps.nodes &&
      prev_state.current_props.links !== nextProps.links
    ) {
      return {
        ...prev_state,
        computing: true,
        current_props: nextProps
      };
    }
    return null;
  }

  componentDidMount() {
    this.generateCode();
  }

  componentDidUpdate(prev_props, prev_state) {
    if (
      (this.props.nodes.length || this.props.links.length) &&
      (prev_props.nodes !== this.props.nodes ||
        prev_props.links !== this.props.links)
    ) {
      this.generateCode();
    }
  }

  async generateCode() {
    const { language, nodes, links } = this.props;
    const code = await generateCodeDebounced(language, nodes, links);
    this.setState({ code, computing: false });
  }

  render() {
    const { language } = this.props;
    const { code } = this.state;

    const formatting = formattingDictionary[language] || "";
    return (
      <SyntaxHighlighter language={formatting} style={atomDark}>
        {code}
      </SyntaxHighlighter>
    );
  }
}

export default Code;
